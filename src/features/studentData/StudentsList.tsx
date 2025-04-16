import { StudentType } from "../../types/form";
import StudentItem from "./StudentItem";

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
            <th className="p-2 border">First Preference</th>
            <th className="p-2 border">Second Preference</th>
            <th className="p-2 border">Third Preference</th>
            <th className="p-2 border">Preferences percentage</th>
            <th className="p-2 border">event source</th>
            <th className="p-2 border">quiz score</th>
            <th className="p-2 border">Registered at</th>
          </tr>
        </thead>
        <tbody>
          {(students ?? []).length === 0 ? (
            <tr>
              <td
                colSpan={18}
                className="lg:text-center p-10 md:text-4xl uppercase text-primary font-semibold"
              >
                No students found 😢.
              </td>
            </tr>
          ) : (
            (students ?? []).map((student: StudentType, idx) => (
              <StudentItem student={student} idx={idx} key={idx} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsList;
