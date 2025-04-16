import { format } from "date-fns";
import { StudentType } from "../../types/form";

const status = {
  Accepted: "bg-green-200 text-green-800",
  Rejected: "bg-red-200 text-red-800",
  Pending: "bg-yellow-200 text-black",
};
const studentyear = {
  engineering: {
    0: "freshman",
    1: "sopohmore",
    2: "junior",
    3: "senior-1",
    4: "senior-2",
  },
  other: { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th" },
};
function StudentItem({ student, idx }: { student: StudentType; idx: number }) {
  return (
    <tr key={idx} className="hover:bg-gray-50 text-center h-20  ">
      <td className="p-2 border text-nowrap">{student.name}</td>
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
      <td
        className={`p-2 px-4 border ${
          status[student.apply_status as keyof typeof status]
        }`}
      >
        {student.apply_status}
      </td>
      <td className="p-2 border">{student.first_pref || "not chosen"}</td>
      <td className="p-2 border">{student.second_pref || "not chosen"}</td>
      <td className="p-2 border">{student.third_pref || "not chosen"}</td>
      <td className="p-2 border ">{student.pref_percentages}</td>
      <td className="p-2 border text-nowrap">{student.event_source}</td>
      <td className="p-2 border text-nowrap">score here</td>
      <td className="p-2 border text-nowrap">
        {student.created_at
          ? format(new Date(student.created_at), "eee MM/dd hh:mm aa")
          : "not chosen yet"}
      </td>
    </tr>
  );
}

export default StudentItem;
