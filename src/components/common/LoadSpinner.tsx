import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AiOutlineLoading3Quarters className="text-blue-500 text-5xl animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
