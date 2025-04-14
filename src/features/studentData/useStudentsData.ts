import { useQuery } from "@tanstack/react-query";
import { getStudentData } from "../../services/apiServices";
import { StudentType } from "../../types/form";

export function useStudentsData(searchQuery: string) {
  const {
    data: students,
    isError,
    isLoading,
  } = useQuery<StudentType[]>({
    queryKey: ["studentsData", searchQuery],
    queryFn: () => getStudentData(searchQuery),
  });

  return { students, isLoading, isError };
}
