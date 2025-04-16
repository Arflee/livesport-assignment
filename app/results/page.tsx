import {
  EntityType,
} from "@/components/client/filtered-scroll-viewport";
import PaginationClient from "@/components/client/pagination-client";
import CardDetails from "@/components/ui/card-details";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Player from "@/lib/player";
import clsx from "clsx";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const response = await fetch(
    "https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9"
  ).then(await new Promise((resolve) => setTimeout(resolve, 2000)));
  const jsonData = (await response.json()) as Player[];
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col mx-auto space-y-2">
      <Input className="mx-auto" placeholder="Search" id="searchField" />
      <div className="mx-auto *:mx-auto space-y-2">
        <Separator />
        <ToggleGroup
          type="single"
          variant="outline"
          size="lg"
          className={clsx(
            "*:w-25 m-auto flex flex-wrap justify-center",
            className
          )}
          onValueChange={onToggleChange}
        >
          <ToggleGroupItem
            value={EntityType.Competitions.toString()}
            aria-label="Toggle leagues"
            className="whitespace-normal break-words px-4 py-2"
          >
            <Label>Leagues</Label>
          </ToggleGroupItem>
          <ToggleGroupItem
            value={EntityType.Teams.toString()}
            aria-label="Toggle teams"
            className="whitespace-normal break-words px-4 py-2"
          >
            <Label>Teams</Label>
          </ToggleGroupItem>
          <ToggleGroupItem
            value={EntityType.IndividualPlayers.toString()}
            aria-label="Toggle individual players"
            className="whitespace-normal break-words px-4 py-2"
          >
            <Label>Individual players</Label>
          </ToggleGroupItem>
          <ToggleGroupItem
            value={EntityType.TeamPlayers.toString()}
            aria-label="Toggle team players"
            className="whitespace-normal break-words px-4 py-2"
          >
            <Label>Team players</Label>
          </ToggleGroupItem>
        </ToggleGroup>
        <Separator />
        <div className="flex justify-center items-center">
          <ScrollArea className="flex justify-center w-3xl relative rounded-md">
            <Suspense fallback={<p>Loading...</p>}>
              {paginatedData.map((player) => {
                const avatarSrc = player.images?.[0]?.path
                  ? `https://www.livesport.cz/res/image/data/${player.images[0].path}`
                  : "https://github.com/shadcn.png";
                return (
                  <CardDetails
                    avatarSrc={avatarSrc}
                    key={player.id}
                    title={player.name}
                    description={player.sport.name}
                    className="mb-2"
                  />
                );
              })}
            </Suspense>
          </ScrollArea>
        </div>
      </div>
      <PaginationClient totalPages={5}/>
    </div>
  );
}
