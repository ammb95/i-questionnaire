import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-24 flex items-center justify-between px-4 bg-green-900 text-white text-2xl">
      <div className="text-sm text-green-600">iQuestionnaire v1.0 @ {year}</div>
      <div className="text-sm text-green-600">
        Arthur Bortolini - arthurbdev@gmail.com
      </div>
    </footer>
  );
}
