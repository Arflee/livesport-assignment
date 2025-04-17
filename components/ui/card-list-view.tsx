import Entity from "@/lib/entity";
import CardDetails from "./card-details";
import { ScrollArea } from "./scroll-area";

export default async function ListView({
  query,
  filter,
  currentPage,
  entitiesPerPage
}: {
  query: string;
  filter: string;
  currentPage: number;
  entitiesPerPage: number;
}) {
  const response = await fetch(
    "https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9"
  );

  const jsonData = (await response.json()) as Entity[];
  const filteredByTypeData = filter
    ? jsonData.filter((entity) => entity.type.id === +filter)
    : jsonData;
  const filteredByName = query
    ? filteredByTypeData.filter((entity) =>
        entity.name.toLowerCase().includes(query.toLowerCase())
      )
    : filteredByTypeData;

  const paginatedData = filteredByName.slice(
      (currentPage - 1) * entitiesPerPage,
      currentPage * entitiesPerPage
    );
  return (
    <>
      <ScrollArea className="flex justify-center w-3xl relative rounded-md">
        {paginatedData.map((entity) => {
          const avatarSrc = entity.images?.[0]?.path
            ? `https://www.livesport.cz/res/image/data/${entity.images[0].path}`
            : "/avatar-placeholder.jpg";
          return (
            <CardDetails
              avatarSrc={avatarSrc}
              key={entity.id}
              title={entity.name}
              description={entity.sport.name}
              className="mb-2"
            />
          );
        })}
      </ScrollArea>
    </>
  );
}
