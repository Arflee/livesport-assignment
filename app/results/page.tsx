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
    filter?: string[];
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filters = searchParams?.filter || [];
  const currentPage = Number(searchParams?.page) || 1;

  const filtersArray = Array.isArray(filters) ? filters : Array(filters);

  return (
    <div className="mx-auto max-w-[80%] space-y-2">
      <Input className="mt-2 w-full flex justify-center h-10" placeholder="Search" />
      <div className="space-y-2">
        <ToggleGroupClient />
          {query ? (
            <Suspense fallback={<CardListViewSkeleton/>}>
              <CardListView
                query={query}
                filters={filtersArray}
                currentPage={currentPage}
              />
            </Suspense>
          ) : (
            <Label className="mt-[20%] flex w-full justify-center">Start by typing the name of your favorite team or player above!</Label>
          )}
      </div>
    </div>
  );
}
