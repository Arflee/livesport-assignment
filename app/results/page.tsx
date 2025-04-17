import Input from "@/components/ui/input";
import CardListView from "@/components/ui/card-list-view";
import { Suspense } from "react";
import ToggleGroupClient from "@/components/ui/toggle-group-client";
import { Metadata } from "next";
import { Label } from "@radix-ui/react-label";
import CardListViewSkeleton from "@/components/ui/card-list-view-skeleton";

export const metadata: Metadata = {
  title: "Results",
};

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

  return (
    <div className="flex flex-col *:mx-auto space-y-2">
      <Input className="mx-auto" placeholder="Search" id="searchField" />
      <div className="mx-auto *:mx-auto space-y-2">
        <ToggleGroupClient />
        <div className="flex flex-col justify-around items-center">
          {query ? (
            <Suspense fallback={<CardListViewSkeleton/>}>
              <CardListView
                query={query}
                filter={filter}
                currentPage={currentPage}
              />
            </Suspense>
          ) : (
            <Label>Start by typing you favourite team name above!</Label>
          )}
        </div>
      </div>
    </div>
  );
}
