import React, { useState } from "react";
import "./FacialRecognitionSystem.css";
import BoundingBox from "../BoundingBox/BoundingBox";
import placeholder from "./detect-face.svg";

const FacialRecognitionSystem = ({ imageUrl, boxAreas }) => {
  const [imageStatus, setImageStatus] = useState("Loading...");

  const handleImageLoaded = () => {
    setImageStatus("");
  };

  if (imageUrl !== "") {
    return (
      <div className="frs--container">
        <div className="frs--container-inner">
          <img
            className="frs__image"
            id="inputImage"
            onLoad={handleImageLoaded}
            src={imageUrl}
            alt=""
          />
          <BoundingBox boxAreas={boxAreas} />
          {imageStatus !== "" ? (
            <p style={{ textAlign: "center" }}>{imageStatus}</p>
          ) : undefined}
        </div>
      </div>
    );
  } else {
    return (
      <div className="frs--container">
        <div className="frs--container-inner">
          <img
            className="frs__image frs--no-border"
            id="inputImage"
            // onLoad={handleImageLoaded}
            src={placeholder}
            alt=""
          />
        </div>
      </div>
    );
  }
};

export default FacialRecognitionSystem;
