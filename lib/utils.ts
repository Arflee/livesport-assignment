import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Entity from "./entity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchEntities(searchString: string) : Promise<Entity[] | { errorMessage: string }> {
  const response = await fetch(`https://s.livesport.services/api/v2/search?type-ids=1,2,3,4&project-type-id=1&project-id=602&lang-id=1&q=${searchString}&sport-ids=1,2,3,4,5,6,7,8,9`);
  
  switch (response.status) {
    case 200:
      const jsonData = (await response.json()) as Entity[]
      return jsonData;

    case 422:
      return {errorMessage: "The search string is too short! Try something else."}
    
    case 400:
      return {errorMessage: "The developer wrote bad fetch string. It's not your fault"}

    default:
      return {errorMessage: "Oi! Oi! Something bad has happened. Try again...maybe."}
  }
}