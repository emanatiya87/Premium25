import BtnLink from "../ui/BtnLink";

function Error({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">⚠️ An Error Occurred</h1>
      <p className="text-lg mb-2">{message}</p>

      <p className="mb-6 text-base">
        If you believe this is a mistake or you're facing issues, please reach out to us at:
        <br />
        <a
          href="mailto:apec.support.premium@apeceg.com"
          className="text-red-600 underline hover:text-red-800"
        >
          apec.support.premium@apeceg.com
        </a>
      </p>

      {message === "The quiz has already been submitted." ? (
        <a
          href="https://apeceg.com/"
          className="inline-block text-lg capitalize font-normal w-36 px-8 py-1 transition duration-300 bg-primary text-white hover:bg-primaryDark"
        >
         Go to Our Main Page
        </a>
      ) : (
        <BtnLink to="/" title="Go to Home Page" />
      )}
    </div>
  );
}

export default Error;
