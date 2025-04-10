import BtnLink from "../ui/BtnLink";

function Error({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">⚠️ Error</h1>
      <p className="text-lg mb-6">{message}</p>
      
        <BtnLink to="/" title="go to home page" />
      
    </div>
  );
}

export default Error;
