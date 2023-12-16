import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PuffLoader size={50} color="#FB5454" />
    </div>
  );
}

export default Loading;