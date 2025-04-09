import { ReactNode } from "react";

function InputGroup({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between items-start  mt-10  ">{children}</div>
  );
}

export default InputGroup;
