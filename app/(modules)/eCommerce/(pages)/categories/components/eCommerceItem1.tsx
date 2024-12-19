import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ECommerceModule } from "../../../../../../@types/types";
export default function ECommerceItem1({item}: {item: ECommerceModule.Item}) {
  return <Card shadow="sm"  >
    <CardBody className="overflow-visible p-0">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        alt={item.title}
        
        className="w-full object-cover h-[190px]"
        src={item.img}
      />
    </CardBody>
    <CardFooter className="text-small justify-between">
      <b>{item.title}</b>
      <p className="text-default-500">{item.price}</p>
    </CardFooter>
  </Card>
}
