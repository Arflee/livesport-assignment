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
    <div className="mx-auto max-w-[80%] space-y-2">
      <Input className="mt-2 w-full flex justify-center h-10" placeholder="Search" id="searchField" />
      <div className="space-y-2">
        <ToggleGroupClient />
          {query ? (
            <Suspense fallback={<CardListViewSkeleton/>}>
              <CardListView
                query={query}
                filter={filter}
                currentPage={currentPage}
              />
            </Suspense>
          ) : (
            <Label className="mb-2 flex w-full justify-center">Start by typing you favourite team name above!</Label>
          )}
      </div>
    </div>
  );
}
