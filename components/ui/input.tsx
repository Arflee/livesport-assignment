"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Input({
  className,
  placeholder,
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)
  
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  return (
    <input
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      className={clsx(className)}
      {...props}
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
