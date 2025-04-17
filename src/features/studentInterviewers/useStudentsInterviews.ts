import { useQuery } from "@tanstack/react-query";
import { getStudentInterviews } from "../../services/apiServices";
import { StudentTypeWithInterview } from "../../types/form";

export function useStudentsInterviews(searchQuery: string) {
  const {
    data: students,
    isError,
    isLoading,
  } = useQuery<StudentTypeWithInterview[]>({
    queryKey: ["studentsInterviewData", searchQuery],
    queryFn: () => getStudentInterviews(searchQuery),
  });

  return { students, isLoading, isError };
}
