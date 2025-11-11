import React from "react";

const LoadingSpinner = ({
  imageSrc = "/images/loader1.webp",
  altText = "Loading...",
}) => {
  return (
    <div className="rounded-full h-40 w-40 sm:h-56 sm:w-56">
      <img src={imageSrc} alt={altText} className="w-full h-full" />
    </div>
  );
};

export default LoadingSpinner;
