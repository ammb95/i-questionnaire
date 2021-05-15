import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grid grid-cols-12 md:px-24 flex items-center justify-between px-4 bg-green-900 text-white text-2xl">
      <div className="col-span-7 text-xs md:text-sm text-green-600">
        iQuestionnaire v1.0 @ {year}
      </div>
      <div className="col-span-5 text-xs md:text-sm text-green-600 text-right">
        <div className="block sm:hidden">
          Arthur Bortolini arthurbdev@gmail.com
        </div>
        <div className="hidden sm:block">
          Arthur Bortolini - arthurbdev@gmail.com
        </div>
      </div>
    </footer>
  );
}
