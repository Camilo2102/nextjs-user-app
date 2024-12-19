'use client'

import { ECommerceModule } from "@/@types/types";
import CategoriesFullView from "./categoriesFullView";
import { useUserConfig } from "@/app/context/UserConfigContext";

export default function EcommerceCategoriesPage() {

  const { getModuleProps } = useUserConfig();

  const categoriesProps = getModuleProps('Categories', 'index') as unknown as ECommerceModule.CategoriesProps;

  return (
    <>
      <CategoriesFullView itemsPerRow={categoriesProps?.itemsPerRow} cardType={categoriesProps?.cardType} />
    </>
  );
}
