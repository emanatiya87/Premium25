function InputCol({
  children,
  size,
}: {
  children: React.ReactNode;
  size?: string;
}) {
  return (
    <div
      style={{
        width: size ? `${size}%` : "100%",
        minWidth: size ? `${size}%` : "100%",
      }}
      className=" flex flex-col "
    >
      {children}
    </div>
  );
}

export default InputCol;
