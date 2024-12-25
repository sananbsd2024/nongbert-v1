import React from "react";
import ImageSlider from "./ImageSlider";

const HeaderPage = () => {
  return (
    <div className="container p-2 bg-white">
      <div className="row p-0 flex">
        <div className="col-1 text-center d-sm-block d-none">
          <img src="images/logo.png" width={80} className="img-fluid" />
        </div>
        <div className="col-7 pt-2 d-sm-block d-none">
          <span className="fs22 Prompt">โรงเรียนบ้านหนองเบิด</span>
          <br />
          <span className="fs14 Prompt">Nongberd School</span>
        </div>
      </div>
      <ImageSlider />
    </div>
  );
};

export default HeaderPage;
