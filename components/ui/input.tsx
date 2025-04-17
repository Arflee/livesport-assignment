"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";

export default function Input({
  className,
  ...props
}: React.HTMLProps<HTMLInputElement>) {

  const debounceDelay = 220;

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, debounceDelay);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
      <input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className={clsx(
          "border-1 border-solid rounded-md pl-9 shadow-xs max-w-[100%]",
          className
        )}
        placeholder={props.placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        id="searchField"
        {...props}
      />
    </div>
  );
}
