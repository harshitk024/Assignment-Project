import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import CameraCapture from "../../components/Webcam";
import { useState } from "react";

const Index = () => {
  const { name } = useParams();
  const { data, isLoading } = useData();
  const [showCamera,setShowCamera] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const record = data.find((d) => d[0] === name);

  console.log(record);
  return (
    <div>
      <div className="p-3 flex flex-col gap-4">
      <div>
         <h1 className="text-2xl font-bold">Details</h1>
      </div>
      <div>
        <div>Name: {record[0]}</div>
        <div>Designation: {record[1]}</div>
        <div>Location: {record[2]}</div>
        <div>Code: {record[3]}</div>
        <div>Date: {record[4]}</div>
        <div>Salary: {record[5]}</div>
      </div>
      </div>
      <div>
      {showCamera ? <CameraCapture /> : null}
      <button className= "m-5 bg-blue-500 p-3 text-white" onClick={() => setShowCamera(!showCamera)}>{showCamera ? "hide camera" : "Show Camera"}</button>
      </div>
    </div>
  );
};

export default Index;
