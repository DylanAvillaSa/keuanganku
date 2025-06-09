import React from "react";
import Image from "next/image";

const CardItem = ({ img, title }) => {
  return (
    <div className="w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] h-auto aspect-square rounded-2xl flex flex-col justify-center items-center shadow-md bg-white hover:shadow-lg transition duration-200 ease-in-out">
      <Image
        src={`/icon/${img}.png`}
        width={40}
        height={40}
        alt={title}
        className="object-contain"
      />
      <p className="font-medium text-xs sm:text-sm text-center text-slate-600 mt-3 px-2 leading-tight">
        {title}
      </p>
    </div>
  );
};

export default CardItem;
