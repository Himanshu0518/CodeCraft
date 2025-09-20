import { BallTriangle } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
    
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
     
    </div>
  );
}

export default Spinner;
