import Entity, { EntityType } from "@/lib/entity";
import CardDetails from "./card-details";
import { ScrollArea } from "./scroll-area";
import { fetchEntities } from "@/lib/utils";
import ErrorMessage from "./errorMessage";

export default async function CardListView({
  query,
  filters,
}: {
  query: string;
  filters: string[];
  currentPage: number;
}) {
  
  const jsonData = await fetchEntities(query);

  if (!Array.isArray(jsonData)) {
    return <ErrorMessage errorMessage={jsonData.errorMessage} />;
  }

  const validJson = jsonData as Entity[];

  let filteredByTypeData = [] as Entity[];

  filters.forEach((filter) => {
    filteredByTypeData.push(
      ...validJson.filter((entity) => entity.type.id === +filter)
    );
  });

  filteredByTypeData =
    filteredByTypeData.length || filters.length
      ? filteredByTypeData
      : validJson;

  const filteredByName = query
    ? filteredByTypeData.filter((entity) =>
        entity.name.toLowerCase().includes(query.toLowerCase())
      )
    : filteredByTypeData;

    const bySport = filteredByName.reduce<Record<string, Entity[]>>((acc, ent) => {
      const key = ent.sport.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ent);
      return acc;
    }, {});
  return (
    <>
      <ScrollArea>
        {Object.entries(bySport).map(([sportName, entities]) => {
          return(
          <div key={sportName} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{sportName}</h2>
            <div className="grid xl:grid-cols-3 sm:max-xl:grid-cols-2 gap-2">
              {entities.map((entity) => {
                const imagePath = entity.images?.[0]?.path;
                const countryPath = entity.defaultCountry.images[0]?.path;
                const countryName = entity.defaultCountry.name;
                const gender = entity.gender.name;
                const teamName = entity.teams?.[0]?.name || "Individual player";
                const isPlayer = entity.type.id === EntityType.IndividualPlayer || entity.type.id === EntityType.TeamPlayer;
                const avatarSrc = imagePath
                  ? `https://www.livesport.cz/res/image/data/${imagePath}`
                  : "/avatar-placeholder.jpg";
                const countryLogoSrc = countryPath
                  ? `https://www.livesport.cz/res/image/data/${countryPath}`
                  : "avatar-placeholder.jpg";
                return (
                  <CardDetails
                    avatarSrc={avatarSrc}
                    countryLogoSrc={countryLogoSrc}
                    countryName={countryName}
                    gender={gender}
                    teamName={teamName}
                    isPlayer={isPlayer}
                    sportName={sportName}
                    key={entity.id}
                    title={entity.name}
                    className="w-full justify-center hover:bg-accent"
                    alt="Entity image"
                  />
                );
              })}
            </div>
          </div>
        )})}
      </ScrollArea>
    </>
  );
}
