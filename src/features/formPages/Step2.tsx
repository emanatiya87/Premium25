import { useFormContext } from "react-hook-form";
import InputGroup from "../../ui/InputGroup";
import InputCol from "../../ui/InputCol";
const faculties = {
  engineering: ["freshman", "sophomore", "junior", "senior1", "senior2"],
  business: ["first year", "second year", "third year", "fourth year"],
  medicine: [
    "first year",
    "second year",
    "third year",
    "fourth year",
    "fifth year",
    "sixth year",
  ],
  arts: ["first year", "second year", "third year", "fourth year"],
  other: ["first year", "second year", "third year", "fourth year"],
};
const depertments = [
  "Civil",
  "Architectural",
  "Mechanical production",
  "Mechanical Power / Energy",
  "Mechanical Production",
  "Mechanical Automtive",
  "Mechanical Mechatronics",
  "Electrical Computer",
  "Electrical Communication",
  "Electrical Power",
];
const majors = {
  1: ["freshmen"],
  2: [
    "Civil",
    "Architectural",
    "Mechanical General(Automtive,Power,Mechatronics)",
    "Mechanical production",
    "Electrical General (Computer&Communication)",
    "Electrical Power",
  ],
  3: depertments,
  4: depertments,
  5: depertments,
};

function Step2() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <InputGroup>
        <InputCol size="45">
          <input
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters",
              },
            })}
            type="text"
            placeholder="First Name"
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:outline-none focus:border-black bg-secondary "
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm  mt-1 pl-1">
              {String(errors.firstName.message)}
            </p>
          )}
        </InputCol>
        <InputCol size="45">
          <input
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters",
              },
            })}
            type="text"
            placeholder="Last Name"
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:outline-none focus:border-black bg-secondary"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm  pl-1">
              {String(errors.lastName.message)}
            </p>
          )}
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol size="100">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 pl-1">
              {String(errors.email.message)}
            </p>
          )}
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol size="100">
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01\d{9}$/,
                message: "Phone number must be 11 digits and start with 01",
              },
            })}
            type="text"
            placeholder="Phone Number"
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2 pl-1">
              {String(errors.phone.message)}
            </p>
          )}
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol size="45">
          <select
            {...register("university", {
              validate: (value) =>
                value !== "def" || "please select university",
            })}
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          >
            <option value="def">Select University</option>
            <option value="AinShams ">Ain Shams </option>
            <option value="cairo">Cairo</option>
            <option value="helwan">Helwan</option>
            <option value="other">other</option>
          </select>
          {watch("university") === "other" && (
            <input
              {...register("otherUniversity", {
                required: "please enter your university",
              })}
              type="text"
              placeholder="Enter university"
              className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary mt-1"
            />
          )}
          {errors.university && (
            <p className="text-red-500 text-sm mt-2 pl-1">
              {String(errors.university.message)}
            </p>
          )}
          {errors.otherUniversity && (
            <p className="text-red-500 text-sm mt-2 pl-1">
              {String(errors.otherUniversity.message)}
            </p>
          )}
        </InputCol>
        <InputCol size="45">
          <select
            {...register("faculty", {
              validate: (value) => value !== "def" || "please select faculty",
            })}
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          >
            <option value="def">Select Faculty</option>
            {Object.keys(faculties).map((faculty) => (
              <option value={faculty} key={faculty}>
                {faculty}
              </option>
            ))}
          </select>
          {watch("faculty") === "other" && (
            <input
              {...register("otherFaculty", {
                required: "please enter your faculty",
              })}
              type="text"
              placeholder="Enter faculty"
              className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary mt-1"
            />
          )}
          {errors.faculty && (
            <p className="text-red-500 text-sm mt-2 pl-1">
              {String(errors.faculty.message)}
            </p>
          )}
          <p
            className={` ${
              errors.otherFaculty ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.otherFaculty?.message)}
          </p>
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol size="45">
          <select
            {...register("year", {
              validate: (value) =>
                value !== "def" || "please select your current year",
            })}
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          >
            <option value="def">Current Year</option>
            {faculties[watch("faculty") as keyof typeof faculties]?.map(
              (year, index) => (
                <option value={index + 1} key={year}>
                  {year}
                </option>
              )
            )}
          </select>
          <p
            className={` ${
              errors.year ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.year?.message)}
          </p>
        </InputCol>
        {watch("faculty") == "engineering" &&
          watch("year") !== "1" &&
          watch("year") !== "def" && (
            <InputCol size="45">
              <select
                {...register("major", {
                  validate: (value) =>
                    value !== "def" || "please select your major",
                })}
                className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
              >
                <option value="def">Select Major</option>
                {majors[watch("year") as keyof typeof majors]?.map((major) => (
                  <option value={major.replace(/ /g, "-")} key={major}>
                    {major}
                  </option>
                ))}
              </select>

              <p
                className={` ${
                  errors.major ? "visible" : "invisible"
                }  text-red-500 text-sm mt-2 pl-1"`}
              >
                {String(errors?.major?.message)}
              </p>
            </InputCol>
          )}
      </InputGroup>
    </>
  );
}

export default Step2;
