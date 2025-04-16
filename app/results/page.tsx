import CardDetails from "@/components/ui/card-details";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Player from "@/lib/player";

export default async function Home() {
  const response = await fetch(
    "https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9"
  );
  const jsonData = (await response.json()) as Player[];

  console.log(jsonData[0].images[0].path);

  return (
    <div className="flex flex-col mx-auto space-y-2">
      <Input className="mx-auto" placeholder="Search" id="searchField" />
      <Separator className="mx-auto" />
      <div className="mx-auto">
        <ToggleGroup
          type="single"
          variant="outline"
          size="lg"
          className="*:w-25"
        >
          <ToggleGroupItem value="leagues" aria-label="Toggle leagues">
            <Label>Leagues</Label>
          </ToggleGroupItem>
          <ToggleGroupItem value="teams" aria-label="Toggle teams">
            <Label>Teams</Label>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Separator />
      <div className="flex justify-center items-center ">
        <ScrollArea className="flex justify-center w-3xl relative rounded-md ">
          {jsonData.map((player) => {
            const avatarSrc = player.images?.[0]?.path
              ? `https://www.livesport.cz/res/image/data/${player.images[0].path}`
              : "https://github.com/shadcn.png";
            return (
              <CardDetails
                href="/"
                avatarSrc={avatarSrc}
                key={player.id}
                title={player.name}
                description={player.sport.name}
              />
            );
          })}
        </ScrollArea>
      </div>
      <Pagination className="mb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
