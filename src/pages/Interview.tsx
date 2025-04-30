import { addMinutes, compareAsc, format } from "date-fns";
import Button from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getInterviews } from "../services/apiServices";
import Spinner from "../ui/Spinner";
// import Error from "./Error";
import InputGroup from "../ui/InputGroup";
import InputCol from "../ui/InputCol";
import { useForm } from "react-hook-form";
import { useChooseInterview } from "../features/interview/useChooseInterview";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Interview() {
  const {
    data: interviews,
    isLoading,
    isError,
  } = useQuery<
    {
      id: number;
      interview_date: Date;
    }[]
  >({
    queryFn: getInterviews,
    queryKey: ["interviews"],
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ interview_slot: string; phone: string }>();
  const navigate = useNavigate();
  const { chooseInterview, isAdding } = useChooseInterview();

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
        <p className="text-3xl text-center my-10">
          Oops! No Interviews Available Here Right Now. 🙃
        </p>
      </div>
    );

  const seen = new Set();
  const uniqueInterviews = (interviews ?? []).filter((item) => {
    if (seen.has(item.interview_date)) return false;
    seen.add(item.interview_date);
    return true;
  });

  // console.log(uniqueInterviews);
  uniqueInterviews.sort((a, b) =>
    compareAsc(a.interview_date, b.interview_date)
  );
  function onsubmit(formData: { interview_slot: string; phone: string }) {
    chooseInterview(formData, {
      onSuccess: () => {
        toast.success("interview slot chosen succussfully");
        navigate(`/thankyou?submit=slot`);
      },
    });
  }

  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        choose interview slot{" "}
      </h3>
      <form onSubmit={handleSubmit(onsubmit)}>
        <InputGroup>
          <InputCol>
            <input
              className="form-input"
              type="text"
              placeholder="registered email or phone"
              {...register("phone", {
                required: "please enter your email or phone",
                maxLength: {
                  value: 30,
                  message: "max email or phone length 30",
                },
              })}
            />
            <p
              className={` ${
                errors.phone ? "visible" : "invisible"
              }  text-red-500 text-sm mt-1 pl-1"`}
            >
              {String(errors?.phone?.message)}
            </p>
          </InputCol>
        </InputGroup>
        <InputGroup>
          <InputCol>
            <select
              className="  form-input "
              {...register("interview_slot", {
                required: true,
                validate: (val) => val !== "def" || "please select interview",
              })}
            >
              <option className="capitalize" value="def">
                choose slot
              </option>
              {uniqueInterviews.map((interview) => (
                <option
                  className="capitalize"
                  value={interview.id}
                  key={interview.id}
                >
                  {format(interview.interview_date, "eee MM/dd  hh:mm aa")} to{" "}
                  {format(
                    addMinutes(interview.interview_date, 45),
                    "hh:mm aa "
                  )}
                </option>
              ))}
            </select>
            <p
              className={` ${
                errors.interview_slot ? "visible" : "invisible"
              }  text-red-500 text-sm mt-1 pl-1"`}
            >
              {String(errors?.interview_slot?.message)}
            </p>
          </InputCol>
        </InputGroup>

        <div className="flex items-center justify-center mt-20">
          <Button isLoading={isAdding} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Interview;
