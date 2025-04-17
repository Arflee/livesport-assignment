"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function ErrorMessage({errorMessage} : {errorMessage: string}) {
  function reloadPage() {
    router.push("/results")
  }
  
  const router = useRouter();

  return (
    <div className="flex flex-col text-center items-center w-full justify-center">
      <Label>{errorMessage}</Label>
      <Button onClick={reloadPage}>Reload</Button>
    </div>
  );
}
