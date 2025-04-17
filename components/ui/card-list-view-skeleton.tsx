import CardSkeleton from "./card-skeleton";

export default function CardListViewSkeleton() {
  return (
    <>
      <div className="flex flex-col justify-around items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
