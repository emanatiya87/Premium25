import { format, isPast, isToday } from "date-fns";
import { StudentTypeWithInterview } from "../../types/form";

const studentyear = {
  engineering: {
    1: "freshman",
    2: "sopohmore",
    3: "junior",
    4: "senior-1",
    5: "senior-2",
  },
  other: { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th" },
};
function StudentInterviewsItem({
  student,
  idx,
}: {
  student: StudentTypeWithInterview;
  idx: number;
}) {
  return (
    <tr
      key={idx}
      className={` text-center h-20  ${idx % 2 == 1 ? "bg-gray-200" : ""}  ${
        isToday(new Date(student.interview_date))
          ? "bg-green-200 font-medium"
          : ""
      } `}
    >
      <td className="p-2 border text-nowrap font-bold">
        {student.interviewer_name}
      </td>
      <td className="p-2 border text-nowrap">{student.name}</td>
      <td className="p-2 border text-nowrap">
        {format(new Date(student.interview_date), "eee MM/dd hh:mm aa")}
        {isPast(new Date(student.interview_date)) &&
        !isToday(new Date(student.interview_date)) ? (
          <span className="text-red-500 font-semibold ml-2 uppercase">
            passed
          </span>
        ) : (
          ""
        )}
        {isToday(new Date(student.interview_date)) ? (
          <span className="text-green-500 font-semibold ml-2 uppercase">
            today
          </span>
        ) : (
          ""
        )}
      </td>
      <td className="p-2 border text-nowrap">{student.phone}</td>
      <td className="p-2 border text-nowrap">{student.email}</td>
      <td className="p-2 border">{student.university}</td>
      <td className="p-2 border">{student.college}</td>
      <td className="p-2 border">{student.major}</td>
      <td className="p-2 border text-nowrap">
        {student.college === "engineering"
          ? studentyear["engineering"][
              student.year as keyof (typeof studentyear)["engineering"]
            ]
          : studentyear["other"][
              student.year as keyof (typeof studentyear)["other"]
            ]}
      </td>
      <td className="p-2 border text-nowrap">
        {student.cv ? (
          <a
            className="underline"
            target="_blank"
            href={`https://apeceg.com/Events2025/premium25cvs/${student.cv}`}
          >
            cv link
          </a>
        ) : (
          "not uploaded yet"
        )}
      </td>
      <td className="p-2 border">
        <div className="text-wrap w-[500px] max-w-[500px] max-h-[200px] overflow-auto">
          {student.experience}
        </div>
      </td>

      <td className="p-2 border">{student.first_pref || "not chosen"}</td>
      <td className="p-2 border">{student.second_pref || "not chosen"}</td>
      <td className="p-2 border">{student.third_pref || "not chosen"}</td>
      <td className="p-2 border ">{student.pref_percentages}</td>
      <td className="p-2 border text-nowrap">{student.event_source}</td>
      <td className="p-2 border text-nowrap">
        {" "}
        {student.score ?? "pst has not been taken yet"}
      </td>
      <td className="p-2 border text-nowrap">
        {student.created_at
          ? format(new Date(student.created_at), "eee MM/dd hh:mm aa")
          : "not chosen yet"}
      </td>
    </tr>
  );
}

export default StudentInterviewsItem;
