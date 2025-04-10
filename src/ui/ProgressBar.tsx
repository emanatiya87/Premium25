function ProgressBar({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  // const currentStep = 3;
  return (
    <div className="relative w-full lg:w-[95%]  mx-auto mb-10 lg:mb-20">
      <span className="block  h-[2px] bg-white rounded-full"></span>
      <span
        style={{
          width: `${(currentStep - 1) * 33.3}%`,
        }}
        className="transition-all duration-500  z-20 absolute top-1/2 translate-y-[-50%]  h-[3px] bg-primary rounded-lg "
      ></span>
      <ul className="z-30 absolute top-1/2 translate-y-[-50%]  w-full flex justify-between">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className={` w-8 h-8  text-center hover:bg-primaryDark  hover:text-white  rounded-full transition-all  duration-300  ${
              index + 1 <= currentStep
                ? "bg-primary text-white"
                : "bg-white text-black"
            } `}
          >
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => {
                if (index + 1 > currentStep) return;
                setCurrentStep(index + 1);
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressBar;
