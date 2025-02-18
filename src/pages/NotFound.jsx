import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen   gap-5 flex items-center flex-col justify-center   ">
      <h1 className="text-4xl flex items-center gap-0.5 font-medium tracking-wide">
        <span>Page Not Found</span>
        <span className="text-red-600 text-5xl">!</span>
      </h1>
      <Link to="/" className=" flex items-center gap-2 button-primary ">
        <FaArrowLeft />
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
