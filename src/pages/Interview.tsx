import { getInterviews } from "../services/apiServices";
import Button from "../ui/Button";

function Interview() {
  getInterviews();
  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <h3 className="uppercase text-center text-3xl  text-primary font-bold  tracking-[5px] lg:tracking-[10px] ">
        choose interview slot{" "}
      </h3>
      <form>
        <div className="flex flex-col items-center justify-center mt-10 ">
          {" "}
          <input
            className="form-input"
            type="text"
            placeholder="registered phone or email"
            required
          />
        </div>
        <div className="w-full flex-col lg:flex-row flex  mt-10 items-center capitalize"></div>
        <div className="flex items-center justify-center mt-20">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default Interview;
