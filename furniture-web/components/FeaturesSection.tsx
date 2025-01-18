import Image from "next/image";
import React from "react";

import showfeatures from "@/jsondata/feartureData.json";

export const FeaturesSection = () => {
  return (
    <div className="w-full flex flex-col items-start md:items-center justify-center px-4 py-24">
      <h1 className="text-2xl md:text-3xl font-sans">
        What makes our brand different
      </h1>

      <div className="md:container md:mx-auto w-full mt-6 flex flex-col items-start md:items-center md:justify-evenly px-2 md:flex-row gap-4">
        {showfeatures.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-[#F9F9F9]"
          >
            <span className="text-xl">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={24}
                height={24}
              />
            </span>
            <p className="text-xl semi-bold"> {feature.title}</p>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
