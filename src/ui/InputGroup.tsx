import { ReactNode } from "react";

function InputGroup({ children }: { children: ReactNode }) {
  return (
    <div className="flex  justify-between  space-y-5 md:space-y-0 items-start flex-wrap  mt-5 lg:mt-10  gap-x-9 ">
      {children}
    </div>
  );
}

export default InputGroup;
