import simpleCRUDService from "@/app/services/simpleCRUDService";
import { Accordion, AccordionItem, Divider, Spacer } from "@nextui-org/react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesAccordion() {

  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  ///const { getAll } = simpleCRUDService('categoriasEcommerce');

  const [categories, setCategories] = useState<any>([{
    nombre: 'Categoria 1',
  },
  {
    nombre: 'Categoria 2',
  },
  {
    nombre: 'Categoria 3',
  }]);

  // useEffect(() => {
  //   getAll().then((res) => {
  //     setCategories(res);
  //   });
  // }, []);

  const router = useRouter();
  const pathname = usePathname();


  const handleCategoryClick = (categoryId: string) => {
    router.push(`${pathname}?category=${categoryId}`);
  }

  return (
    <>
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Categorias">
          <ul>
            {categories.map((category: any) => (
              <>
                <li key={category.nombre} onClick={() => handleCategoryClick(category.nombre)} className="cursor-pointer my-3">
                  {category.nombre}
                </li>
                <Divider />
              </>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </>
  );
}
