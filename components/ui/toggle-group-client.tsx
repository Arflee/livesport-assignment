"use client";

import { EntityType } from "@/lib/entity";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Label } from "./label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { pascalToSentence } from "@/lib/utils";

export default function ToggleGroupClient() {
  const onToggleChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.delete("filter");

    values.forEach((value) => params.append("filter", value));

    replace(`${pathname}?${params.toString()}`);
  };

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const queryLength = searchParams.get("query")?.length || 0;
  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      size="lg"
      className="w-full flex justify-center"
      onValueChange={onToggleChange}
      defaultValue={searchParams.getAll("filter")}
      disabled={queryLength <= 1}
    >
      {
        Object.keys(EntityType).filter((key) => isNaN(Number(key))).map((value, index) => {
          return(
            <ToggleGroupItem
            key={value}
            value={(index + 1).toString()}
            aria-label={`Toggle ${pascalToSentence(value)}`}
            className="whitespace-normal break-words px-4 py-2"
          >
            <Label>{pascalToSentence(value)}</Label>
          </ToggleGroupItem>
        )})
      }
    </ToggleGroup>
  );
}
