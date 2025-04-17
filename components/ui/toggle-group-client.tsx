"use client";

import { EntityType } from "@/lib/entity";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Label } from "./label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ToggleGroupClient() {
  const onToggleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="lg"
      className="*:w-25 m-auto flex flex-wrap justify-center"
      onValueChange={onToggleChange}
      defaultValue={searchParams.get("filter")?.toString()}
    >
      <ToggleGroupItem
        value={EntityType.Competition.toString()}
        aria-label="Toggle leagues"
        className="whitespace-normal break-words px-4 py-2"
      >
        <Label>Leagues</Label>
      </ToggleGroupItem>
      <ToggleGroupItem
        value={EntityType.Team.toString()}
        aria-label="Toggle teams"
        className="whitespace-normal break-words px-4 py-2"
      >
        <Label>Teams</Label>
      </ToggleGroupItem>
      <ToggleGroupItem
        value={EntityType.IndividualPlayer.toString()}
        aria-label="Toggle individual players"
        className="whitespace-normal break-words px-4 py-2"
      >
        <Label>Individual players</Label>
      </ToggleGroupItem>
      <ToggleGroupItem
        value={EntityType.TeamPlayer.toString()}
        aria-label="Toggle team players"
        className="whitespace-normal break-words px-4 py-2"
      >
        <Label>Team players</Label>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
