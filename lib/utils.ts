import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Entity from "./entity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchEntities(searchString: string): Promise<Entity[] | { errorMessage: string, code: number }> {
  const response = await fetch(`https://s.livesport.services/api/v2/search?type-ids=1,2,3,4&project-type-id=1&project-id=602&lang-id=1&q=${searchString}&sport-ids=1,2,3,4,5,6,7,8,9`);

  switch (response.status) {
    case 200:
      const jsonData = (await response.json()) as Entity[]
      return jsonData;

    case 422:
      return { errorMessage: "The search string is too short! Try something else.", code: response.status }

    case 400:
      return { errorMessage: "The developer wrote bad fetch string. It's not your fault", code: response.status }

    default:
      return { errorMessage: "Oi! Oi! Something bad has happened. Try again...maybe.", code: response.status }
  }
}

export function pascalToSentence(str: string) {
  const words = [];
  let wordStart = 0;

  for (let i = 1; i < str.length; i++) {
    const char = str[i];
    if (char >= 'A' && char <= 'Z') {
      words.push(str.slice(wordStart, i));
      wordStart = i;
    }
  }

  words.push(str.slice(wordStart));

  const [firstWord, ...restWords] = words;
  return [firstWord, ...restWords.map(w => w.toLowerCase())].join(' ');
}