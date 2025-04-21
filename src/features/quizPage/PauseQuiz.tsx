function PauseQuiz() {
  return (
    <section
      className="bg-white w-[95%] text-center lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10"
      aria-labelledby="thank-you"
    >
      <h2
        id="thank-you"
        className="text-4xl font-bold text-primary mb-4 uppercase tracking-widest"
      >
        PST will be available soon
      </h2>
      <p className="text-lg mb-6 capitalize">
        We appreciate your time and effort!
      </p>
      {/* <p className="text-gray-500 text-sm">You’ll be redirected shortly...</p> */}
    </section>
  );
}

export default PauseQuiz;
