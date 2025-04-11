import { useSearchParams } from "react-router";

function ThankYou() {
  const [searchParams] = useSearchParams();
  return (
    <div>
      <div className=" bg-white w-full  lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
        <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
          thank you !{" "}
        </h3>
        <p className="capitalize text-center text-lg lg:text-2xl my-3 ">
          your {searchParams.get("submit") || "application"} is submitted
          successfully
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
