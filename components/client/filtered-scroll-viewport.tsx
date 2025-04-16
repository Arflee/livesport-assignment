"use client";

import clsx from "clsx";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import CardDetails from "../ui/card-details";
import Entity from "@/lib/player";
import { useState } from "react";

export enum EntityType {
  Competitions = 1,
  Teams = 2,
  IndividualPlayers = 3,
  TeamPlayers = 4,
}

export default function FilteredScrollViewport({
  className,
  jsonData,
}: {
  className?: string;
  jsonData: Entity[];
}) {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const onToggleChange = (value: string | null) => {
    if (value === null) {
      setSelectedFilter(null);
      return;
    }

    setSelectedFilter(+value);
  };

  const filteredData = selectedFilter
    ? jsonData.filter((item) => item.type.id === selectedFilter)
    : jsonData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
}
