"use client"
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-orange-800 w-full">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0 text-white">
            <a className="flex items-center" href="/">
              <span className="text-white-700 font-semibold text-xl tracking-tight">
                Books
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
