import Input from "@/components/ui/input";
import ListView from "@/components/ui/card-list-view";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import ToggleGroupClient from "@/components/ui/toggle-group-client";
import Entity from "@/lib/entity";
import PaginationClient from "@/components/ui/pagination-client";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";
  const currentPage = Number(searchParams?.page) || 1;

    const response = await fetch(
      "https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9"
    );
  
    const jsonData = (await response.json()) as Entity[]

    const entitiesPerPage = 5;
    const totalPages = Math.ceil(jsonData.length / entitiesPerPage);

  return (
    <div className="flex flex-col mx-auto space-y-2">
      <Input className="mx-auto" placeholder="Search" id="searchField" />
      <div className="mx-auto *:mx-auto space-y-2">
        <Separator />
        <ToggleGroupClient />
        <Separator />
        <div className="flex justify-center items-center">
          <Suspense fallback={<p>Loading...</p>}>
            <ListView query={query} filter={filter} currentPage={currentPage} entitiesPerPage={entitiesPerPage}/>
          </Suspense>
        </div>
      </div>
     <PaginationClient currentPage={currentPage} totalPages={totalPages}/>
    </div>
  );
}
