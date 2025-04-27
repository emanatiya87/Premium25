import NotFound from "./NotFound";
import BtnLink from "../ui/BtnLink";
import QRCode from "react-qr-code";

function Success() {
  const studentData = localStorage.getItem("studentData")
    ? JSON.parse(localStorage.getItem("studentData") as string)
    : null;

  if (!studentData) return <NotFound />;
  // console.log("Student data from local storage:", studentData); // Log the student data
  return (
    <div className=" bg-white w-full  lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        Congratulations !{" "}
      </h3>
      <p className=" text-center text-lg lg:text-2xl my-3 ">
        You are one step away from completing your application.
      </p>
      <div className="flex justify-around items-end mt-10 flex-wrap">
        {studentData.cv === "Pending" && (
          <div className="text-center mb-4  ">
            <p className="font-medium  mb-2 text-lg">
              Qr code to upload the cv
            </p>
            <QRCode
              className="m-auto my-4"
              value={`https://apeceg.com/APEC-Premium-2025/uploadcv?id=${studentData.student_id}&code=${studentData.hash_code}`}
              size={200}
            />
            <p className="  mb-2 text-lg"> or use this link </p>
            <BtnLink
              title="upload cv"
              to={`/uploadcv?id=${studentData.student_id}&code=${studentData.hash_code}`}
            />
          </div>
        )}
        <div className="text-center mb-4 ">
          <p className="font-medium  mb-2 text-lg">
            Qr code to start the PST <br /> (problem solving test)
          </p>

          <QRCode
            className="m-auto my-4"
            value={`https://apeceg.com/APEC-Premium-2025/quiz?id=${studentData.student_id}&code=${studentData.hash_code}`}
            size={200}
          />

          <p className=" mb-2 text-lg">or use this link</p>
          <BtnLink
            title="start the pst"
            to={`/quiz?id=${studentData.student_id}&code=${studentData.hash_code}`}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-700 mt-4  font-semibold">
        * mail with these links will send to you automatically but for more
        safety take screenshot for qr code and bookmark this page *
      </p>
      <div className="text-center text-lg text-red-600 font-medium mt-4">
        * Please note the following: *
        <div className="text-left mt-2">
          <p>*You are only allowed to take the PST exam once.</p>
          <p>*Do not refresh the exam page while taking it.</p>
          <p>*Do not share this link with anyone.</p>
          <p>*Be sure to access the exam before the end of the event.</p>
          <p>
            *You are not allowed to switch tabs, minimize the window, copy any
            content, or take screenshots during the exam.
          </p>
          <p className="text-red-600 font-bold mt-2">
            Any such action will result in the immediate submission of your PST
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Success;
