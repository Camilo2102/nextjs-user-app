import { Pagination, Spacer } from "@nextui-org/react";
import ShoppingItemSkeleton from "./shoppingItemSkeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import simpleCRUDService from "@/app/services/simpleCRUDService";
import ECommerceItem1 from "./eCommerceItem1";
import ECommerceItem2 from "./eCommerceItem2";

export default function ShoppingItems({
  itemsPerRow,
  cardType
}: {
  itemsPerRow: number;
  cardType: number;
}) {
  
  const gridClasses = `grid gap-4 ${
    itemsPerRow === 2
      ? "grid-cols-2"
      : itemsPerRow === 3
      ? "grid-cols-3"
      : `grid-cols-${itemsPerRow}`
  }`;


  const { get } = useSearchParams();
  const { getAll } = simpleCRUDService('itemsEcommerce');

  const [items, setItems] = useState<any>([]);

  const category = get('category');

  useEffect(() => {
    getAll().then((res) => {
      const filteredItems = res.filter((item: any) => item.categoria === category);
      setItems(filteredItems);  
    });
    // eslint-disable-next-line
  }, [category]);

  const CardType = cardType === 1 ? ECommerceItem1 : ECommerceItem2;

  return (
    <>
      <div className={gridClasses}>
        {items.map((item: any) => (
          <CardType key={item.id} item={item} />
        ))}
      </div>
      <Spacer y={8}></Spacer>
      <div className="flex justify-center">
      <Pagination showControls total={10} initialPage={1} />
      </div>
    </>
  );
}
