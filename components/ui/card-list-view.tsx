import CardDetails from "./card-details";
import PaginationClient from "./pagination-client";
import { ScrollArea } from "./scroll-area";
import { fetchEntities } from "@/lib/utils";

export default async function CardListView({
  query,
  filter,
  currentPage,
}: {
  query: string;
  filter: string;
  currentPage: number;
}) {
  const entitiesPerPage = 5;

  const jsonData = await fetchEntities(query);
  //await new Promise(resolve => setTimeout(resolve, 1000));

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

  const totalPages = filteredByName.length
    ? Math.ceil(filteredByName.length / entitiesPerPage)
    : 0;
  return (
    <>
      <ScrollArea className="flex justify-center max-w-[100%] rounded-md">
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
              className="mb-2 flex w-full justify-center"
              alt="Entity image"
            />
          );
        })}
      </ScrollArea>
      <PaginationClient currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
