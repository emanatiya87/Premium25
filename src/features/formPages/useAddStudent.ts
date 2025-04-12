import { useMutation } from "@tanstack/react-query";
import { addStudent as addStudentApi } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useAddStudent() {
  const {
    isError,
    isLoading,
    mutate: addStudent,
  } = useMutation({
    mutationFn: addStudentApi,
    onError: (error: Error) => {
      toast.error("Error adding student: " + error.message);
    },
  });

  return { isError, isLoading, addStudent };
}
