import NotFound from "./NotFound";
import BtnLink from "../ui/BtnLink";

function Success() {
  const studentData = localStorage.getItem("studentData")
    ? JSON.parse(localStorage.getItem("studentData") as string)
    : null;

  if (!studentData) return <NotFound />;
  // console.log("Student data from local storage:", studentData); // Log the student data
  return (
    <div className=" bg-white w-full  lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        congralation !{" "}
      </h3>
      <p className="capitalize text-center text-lg lg:text-2xl my-3 ">
        you on a one step from complete your application
      </p>
      {studentData.cv === "Pending" && (
        <div className="text-center mb-4 ">
          <p className="  mb-2 text-lg">use this link to upload the cv</p>
          <BtnLink
            title="upload cv"
            to={`/uploadcv?id=${studentData.student_id}&code=${studentData.hash_code}`}
          />
        </div>
      )}
      <div className="text-center mb-4 ">
        <p className="  mb-2 text-lg">use this link to start the quiz</p>
        <BtnLink
          title="start the quiz"
          to={`/quiz?id=${studentData.student_id}&code=${studentData.hash_code}`}
        />
      </div>
      <p className="text-center text-sm text-gray-700  mt-10">
        * please do not share these links with any one *
      </p>
      <p className="text-center text-sm text-gray-700  ">
        * email with these links will send to you automatically but for more
        safety bookmark this page *
      </p>
    </div>
  );
}

export default Success;
