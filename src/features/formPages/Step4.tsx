import { useFormContext } from "react-hook-form";
import InputCol from "../../ui/InputCol";
import InputGroup from "../../ui/InputGroup";

function Step4() {
  const {
    formState: { errors },
    watch,
    register,
  } = useFormContext();
  const includeCv = watch("includeCv");
  return (
    <>
      <InputGroup>
        <InputCol>
          <select
            {...register("aboutUs", {
              required: true,
              validate: (value) => value !== "def" || "Please select one",
            })}
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          >
            <option value="def"> How do hear about the Event?</option>
            <option value="facebook">Facebook</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Whatsapp">Whatsapp Channel</option>
            <option value="Ushering">
              Ushering(some one from apec talk to you)
            </option>
            <option value="other">Other</option>
          </select>
          <p
            className={` ${
              errors.aboutUs ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.aboutUs?.message)}
          </p>
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol>
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("includeCv")}
              className="appearance-none w-6 h-6  border-2 border-primary bg-white  checked:border-primary focus:outline-none transition duration-200 checked:relative checked:after:content-[''] checked:after:block checked:after:w-4 checked:after:h-4 checked:after:bg-primary  checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            />
            <span className=" font-medium">Upload cv now?</span>
          </label>
        </InputCol>
      </InputGroup>

      {watch("includeCv") && (
        <InputGroup>
          <label className="inline-block cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              {...register("cv", {
                required: includeCv ? "cv is required" : false,
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
        </InputGroup>
      )}
    </>
  );
}

export default Step4;
