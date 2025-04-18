import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useAutoSubmit(
  hash_code: string,  
  timer: number,      
  addQuiz: (data: { hash_code: string; answersIndex: Record<number, string> }) => void
) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    const shouldSubmit = localStorage.getItem("submitOnLoad") === "true";
    const savedAnswersIndex = localStorage.getItem("pendingQuizAnswersIndex");

    if (!shouldSubmit || !savedAnswersIndex || !hash_code) {
      
      console.error("Required data for auto-submit is missing.");
      return;
    }

    const parsedAnswersIndex = JSON.parse(savedAnswersIndex);

    addQuiz({
      hash_code,
      answersIndex: parsedAnswersIndex,
    });


    toast.success(
      timer === 0
        ? "Time is up. Your quiz has been auto-submitted."
        : "Quiz auto-submitted due to reload or switching tabs."
    );

    localStorage.removeItem("submitOnLoad");
    localStorage.removeItem("pendingQuizAnswers");
    localStorage.removeItem("pendingQuizAnswersIndex");


    navigate("/ThankYou", { replace: true });
  };


  useEffect(() => {
    const shouldSubmit = localStorage.getItem("submitOnLoad") === "true";
    const savedAnswersIndex = localStorage.getItem("pendingQuizAnswersIndex");
    const hash_code_from_local = localStorage.getItem("hash_code");
 
    if (shouldSubmit && savedAnswersIndex && hash_code_from_local) {
        handleSubmit(); 
    }
  }, [hash_code, timer, addQuiz, navigate]);

  return { handleSubmit };
}
