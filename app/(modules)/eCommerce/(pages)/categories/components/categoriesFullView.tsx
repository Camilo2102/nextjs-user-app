import CategoriesAccordion from "./categoriesAccordion";
import ShoppingItems from "./shoppingItems";

export default function CategoriesFullView({itemsPerRow = 4, cardType = 1}: {itemsPerRow: number, cardType: number}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3">
        <CategoriesAccordion />
      </div>
      <div className="col-span-12 md:col-span-9">
        <ShoppingItems itemsPerRow={itemsPerRow} cardType={cardType} />
      </div>
    </div>
  );
}
