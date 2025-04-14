import { ChangeEvent, useState } from "react";
import StudentsList from "../features/studentData/StudentsList";
import { useStudentsData } from "../features/studentData/useStudentsData";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Error from "./Error";

function Data() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputQ, setInputQ] = useState<string>("");
  const { isError, isLoading, students } = useStudentsData(searchQuery);

  function handleSearch(e: SubmitEvent) {
    e.preventDefault();
    setSearchQuery(inputQ);
  }

  if (isError) return <Error />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#333333] to-[#8B1313] px-2 py-6 md:px-10 lg:p-20  space-y-10 ">
      <h3 className="text-center text-secondary uppercase  tracking-wide   text-4xl ">
        students data
      </h3>
      <div className="flex justify-between items-center bg-white rounded-tl-[40px] rounded-br-[40px] p-4  md:p-6 lg:p-6 flex-col md:flex-row gap-y-4 md:gap-y-0">
        <p className="text-lg md:text-3xl font-semibold capitalize flex-grow ">
          total registered :{" "}
          <span className="text-primary">{students?.length}</span>{" "}
        </p>
        <form className=" flex flex-col md:flex-row gap-y-1 lg:gap-x-4 w-full md:w-[50%] m-auto ">
          <input
            placeholder="name or phone"
            type="text"
            className="form-input"
            value={inputQ}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputQ(e.target.value)
            }
          />
          <Button onClick={handleSearch} type="submit">
            search
          </Button>
        </form>
      </div>
      <div className="bg-white  w-[95%]  lg:w-full m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-6 ">
        {isLoading ? <Spinner /> : <StudentsList students={students || []} />}
      </div>
    </div>
  );
}

export default Data;
