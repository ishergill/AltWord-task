import React from "react";
import Image from "next/image";

function Loading() {
  return (
    <div className="loading">
      <Image
        src={
          "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDVvMGk5MGh6N2FicHN2OXhla3p5MXVwbHRsMTVuMzR2OWh4NWNwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/feN0YJbVs0fwA/giphy.gif"
        }
        alt="loading..."
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loading;
