import React from "react";
import "./BoundingBox.css";

const BoundingBox = ({ boxAreas }) => {
  return (
    <div>
      {boxAreas.map((boxArea, index) => {
        return (
          <div
            className="frs--bounding-box"
            key={index}
            style={{
              top: boxArea.topRow,
              left: boxArea.leftCol,
              bottom: boxArea.bottomRow,
              right: boxArea.rightCol
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default BoundingBox;
