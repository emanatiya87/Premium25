import { useSearchParams } from "react-router";

function ThankYou() {
  const [searchParams] = useSearchParams();
  const submittedItem = searchParams.get("submit") || "quiz";

  return (
    <section
      className="bg-white w-[95%] text-center lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10"
      aria-labelledby="thank-you"
    >
      <h2
        id="thank-you"
        className="text-4xl font-bold text-green-600 mb-4 uppercase tracking-widest"
      >
        🎉 Thank You!
      </h2>
      <p className="text-lg text-gray-700 mb-6 capitalize">
        Your {submittedItem} has been submitted successfully.
        <br /> We appreciate your time and effort!
      </p>
      <p className="text-gray-500 text-sm">You’ll be redirected shortly...</p>
    </section>
  );
}

export default ThankYou;
