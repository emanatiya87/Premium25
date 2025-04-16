import { useMutation } from "@tanstack/react-query";
import Button from "../ui/Button";
import { changeStatus } from "../services/apiServices";
import toast from "react-hot-toast";

import { ChangeEvent, FormEvent, useState } from "react";

function ChangeStatus() {
  const [phone, setPhone] = useState<string>("");
  const { mutate, isLoading } = useMutation({
    mutationFn: changeStatus,
    onSuccess: (data) => {
      toast.success(data);
      setPhone("");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone) return;
    mutate({ phone });
  }

  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        allow student to choose interview{" "}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center mt-20">
          <input
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            className="form-input"
            type="text"
            placeholder="registered email or phone"
            required
          />
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button isLoading={isLoading} type="submit">
            allow
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangeStatus;
