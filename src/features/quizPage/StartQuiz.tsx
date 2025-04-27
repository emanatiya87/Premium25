import { useLocation, useNavigate } from "react-router";
import Button from "../../ui/Button";

function StartQuiz() {
  const x = useLocation();
  const navigate = useNavigate();
  function goToQuiz() {
    const path = x.search;
    navigate(`/stquiz${path}`, { replace: true });
  }

  return (
    <section className="bg-white w-[95%] text-center lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10">
      <h2
        id="thank-you"
        className="text-4xl font-bold text-primary mb-4 uppercase tracking-widest"
      >
        PST Rules
      </h2>
      <p className="text-lg mb-8 font-semibold capitalize">
        Please carefully read the rules below before starting the PST:
      </p>

      <ul className="text-left text-base md:text-lg leading-relaxed list-disc list-inside space-y-3">
        <li>
          <span className="font-semibold">Exam Duration:</span> 45 minutes
        </li>
        <li>
          <span className="font-semibold">Total Questions:</span> 70 questions
        </li>
        <li>You are allowed to take the PST exam only once.</li>
        <li>Do not refresh the exam page during the test.</li>
        <li>Do not share the exam link with anyone.</li>
        <li>Make sure to start the exam before the event ends.</li>
        <li className="font-semibold text-red-500 ">
          Switching tabs, minimizing the window, copying content, or taking
          screenshots will cause immediate submission of your exam.
        </li>
      </ul>
      <div className="mt-10">
        <Button onClick={goToQuiz} type="button">
          start
        </Button>
      </div>
    </section>
  );
}

export default StartQuiz;
