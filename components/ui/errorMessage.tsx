"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ErrorMessage({errorMessage} : {errorMessage: string}) {
  function reloadPage() {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }
  
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col text-center items-center w-full justify-center">
      <Label>{errorMessage}</Label>
      <Button className="cursor-pointer" onClick={reloadPage}>Reload</Button>
    </div>
  );
}
