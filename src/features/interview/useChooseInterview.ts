import { useMutation } from "@tanstack/react-query";
import { chooseInterView as chooseInterViewApi } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useChooseInterview() {
  const { mutate: chooseInterview, isLoading: isAdding } = useMutation({
    mutationFn: chooseInterViewApi,
    onError: (err: Error) => toast.error(err.message),
  });
  return { isAdding, chooseInterview };
}
