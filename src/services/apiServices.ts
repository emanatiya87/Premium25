import axios from "axios";
import {
  companiesType,
  FormType,
  StudentType,
  StudentTypeWithInterview,
} from "../types/form";
import { QuestionType } from "../pages/Quiz";

export interface QuizResponse {
  score: string;
  total: number;
  results: {
    [key: string]: number;
  };
}
export interface QuizErrorResponse{
  error:string;
}

export async function fetchQuiz(hash_code: string)  {
  try {
    const res = await axios.get(
      `https://apeceg.com/Events2025/quiz_api.php?action=quiz&hash_code=${hash_code}`
    );

    if (res.status !== 200 || !res.data) {
      throw new Error("Failed to fetch Quiz");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error fetching Quiz", error);
    throw error;
  }
}


export async function addQuiz({
  hash_code,
  answersIndex,
}: {
  hash_code: string;
  answersIndex: Record<number, string>;
}): Promise<QuizResponse | QuizErrorResponse> {
  const body = { hash_code, ...answersIndex };
  try {
    const res = await axios.post(
      "https://apeceg.com/Events2025/quiz_api.php?action=correct",
      body
    );
    if (res.status !== 200 || !res.data) {
      throw new Error("Failed to fetch quiz");
    }
    if (res.data.error ) {
      throw new Error("Quiz has already been submitted or requested.")
    }

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompanies(
  major: string,
  year: string
): Promise<companiesType[]> {
  try {
    const response = await axios.get(
      `https://apeceg.com/Events2025/get_companies.php?major=${major}&year=${year}`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch companies");
    }
    return response.data.companies;
  } catch (error) {
    console.error("Error fetching companies try later");
    throw error;
  }
}

export async function addStudent(formData: FormType) {
  const {
    firstName,
    lastName,
    email,
    phone,
    university,
    otherUniversity,
    faculty,
    otherFaculty,
    year,
    major,
    firstPreference,
    secondPreference,
    thirdPreference,
    aboutUs,
    includeCv,
    cv,
    previousExperience,
    preferencePercentage,
  } = formData;

  const finalForm = {
    name: `${firstName} ${lastName}`,
    email,
    phone,
    university: university === "other" ? otherUniversity : university,
    college: faculty === "other" ? otherFaculty : faculty,
    year: +year,
    major: major || "other",
    first_pref: +firstPreference || null,
    second_pref: +secondPreference || null,
    third_pref: +thirdPreference || null,
    event_source: aboutUs,
    experience: previousExperience,
    cv: includeCv ? cv[0] : null,
    pref_percentages: preferencePercentage,
  };

  try {
    const response = await axios.post(
      "https://apeceg.com/Events2025/add_students.php",
      finalForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message =
      (axios.isAxiosError(error) && error.response?.data?.error) ||
      "Unknown error";

    if (message.includes("Duplicate entry")) {
      message = "Phone number or email already exists";
    }

    if (message.includes("cv")) {
      message = "CV file is too large exceeding 10MB";
    }

    throw new Error(message);
  }
}

export async function uploadCv(formData: FormData) {
  try {
    const response = await axios.post(
      "https://apeceg.com/Events2025/add_cv.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error uploading CV:", error);
    const message =
      (axios.isAxiosError(error) && error.response?.data?.error) ||
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";

    throw new Error(message);
  }
}

export async function getStudentData(
  searchQuery: string
): Promise<StudentType[]> {
  const response = await axios.get(
    `https://apeceg.com/Events2025/get_students.php?search=${searchQuery}`
  );
  if (response.status !== 200 || !response.data) {
    throw new Error("Failed to fetch students data");
  }
  return response.data.students;
}

export async function addInterviewSlot(formData: FormData) {
  try {
    const response = await axios.post(
      "https://apeceg.com/Events2025/add_interview.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    let message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";

    if (message.includes("Duplicate entry")) {
      message = "You have already added this slot";
    }

    throw new Error(message);
  }
}

export async function getInterviews() {
  try {
    const response = await axios.get(
      "https://apeceg.com/Events2025/get_interviews.php"
    );
    return response.data.interviews;
  } catch (error) {
    const message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";

    throw new Error(message);
  }
}

export async function chooseInterView(formData: {
  phone: string;
  interview_slot: string;
}) {
  try {
    const response = await axios.post(
      "https://apeceg.com/Events2025/choose_interview.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    const message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";
    throw new Error(message);
  }
}

export async function changeStatus(formData: { phone: string }) {
  try {
    const response = await axios.post(
      "https://apeceg.com/Events2025/change_student_status.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    const message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";
    throw new Error(message);
  }
}

export async function getStudentInterviews(
  searchQuery: string
): Promise<StudentTypeWithInterview[]> {
  const response = await axios.get(
    `https://apeceg.com/Events2025/get_students_interviews.php?search=${searchQuery}`
  );
  if (response.status !== 200 || !response.data) {
    throw new Error("Failed to fetch students data");
  }
  return response.data.students;
}