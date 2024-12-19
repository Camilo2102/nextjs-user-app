import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { ECommerceModule } from "../../../../../../@types/types";

export default function ECommerceItem2({item}: {item: ECommerceModule.Item}) {

    return <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{item.title}</p>
            <small className="text-default-500">{item.price}</small>
        </CardHeader>
        <CardBody className="overflow-visible">
            <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.img}
                width={290}
            />
        </CardBody>
    </Card>
}
