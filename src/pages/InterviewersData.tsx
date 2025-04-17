import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import { useStudentsInterviews } from "../features/studentInterviewers/useStudentsInterviews";
import StudentsInterviewsList from "../features/studentInterviewers/StudentsInterviewsList";
import { compareAsc } from "date-fns";

function InterviewersData() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputQ, setInputQ] = useState<string>("");
  const { isError, isLoading, students } = useStudentsInterviews(searchQuery);
  const [currentPage, setCurrentPage] = useState<number>(1);
  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(inputQ);
  }

  if (isError) return <Error />;

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = students?.slice(startIndex, startIndex + pageSize);
  paginatedStudents?.sort((a, b) => {
    return compareAsc(a.interview_date, b.interview_date);
  });
  // console.log(paginatedStudents);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#333333] to-[#8B1313] px-2 py-6 md:px-10 lg:p-20  space-y-10 ">
      <h3 className="text-center text-secondary uppercase  tracking-wide   text-4xl ">
        Registered interview Students
      </h3>
      <div className="flex justify-between items-center bg-white rounded-tl-[40px] rounded-br-[40px] p-4  md:p-6 lg:p-6 flex-col md:flex-row gap-y-4 md:gap-y-0">
        <p className="text-lg md:text-3xl font-semibold capitalize flex-grow ">
          total interviews :{" "}
          <span className="text-primary">
            {" "}
            {isLoading ? "-" : students?.length}
          </span>{" "}
        </p>
        <form
          onSubmit={handleSearch}
          className=" flex flex-col md:flex-row gap-y-1 lg:gap-x-4 w-full md:w-[50%] m-auto "
        >
          <input
            placeholder="interviewer name"
            type="text"
            className="form-input"
            value={inputQ}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputQ(e.target.value)
            }
          />
          <Button type="submit">
            {/* // onClick={handleSearch} */}
            search
          </Button>
        </form>
      </div>
      <div className="bg-white  w-full   m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-6 ">
        {isLoading ? (
          <Spinner />
        ) : (
          <StudentsInterviewsList students={paginatedStudents || []} />
        )}
        <div className="flex items-center justify-between mt-10">
          <Button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            isLoading={currentPage == 1}
            type="button"
          >
            previous
          </Button>

          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            isLoading={startIndex + pageSize >= (students?.length ?? 0)}
            type="button"
          >
            next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewersData;
