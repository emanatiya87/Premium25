import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "../services/apiServices";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import { useEffect, useState } from "react";
import Question from "../features/quizPage/Question";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAddQuiz } from "../features/quizPage/useAddStudentQuiz";
import { useSearchParams } from "react-router";
import NotFound from "./NotFound";

export interface QuestionType {
  id: number;
  question: string;
  level: string;
  image_link: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
}

function Quiz() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(45* 60);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const { isLoading, isError, addQuiz } = useAddQuiz();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [answersIndex, setAnswersIndex] = useState<Record<number, string>>({});

  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('id');
  const hash_code = searchParams.get('code') as string;

  const { data, error, isLoading: isFetchingQuiz } = useQuery({
    queryKey: ["quiz", hash_code],
    queryFn: () => fetchQuiz(hash_code),
  });

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.setItem("submitOnLoad", "true");
  //     localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
  //   };

  //   let hasSubmitted = false;

  //   const onBlur = () => {
  //     if (!hasSubmitted)!=="true"){
  //       alert("Tab switching or screen recording is not allowed. The quiz will be submitted.");
  //       hasSubmitted = true;
  //       localStorage.setItem("submitOnLoad", "true");
  //       localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
  //       autoSubmit();
  //     }
  //   };

  //   const handleContextMenu = (e: MouseEvent) => e.preventDefault();
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "PrintScreen" || (e.ctrlKey && (e.key === "s" || e.key === "u"))) {
  //       e.preventDefault();
  //       alert("Screenshots are not allowed.");
  //       localStorage.setItem("submitOnLoad", "true");
  //       localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("blur", onBlur);
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);

  //   if (localStorage.getItem("submitOnLoad") === "true") {
  //     autoSubmit();
  //   }

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("blur", onBlur);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [answersIndex]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("submitOnLoad", "true");
      localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
    };
  
    let hasSubmitted = false;
    let blurTimeout: ReturnType<typeof setTimeout>;
  
    const onBlur = () => {
      if (!hasSubmitted) {

        blurTimeout = setTimeout(() => {
          if (document.visibilityState !== "visible" && !hasSubmitted) {
            alert("You were away for too long. The quiz will be submitted.");
            hasSubmitted = true;
            localStorage.setItem("submitOnLoad", "true");
            localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
            autoSubmit();
          }
        }, 10000); 
      }
    };
  
    const onFocus = () => {
      clearTimeout(blurTimeout);
    };
  
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || (e.ctrlKey && (e.key === "s" || e.key === "u"))) {
        e.preventDefault();
        alert("Screenshots are not allowed.");
        localStorage.setItem("submitOnLoad", "true");
        localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
  
    if (localStorage.getItem("submitOnLoad") === "true") {
      autoSubmit();
    }
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(blurTimeout);
    };
  }, [answersIndex]);
  

  useEffect(() => {
    const time = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("submitOnLoad", "true");
      localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
      autoSubmit();
    }
  }, [timer]);

  const autoSubmit = () => {
    const shouldSubmit = localStorage.getItem("submitOnLoad") === "true";
    const savedAnswersIndex = localStorage.getItem("pendingQuizAnswersIndex");

    if (shouldSubmit && savedAnswersIndex) {
      const parsedAnswersIndex = JSON.parse(savedAnswersIndex);
      addQuiz({ hash_code, answersIndex: parsedAnswersIndex });

      toast.success(timer === 0 ? "Time is up. Your quiz has been auto-submitted." : "Quiz auto-submitted due to reload or switching tabs.");

      //localStorage.setItem(`quizSubmitted_${hash_code}`, "true"); 

      localStorage.removeItem("submitOnLoad");
      localStorage.removeItem("pendingQuizAnswers");
      localStorage.removeItem("pendingQuizAnswersIndex");

      navigate("/ThankYou", { replace: true });
    }
  };

  const handleChange = (id: number, value: string, index: string) => {
    const updatedAnswers = { ...answers, [id]: value };
    const updatedAnswersIndex = { ...answersIndex, [id]: index };

    setAnswers(updatedAnswers);
    setAnswersIndex(updatedAnswersIndex);

    localStorage.setItem("pendingQuizAnswers", JSON.stringify(updatedAnswers));
    localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(updatedAnswersIndex));
  };

  const onSubmit = () => {
    const unansweredQuestions = Object.keys(answersIndex).filter((val) => val !== "").length;
    if (unansweredQuestions !== (Array.isArray(data)?data.length:0)) {
      toast.error("Please answer all questions");
      return;
    }

    addQuiz({ hash_code, answersIndex });
    toast.success("Quiz submitted");

   // localStorage.setItem(`quizSubmitted_${hash_code}`, "true"); 

    localStorage.removeItem("pendingQuizAnswers");
    localStorage.removeItem("pendingQuizAnswersIndex");
    localStorage.removeItem("submitOnLoad");

    navigate("/ThankYou", { replace: true });
  };

  if (!studentId || !hash_code) return <NotFound />;
  if (isFetchingQuiz) return <Spinner />;
  if (error) return <Error message="The quiz has already been submitted." />;
  if (isError) return <Error message="Error fetching quiz" />;

//if (localStorage.getItem(`quizSubmitted_${hash_code}`) === "true") {
   // return <Error message="You have already submitted the quiz." />;
  //}

  return (
    <section className="select-none bg-white w-[95%] lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10" aria-labelledby="quiz">
      <h2 id="quiz" className="text-4xl font-bold mb-4">Please answer the following questions</h2>
      <p className="text-red-600 font-bold text-xl text-center mt-6">
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>

      {data && Array.isArray(data) && data.length > 0 && data.map((q) => (
        <Question key={q.id} q={q} setOnChange={handleChange} selected={answers[q.id]} />
      ))}

      <Button type="submit" isLoading={isLoading} onClick={onSubmit}>
        Submit
      </Button>
    </section>
  );
}

export default Quiz;
