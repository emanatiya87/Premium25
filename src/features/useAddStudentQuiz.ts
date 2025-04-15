import { useMutation } from "@tanstack/react-query";
import { addQuiz as addQuizApi } from "../services/apiServices";
import toast from "react-hot-toast";

export function useAddQuiz() {
  const {
    isError,
    isLoading,
    mutate: addQuiz,
  } = useMutation({
    mutationFn: addQuizApi,
    onError: (error: Error) => {
      toast.error("Error adding quiz: " + error.message);
    },
  });

  return { isError, isLoading, addQuiz };
}
