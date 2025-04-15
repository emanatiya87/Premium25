function InputCol({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-col flex-1   basis-[100%] md:basis-0 lg:basis-0   ">
      {children}
    </div>
  );
}

export default InputCol;
