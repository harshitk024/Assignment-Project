import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot(); 
    setImageSrc(image);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-2xl shadow-md"
        width={320}
        height={240}
      />
      <button
        onClick={capturePhoto}
        className="px-4 py-2 mt-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Capture Photo
      </button>
      </div>

      {imageSrc && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Captured Image:</h3>
          <img
            src={imageSrc}
            alt="Captured"
            className="rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
