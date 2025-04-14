import { StudentType } from "../../types/form";

function StudentsList({ students }: { students: StudentType[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full border border-gray-300">
        <thead className="bg-gray-200 text-center ">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">University</th>
            <th className="p-2 border">College</th>
            <th className="p-2 border">Major</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">cv</th>
            <th className="p-2 border">Experience</th>
            <th className="p-2 border">Apply Status</th>
            <th className="p-2 border">Interview Date</th>
            <th className="p-2 border">First Preference</th>
            <th className="p-2 border">Second Preference</th>
            <th className="p-2 border">Third Preference</th>
            <th className="p-2 border">Preferences percentage</th>
            <th className="p-2 border">Registered at</th>
          </tr>
        </thead>
        <tbody>
          {(students ?? []).length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center p-4">
                No students found.
              </td>
            </tr>
          ) : (
            (students ?? []).map((student: StudentType, idx) => (
              <tr key={idx} className="hover:bg-gray-50 text-center">
                <td className="p-2 border text-nowrap">{student.name}</td>
                <td className="p-2 border text-nowrap">{student.phone}</td>
                <td className="p-2 border text-nowrap">{student.email}</td>
                <td className="p-2 border">{student.university}</td>
                <td className="p-2 border">{student.college}</td>
                <td className="p-2 border">{student.major}</td>
                <td className="p-2 border">{student.year}</td>
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
                    "not uploaded"
                  )}
                </td>
                <td className="p-2 border">
                  <div className="max-w-[500px] max-h-[200px] overflow-auto">
                    {student.experience}
                  </div>
                </td>
                <td className="p-2 border">{student.apply_status}</td>
                <td className="p-2 border text-nowrap">
                  {student.interview_date instanceof Date
                    ? student.interview_date.toLocaleDateString()
                    : student.interview_date || "not chosen yet"}
                </td>
                <td className="p-2 border">
                  {student.first_pref || "not chosen"}
                </td>
                <td className="p-2 border">
                  {student.second_pref || "not chosen"}
                </td>
                <td className="p-2 border">
                  {student.third_pref || "not chosen"}
                </td>
                <td className="p-2 border ">{student.pref_percentages}</td>
                <td className="p-2 border text-nowrap">
                  {student.created_at instanceof Date
                    ? student.created_at.toLocaleDateString()
                    : student.created_at || "not chosen yet"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsList;
