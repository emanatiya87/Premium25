import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../ui/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { isSameMinute } from "date-fns/fp";
import { useMutation } from "@tanstack/react-query";
import { addInterviewSlot } from "../services/apiServices";
import toast from "react-hot-toast";

function AddInterview() {
  const [interviewDate, setInterviewDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [interviewerName, setInterviewerName] = useState<string>("");
  const { mutate, isLoading } = useMutation({
    mutationFn: addInterviewSlot,
    onSuccess: () => toast.success("slot added succussfully"),
    onError: (err: Error) => toast.error(err.message),
  });

  function addSlot(e: FormEvent) {
    e.preventDefault();
    if (!interviewDate || !interviewDate) return;
    const formattedDate = format(interviewDate!, "yyyy MM dd HH:mm'");
    // console.log(formattedDate);
    const form = new FormData();
    form.append("interview_date", formattedDate);
    form.append("interviewer_name", interviewerName);
    mutate(form);
  }

  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        add interview slot{" "}
      </h3>
      <form onSubmit={addSlot}>
        <div className="flex flex-col items-center justify-center mt-10 ">
          {" "}
          <input
            className="form-input"
            type="text"
            value={interviewerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInterviewerName(e.target.value)
            }
            placeholder="name of interviewer"
            required
          />
        </div>
        <div className="w-full flex-col lg:flex-row flex  mt-10 items-center capitalize">
          <label className="block text-xl font-medium mb-2  lg:mr-auto">
            Interview Date :
          </label>
          <DatePicker
            selected={interviewDate}
            onChange={(date: Date | null) => setInterviewDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            placeholderText="Select date and time"
            className="form-input"
            minDate={new Date()}
            minTime={new Date(new Date().setHours(10, 0, 0))}
            maxTime={new Date(new Date().setHours(22, 0, 0))}
            calendarClassName="bg-white border rounded-lg shadow-lg p-4"
            dayClassName={(date) =>
              `text-sm p-2 rounded-full transition-all duration-200
               hover:bg-primary
               ${
                 isSameDay(date, interviewDate || new Date())
                   ? "!bg-primary text-white"
                   : ""
               }`
            }
            timeClassName={(date) =>
              `text-sm p-2 rounded-full transition-all duration-200
               hover:bg-primary
               ${
                 isSameMinute(date, interviewDate || new Date())
                   ? "!bg-primary text-white"
                   : ""
               }`
            }
          />
        </div>
        <div className="flex items-center justify-center mt-20">
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddInterview;
