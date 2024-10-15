import { Pagination, Spacer } from "@nextui-org/react";
import ShoppingItemSkeleton from "./shoppingItemSkeleton";

export default function ShoppingItems({
  itemsPerRow,
}: {
  itemsPerRow: number;
}) {
  const itemsAmount = itemsPerRow * 2;

  
  const gridClasses = `grid gap-4 ${
    itemsPerRow === 2
      ? "grid-cols-2"
      : itemsPerRow === 3
      ? "grid-cols-3"
      : `grid-cols-${itemsPerRow}`
  }`;

  return (
    <>
      <div className={gridClasses}>
        {Array.from({ length: itemsAmount }).map((_, index) => (
          <ShoppingItemSkeleton key={index} />
        ))}
      </div>
      <Spacer y={8}></Spacer>
      <div className="flex justify-center">
      <Pagination showControls total={10} initialPage={1} />
      </div>
    </>
  );
}
