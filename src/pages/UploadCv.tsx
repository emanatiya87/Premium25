import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import { useNavigate, useSearchParams } from "react-router";

import { uploadCv } from "../services/apiServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type FormData = {
  cv: FileList;
};
function UploadCv() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  if (!searchParams.get("id") || !searchParams.get("code")) {
    navigate("/404", { replace: true });
  }

  const { mutate: addCv, isLoading } = useMutation({
    mutationFn: uploadCv,
    onSuccess: () => {
      toast.success("cv uploaded successfully");
      navigate("/thankyou?submit=cv", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(formData: FormData): void {
    const id = searchParams.get("id");
    const code = searchParams.get("code");
    const formDataWithIdAndCode = new FormData();
    formDataWithIdAndCode.append("cv", formData.cv[0]);
    if (id) {
      formDataWithIdAndCode.append("id", id);
    }

    if (code) {
      formDataWithIdAndCode.append("code", code);
    }
    addCv(formDataWithIdAndCode);
  }
  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        upload your cv{" "}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center mt-10">
          {" "}
          <label className="inline-block cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              {...register("cv", {
                required: "cv is required",
              })}
              accept=".pdf,.doc,.docx"
            />
            <span className="bg-primary text-white px-4 py-2 hover:bg-primaryDark cursor-pointer hover:bg-primary-8 transition duration-300">
              Upload File
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {watch("cv")?.[0]?.name || "No file selected"}
            </span>
          </label>
          <p
            className={` ${
              errors.cv ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.cv?.message)}
          </p>
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

export default UploadCv;
