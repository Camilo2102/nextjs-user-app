import { Card, CardHeader, Image } from "@nextui-org/react";

import { v4 as uuidv4 } from "uuid";

export default function PrincipalCategories({categories}: {categories: any}) {
  return (
    <div className="grid grid-cols-12 gap-6 p-6 bg-gray-50">
      <div className="col-span-12 mb-4 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Categorias</h3>
        <p className="text-gray-600">Explore nuestras principales categorias</p>
      </div>
      {categories?.map((categorie:any ) => (
        <Card
          key={uuidv4()}
          className="col-span-12 sm:col-span-6 lg:col-span-4 h-[300px] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start p-4 bg-gradient-to-b from-black/60 to-transparent">
            <p className="text-sm text-white/70 uppercase font-semibold">
              {categorie.name}
            </p>
            <h4 className="text-white text-xl font-bold">
              {categorie.description}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={categorie.image}
          />
        </Card>
      ))}
    </div>
  );
}
