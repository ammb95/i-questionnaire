import React from "react";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <header className="flex items-center px-4 bg-green-900 text-white text-2xl">
      <Link to="/" className="mr-4">
        <i className="las la-home"></i>
      </Link>
      <h4>iQuestionaire</h4>
    </header>
  );
}
