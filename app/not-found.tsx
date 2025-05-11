"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[800px] flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}