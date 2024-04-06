import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="h-[35px] w-[150px] relative pr-10 hidden sm:block  pl-10 pl-1 ">
      <Image
        src="/images/logo.png"
        alt="airnesy logo"
        
        fill
        sizes="150px"
        priority
      />
    </Link>
  );
};

export default Logo;