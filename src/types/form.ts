export type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  otherUniversity: string;
  faculty: string;
  otherFaculty: string;
  year: string;
  firstPreference: string;
  secondPreference: string;
  thirdPreference: string;
  preferencePercentage: string;
  aboutUs: string;
  includeCv: boolean;
  cv: FileList;
  previousExperience: string;
  major: string;
};
export type companiesType = {
  name: string;
  id: number;
};

export type StudentType = {
  apply_status: string;
  college: string;
  created_at: Date;
  cv: string | null;
  email: string;
  event_source: string;
  experience: string;
  first_pref: string | null;
  interview_date: Date | null;
  major: string;
  name: string;
  phone: string;
  pref_percentages: string;
  second_pref: string | null;
  third_pref: string | null;
  university: string;
  year: number;
};
