"use client";

import { Card } from "./card";
import { Skeleton } from "./skeleton";

export default function CardSkeleton() {
  return (
    <Card className="mb-2 w-3xl mx-auto flex flex-col px-6">
      <div className="flex flex-row items-center">
        <Skeleton className="h-[100px] w-[100px] rounded-full mr-2" />
        <Skeleton className="w-[200px] h-2"/>
      </div>
      <Skeleton className="w-[200px] h-2"/>
    </Card>
  );
}