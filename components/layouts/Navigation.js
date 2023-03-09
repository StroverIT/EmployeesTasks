import Image from "next/image";
import React from "react";

const Navigation = () => {
  return (
    <nav className="container pt-10 pb-16">
      <section className="flex items-center gap-x-2">
        <div className="relative w-8 h-8">
          <Image src="/flatIcons/employee_logo.png" fill alt="logo" />
        </div>
        <div className="text-xl font-semibold">TaskHub</div>
      </section>
    </nav>
  );
};

export default Navigation;
