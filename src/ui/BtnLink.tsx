import { Link } from "react-router";

function BtnLink({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="disabled:cursor-not-allowed disabled:bg-red-400  border text-lg capitalize hover:bg-primaryDark transition duration-300 font-normal w-36 px-8 py-1 bg-primary text-white"
    >
      {title}
    </Link>
  );
}

export default BtnLink;
