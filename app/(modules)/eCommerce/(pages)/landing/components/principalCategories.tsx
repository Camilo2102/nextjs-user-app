import { Card, CardHeader, Image } from "@nextui-org/react";

import { v4 as uuidv4 } from "uuid";

export default function PrincipalCategories() {
  const baseCategories = [
    {
      title: "Categoria 1",
      description: "Contribute to the planet",
    },
    {
      title: "Categoria 2",
      description: "Contribute to the planet",
    },
    {
      title: "Categoria 3",
      description: "Contribute to the planet",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 p-6 mt-9 bg-gray-50">
      <div className="col-span-12 mb-4 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Categorias</h3>
        <p className="text-gray-600">Explore nuestras principales categorias</p>
      </div>
      {baseCategories.map((categorie) => (
        <Card
          key={uuidv4()}
          className="col-span-12 sm:col-span-6 lg:col-span-4 h-[300px] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start p-4 bg-gradient-to-b from-black/60 to-transparent">
            <p className="text-sm text-white/70 uppercase font-semibold">
              {categorie.title}
            </p>
            <h4 className="text-white text-xl font-bold">
              {categorie.description}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-3.jpeg"
          />
        </Card>
      ))}
    </div>
  );
}
