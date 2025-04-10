function Button({
  children,
  type,
  onClick,
  isLoading,
}: {
  children: string;
  type: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;

  onClick?: () => void;
}) {
  return (
    <button
      style={{
        marginRight: children === "previous" ? "auto" : undefined,
        marginLeft: children !== "previous" ? "auto" : undefined,
      }}
      disabled={isLoading}
      className="disabled:cursor-not-allowed disabled:bg-red-400  border text-lg capitalize hover:bg-primaryDark transition duration-300 font-normal 
      w-24 lg:w-36 px-2 md:px-6 lg:px-8 py-1 bg-primary text-white"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
