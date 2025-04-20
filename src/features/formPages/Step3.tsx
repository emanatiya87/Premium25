import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { getCompanies } from "../../services/apiServices";
import Spinner from "../../ui/Spinner";
import InputGroup from "../../ui/InputGroup";
import InputCol from "../../ui/InputCol";

function Step3() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const {
    data: companies,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "companies",
      watch("faculty") === "engineering"
        ? watch("year") === "1"
          ? "other"
          : watch("major")
        : watch("faculty"),
      watch("year"),
    ],
    queryFn: () =>
      getCompanies(
        watch("faculty") === "engineering"
          ? watch("year") === "1"
            ? "other"
            : watch("major")
          : watch("faculty"),
        watch("year")
      ),

    // enabled: !!watch("year"),
  });

  if (isLoading) return <Spinner />;
  if (error || !companies || companies.length === 0)
    return (
      <p className="text-3xl text-center my-10">
        Oops! No Companies Here Right Now. 🙃
      </p>
    );
  const sortedCompanies = companies?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <InputGroup>
        <InputCol>
          <select
            {...register("firstPreference", {
              required: true,
              validate: (value) => value !== "def" || "Please select a company",
            })}
            className="form-input"
          >
            <option value="def">Select your first preference</option>
            {sortedCompanies.map(({ id, name }) => {
              if (
                watch("secondPreference") == id ||
                watch("thirdPreference") == id
              )
                return null;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <p
            className={` ${
              errors.firstPreference ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.firstPreference?.message)}
          </p>
        </InputCol>
        {sortedCompanies.length > 1 && (
          <InputCol>
            <select
              {...register("secondPreference", {
                required: sortedCompanies.length > 1,
                validate: (value) =>
                  value !== "def" ||
                  sortedCompanies.length < 2 ||
                  "Please select a company",
              })}
              className="form-input"
            >
              <option value="def">Select your second preference</option>
              {sortedCompanies.map(({ id, name }) => {
                if (
                  watch("firstPreference") == id ||
                  watch("thirdPreference") == id
                )
                  return null;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            <p
              className={` ${
                errors.secondPreference ? "visible" : "invisible"
              }  text-red-500 text-sm mt-2 pl-1"`}
            >
              {String(errors?.secondPreference?.message)}
            </p>
          </InputCol>
        )}
      </InputGroup>
      <InputGroup>
        {sortedCompanies.length > 2 && (
          <InputCol>
            <select
              {...register("thirdPreference", {
                required: sortedCompanies.length > 2,
                validate: (value) =>
                  value !== "def" ||
                  sortedCompanies.length < 3 ||
                  "Please select a company",
              })}
              className="form-input"
            >
              <option value="def">Select your third preference</option>
              {sortedCompanies.map(({ id, name }) => {
                if (
                  watch("firstPreference") == id ||
                  watch("secondPreference") == id
                )
                  return null;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            <p
              className={` ${
                errors.thirdPreference ? "visible" : "invisible"
              }  text-red-500 text-sm mt-2 pl-1"`}
            >
              {String(errors?.thirdPreference?.message)}
            </p>
          </InputCol>
        )}

        <InputCol>
          <select
            {...register("preferencePercentage", {
              required: true,
              validate: (value) =>
                value !== "def" || "Please select pref percentages",
            })}
            className="form-input "
          >
            <option value="def">
              Percentage (First preference: Second preference: Third Preference)
            </option>
            <option value="100:0:0">100:0:0</option>
            <option value="50:30:20">50:30:20</option>
            <option value="50:50:0">50:50:0</option>
          </select>
          <p
            className={` ${
              errors.preferencePercentage ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.preferencePercentage?.message)}
          </p>
        </InputCol>
      </InputGroup>
      <InputGroup>
        <InputCol>
          <textarea
            {...register("previousExperience", {
              required: {
                value: true,
                message: "Please enter your previous experience",
              },
              minLength: {
                value: 10,
                message: "Please enter at least 10 characters",
              },
              validate: (value) =>
                value.length < 500 || "Please enter less than 500 characters",
            })}
            className="form-input"
            placeholder="Please enter your previous experience"
            rows={6}
          ></textarea>
          <p
            className={` ${
              errors.previousExperience ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.previousExperience?.message)}
          </p>
        </InputCol>
      </InputGroup>
    </>
  );
}

export default Step3;
