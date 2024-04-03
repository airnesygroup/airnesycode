import React from "react";
import Heading from "./Heading";
import Link from "next/link";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",

 
  showReset,
}) => {
  return (
    <div className=" h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
    

      <div className="w-48 mt-4 p-4" >
      
          <Link
            href="../"
            className="bg-white border-[1px] border-gray-500 text-[#4e4e4e] p-4 rounded hover:opacity-80 transition "
          >
            Go back home
          </Link>
      
      </div>
    </div>
  );
};

export default EmptyState;
