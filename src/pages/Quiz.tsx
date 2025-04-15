import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "../services/apiServices";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import Question from "../features/Question";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAddQuiz } from "../features/useAddStudentQuiz";

export interface QuestionType {
  id: number;
  question: string;
  level: string;
  image_link: string
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

function Quiz() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(1 * 60);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const { isLoading, addQuiz } = useAddQuiz();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [answersIndex, setAnswersIndex] = useState<Record<number, string>>({});
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("submitOnLoad", "true");
      localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(answersIndex));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answersIndex]);

  useEffect(() => {
    const time = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)
    return () => clearInterval(time)
  }, []);
  useEffect(() => {
    if (timer === 0) {
      onSubmit();
    }
  }, [timer]);

  useEffect(() => {
    let hasSubmitted = false;
  
    const onBlur = () => {
      if (!hasSubmitted) {
        alert("Tab switching or screen recording is not allowed. The quiz will be submitted.");
        hasSubmitted = true;
        localStorage.setItem("submitOnLoad", "true");
        autoSubmit();
      }
    };
  
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && (e.key === 's' || e.key === 'u'))) {
        e.preventDefault();
        alert('Screenshots are not allowed.');
      }
    };
 
    window.addEventListener('blur', onBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
  
    autoSubmit();
  
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  const autoSubmit = () => {
    const shouldSubmit = localStorage.getItem("submitOnLoad") === "true";
    const savedAnswersIndex = localStorage.getItem("pendingQuizAnswersIndex");

    if (shouldSubmit && savedAnswersIndex) {
      const parsedAnswersIndex = JSON.parse(savedAnswersIndex);
      addQuiz({
        hash_code: "bfb172abf98b065092a9146afb96208d8a37f3db4e96a782691529f6f852906a",
        answersIndex: parsedAnswersIndex
      });

      toast.success("Quiz auto-submitted due to reload or switching tabs.");

      localStorage.removeItem("submitOnLoad");
      localStorage.removeItem("pendingQuizAnswers");
      localStorage.removeItem("pendingQuizAnswersIndex");

      navigate("/ThankYou");
    }
  };
  // const studentData = localStorage.getItem("studentData")?JSON.parse(localStorage.getItem("studentData")! as string):null;

  //if (!studentData) return <NotFound />;

  // const hash_code = studentData.hash_code;

  const { data, error, isLoading: isFetchingQuiz } = useQuery<QuestionType[]>({
    queryKey: ["quiz"],
    queryFn: () =>
      fetchQuiz(
        "bfb172abf98b065092a9146afb96208d8a37f3db4e96a782691529f6f852906a"
      ),
  });

  if (error) return <Error message="Can not fetch quiz" />;
  if (isFetchingQuiz) return <Spinner />;

  const easyQuestions: QuestionType[] = data?.filter((q) => q.level === "easy").slice(0, 5) || [];
  const mediumQuestions: QuestionType[] = data?.filter((q) => q.level === "medium").slice(0, 5) || [];
  const hardQuestions: QuestionType[] = data?.filter((q) => q.level === "hard").slice(0, 5) || [];

  const handleChange = (id: number, value: string, index: string) => {
    const updatedAnswers = { ...answers, [id]: value };
    const updatedAnswersIndex = { ...answersIndex, [id]: index };

    setAnswers(updatedAnswers);
    setAnswersIndex(updatedAnswersIndex);


    localStorage.setItem("pendingQuizAnswers", JSON.stringify(updatedAnswers));
    localStorage.setItem("pendingQuizAnswersIndex", JSON.stringify(updatedAnswersIndex))
  }

  const onSubmit = () => {
    if ( Object.keys(answersIndex).filter(val => val != '').length != 15) {
      toast.error("please answer all questions");
      return;
    }
    addQuiz({ hash_code: "bfb172abf98b065092a9146afb96208d8a37f3db4e96a782691529f6f852906a", answersIndex });

    toast.success("quiz submitted");

    localStorage.removeItem("pendingQuizAnswers");
    localStorage.removeItem("pendingQuizAnswersIndex");
    localStorage.removeItem("submitOnLoad");

    navigate("/ThankYou");
  };




  return (
    <>
      <section className="select-none   bg-white w-[95%]  lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 " aria-labelledby="quiz">
        <h2 id="quiz" className="text-4xl font-bold mb-4">
          Please answer the following questions
        </h2>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-red-800 font-bold text-2xl">
            Adhere to the following instructions please:
          </p>
          <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
            <span>1.</span>
            <p>Don't close your tab, otherwise the quiz will be submitted automatically.</p>
          </div>
          <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
            <span>2.</span>
            <p>Screenshots are not allowed.</p>
          </div>
          <div className="flex items-start gap-2 text-red-700 font-medium text-lg">
            <span>3.</span>
            <p>Don't reload or refresh, otherwise the quiz will be submitted automatically.</p>
          </div>
        </div>

        <p className="text-red-600 font-bold text-xl text-center mt-6">
          Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>


        {easyQuestions.map((q) => (
          <Question
            key={q.id}
            q={q}
            setOnChange={handleChange}
            selected={answers[q.id]}
          />
        ))}

        {mediumQuestions.map((q) => (
          <Question
            key={q.id}
            q={q}
            setOnChange={handleChange}
            selected={answers[q.id]}
          />
        ))}

        {hardQuestions.map((q) => (
          <Question
            key={q.id}
            q={q}
            setOnChange={handleChange}
            selected={answers[q.id]}
          />
        ))}
        <Button
          type="submit"
          isLoading={isLoading}
          onClick={onSubmit}
        >Submit
        </Button>
      </section>

    </>
  );
}

export default Quiz;
