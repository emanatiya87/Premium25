import axios from "axios";
import { companiesType, FormType } from "../types/form";

interface QuizResponse{
  score:string
  total:number
  results:{
    string:number
  }
}
export async function fetchQuiz(hash_code: string){
try{
  const res=await axios.get(`https://apeceg.com/Events2025/quiz_api.php?action=quiz&hash_code=${hash_code}`);
  if (res.status !== 200 || !res.data) {
    throw new Error("Failed to fetch Quiz");
  };
  return res.data;
   
}
catch(error){
  console.error("Error fetching Quiz ");
    throw error;
}
};
export async function addQuiz({
  hash_code,
  answersIndex,
}: {
  hash_code: string;
  answersIndex: Record<number, string>;
})
:Promise<QuizResponse>{
const body={hash_code,...answersIndex}
//console.log(body)
try {
const res=await axios.post("https://apeceg.com/Events2025/quiz_api.php?action=correct",body);
if (res.status !== 200 || !res.data) {
 throw new Error("Failed to fetch quiz");
}
//console.log(res.data,"resposne")
return res.data
}
catch (error) {
  //console.error("Error submitting quiz try later");
  throw error;
}
};

export async function getCompanies(
  major: string,
  year: string
): Promise<companiesType[]> {
  try {
    const response = await axios.get(
      `https://apeceg.com/Events2025/get_companies.php?major=${major}&year=${year}`
    );

    // console.log("Response data:", response.data.companies); // Log the response data
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
  } = formData;

  const finalForm = {
    name: `${firstName} ${lastName}`,
    email,
    phone,
    university: university === "other" ? otherUniversity : university,
    college: faculty === "other" ? otherFaculty : faculty,
    year: +year,
    major: major || "other",
    first_pref: +firstPreference,
    second_pref: +secondPreference,
    third_pref: +thirdPreference,
    event_source: aboutUs,
    experience: previousExperience,
    cv: includeCv ? cv[0] : null,
  };
  console.log("Final form data:", finalForm); // Log the final form data
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

    // console.log(response);
    // if (response.data.error) {
    //   throw new Error(response.data.error);
    // }
    // if (response.status !== 200) {
    //   throw new Error("Failed to add student");
    // }

    return response.data;
  } catch (error) {
    let message =
      (axios.isAxiosError(error) && error.response?.data?.error) ||
      "Unknown error";

    if (message.includes("Duplicate entry")) {
      message = "Phone number or email  already exists";
    }

    if (message.includes("cv")) {
      message = "CV file is too large exceeding 10MB";
    }

    throw new Error(message);
  }
}
