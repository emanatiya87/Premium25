import Button from "../ui/Button";

function EventEnd() {
  return (
    <div className=" bg-white w-full   lg:w-[85%] m-auto rounded-tl-[40px] rounded-br-[40px] p-4 md:p-6 lg:p-10 ">
      <div className="text-center">
        <h2 className="text-3xl text-primary  uppercase tracking-wider font-bold mb-2">
          {" "}
          The Event Has Come to an End!
        </h2>
        <img className="w-96 m-auto" src="./7.svg" />
        <p className="text-gray-600 mb-4">
          Follow our page to stay updated about upcoming events!
        </p>
        <Button type="button">
          <a href="https://www.facebook.com/APECeg/" target="_blank">
            Follow Us
          </a>
        </Button>
      </div>
    </div>
  );
}

export default EventEnd;
