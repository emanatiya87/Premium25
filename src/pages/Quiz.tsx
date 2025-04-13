import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "../services/apiServices";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import { useEffect, useState } from "react";
// import NotFound from "./NotFound";
import Question from "../ui/Question";
import Button from "../ui/Button";

export interface QuestionType {
  id: string;
  question: string;
  level: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

function Quiz() {
  const [timer, setTimer] = useState(15 * 60);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const time = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer === 0) return onSubmit();
    return () => clearInterval(time);
  }, []);
  useEffect(() => {
    // const onBlur = () => {
    //   document.body.innerHTML = "";
    //   //alert('Screen recording or screenshot attempts are not allowed.');
    // };
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && (e.key === "s" || e.key === "u"))
      ) {
        e.preventDefault();
        alert("Screenshots are not allowed.");
      }
    };

    //document.addEventListener('blur', onBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      //document.removeEventListener('blur', onBlur);
    };
  }, []);

  // const studentData = localStorage.getItem("studentData")
  //  ? JSON.parse(localStorage.getItem("studentData")! as string):null;

  //if (!studentData) return <NotFound />;

  // const hash_code = studentData.hash_code;

  const { data, error, isLoading } = useQuery<QuestionType[]>({
    queryKey: ["quiz"],
    queryFn: () =>
      fetchQuiz(
        "8771b35501e20da0eeed86debeb2c729684ef1806247563976a340a3ac9e5bca"
      ),
  });

  if (error) return <Error message="Can not fetch quiz" />;
  if (isLoading) return <Spinner />;

  const easyQuestions: QuestionType[] =
    data?.filter((q) => q.level === "easy").slice(0, 5) || [];
  const mediumQuestions: QuestionType[] =
    data?.filter((q) => q.level === "medium").slice(0, 5) || [];
  const hardQuestions: QuestionType[] =
    data?.filter((q) => q.level === "hard").slice(0, 5) || [];

  const onSubmit = () => {};

  return (
    <>
      <section
        className="select-none   bg-white w-[95%]  lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 "
        aria-labelledby="quiz"
      >
        <h2 id="quiz" className="text-xl font-bold mb-4">
          Please answer the following questions
        </h2>
        <p className="text-red-600 font-bold">
          Time left: {minutes}:{seconds}
        </p>

        {easyQuestions.map((q) => (
          <Question key={q.id} q={q} />
        ))}

        {mediumQuestions.map((q) => (
          <Question key={q.id} q={q} />
        ))}

        {hardQuestions.map((q) => (
          <Question key={q.id} q={q} />
        ))}
        <Button type="submit">submit</Button>
      </section>
    </>
  );
}

export default Quiz;
