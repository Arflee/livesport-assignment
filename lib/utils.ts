import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Entity from "./entity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchEntities(searchString: string) {
  const response = await fetch(`https://s.livesport.services/api/v2/search?type-ids=1,2,3,4&project-type-id=1&project-id=602&lang-id=1&q=${searchString}&sport-ids=1,2,3,4,5,6,7,8,9`);
  const jsonData = (await response.json()) as Entity[]

  return jsonData;
}