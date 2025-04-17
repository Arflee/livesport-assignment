import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default async function NotFound() {
  return (
    <div className="text-center">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">
        Return <b>Home</b>
      </Link>
    </div>
  );
}
