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
}

function Quiz() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0.8 * 60);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const { isLoading, addQuiz } = useAddQuiz();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [answersIndex, setAnswersIndex] = useState<Record<number, string>>({});

  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('id');
  const hash_code = searchParams.get('code') as string;

  
  const { data, error, isLoading: isFetchingQuiz, } = useQuery({
    queryKey: ["quiz",hash_code],
    queryFn: () =>
      fetchQuiz(
        hash_code
      ),
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("submitOnLoad", "true");
      localStorage.setItem(
        "pendingQuizAnswersIndex",
        JSON.stringify(answersIndex)
      );
    };
    let hasSubmitted = false;

    const onBlur = () => {
      if (!hasSubmitted) {
        alert(
          "Tab switching or screen recording is not allowed. The quiz will be submitted."
        );
        hasSubmitted = true;
        localStorage.setItem("submitOnLoad", "true");
        localStorage.setItem(
          "pendingQuizAnswersIndex",
          JSON.stringify(answersIndex)
        );
        autoSubmit();
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && (e.key === "s" || e.key === "u"))
      ) {
        e.preventDefault();
        alert("Screenshots are not allowed.");
        localStorage.setItem("submitOnLoad", "true");
        localStorage.setItem(
          "pendingQuizAnswersIndex",
          JSON.stringify(answersIndex)
        );

      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", onBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    if (localStorage.getItem("submitOnLoad") === "true") {
      autoSubmit();
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [answersIndex]);

  useEffect(() => {
    const time = setInterval(() => {
      setTimer((prev) => prev - 1);
      localStorage.setItem("timer", time.toString());
    }, 1000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("submitOnLoad", "true");
      localStorage.setItem(
        "pendingQuizAnswersIndex",
        JSON.stringify(answersIndex)
      );
      autoSubmit();
    }
  }, [timer]);


  const autoSubmit = () => {
    const shouldSubmit = localStorage.getItem("submitOnLoad") === "true";
    const savedAnswersIndex = localStorage.getItem("pendingQuizAnswersIndex");

    if (shouldSubmit && savedAnswersIndex) {
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
    }
  };


  const handleChange = (id: number, value: string, index: string) => {
    const updatedAnswers = { ...answers, [id]: value };
    const updatedAnswersIndex = { ...answersIndex, [id]: index };

    setAnswers(updatedAnswers);
    setAnswersIndex(updatedAnswersIndex);

    localStorage.setItem("pendingQuizAnswers", JSON.stringify(updatedAnswers));
    localStorage.setItem(
      "pendingQuizAnswersIndex",
      JSON.stringify(updatedAnswersIndex)
    );
  };

  const onSubmit = () => {
    if (Object.keys(answersIndex).filter((val) => val !== "").length !== (Array.isArray(data)?data.length:0)) {
      toast.error("Please answer all questions");
      return;
    }

    addQuiz({
      hash_code,
      answersIndex,
    });

    toast.success("Quiz submitted");

    localStorage.removeItem("pendingQuizAnswers");
    localStorage.removeItem("pendingQuizAnswersIndex");
    localStorage.removeItem("submitOnLoad");

    navigate("/ThankYou", { replace: true });
  };
  
  if (!studentId && !hash_code) return <NotFound />;
  if (data&&!Array.isArray(data)) return <Error message="the quiz was submitted" />;
  if (error) return <Error message="Cannot fetch quiz" />;
  if (isFetchingQuiz) return <Spinner />;
  
  
  return (
    <section
      className="select-none bg-white w-[95%] lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10"
      aria-labelledby="quiz"
    >
      <h2 id="quiz" className="text-4xl font-bold mb-4">
        Please answer the following questions
      </h2>
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-red-800 font-bold text-2xl">
          Adhere to the following instructions please:
        </p>
        <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
          <span>1.</span>
          <p>
            Don't close your tab, otherwise the quiz will be submitted
            automatically.
          </p>
        </div>
        <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
          <span>2.</span>
          <p>Screenshots are not allowed.</p>
        </div>
        <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
          <span>3.</span>
          <p>
            Don't reload or refresh, otherwise the quiz will be submitted
            automatically.
          </p>
        </div>
      </div>

      <p className="text-red-600 font-bold text-xl text-center mt-6">
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>

      {data?.map((q) => (
        <Question
          key={q.id}
          q={q}
          setOnChange={handleChange}
          selected={answers[q.id]}
        />
      ))}

      <Button type="submit" isLoading={isLoading} onClick={onSubmit}>
        Submit
      </Button>
    </section>
  );
}

export default Quiz;