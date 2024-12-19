import { Card, CardBody, Image } from "@nextui-org/react";

export default function ItemPreviewPage({ isLeft = true }: { isLeft: boolean }) {
    return (
        <div className="flex justify-center items-center w-full h-auto">
            <Card shadow="sm" style={{ maxWidth: '75%' }}>
                <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                        {isLeft && (
                            <div>
                                <Image
                                    src="https://nextui.org/images/hero-card-complete.jpeg"
                                    alt="Shopping Item Preview"
                                    width={290}
                                    height={190}
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Producto</h3>
                            <p className="text-sm text-gray-600">Descripcion del producto</p>

                            <div className="flex flex-col  mt-4">
                                <div className="block mb-2">
                                    <p className="text-sm text-gray-600">Precio: $100</p>
                                    <p className="text-sm text-gray-600">Cantidad: 1</p>
                                    <p className="text-sm text-gray-600">Total: $100</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Comprar</button>
                            </div>
                        </div>
                        {!isLeft && (
                            <div>
                                <Image
                                    src="https://nextui.org/images/hero-card-complete.jpeg"
                                    alt="Shopping Item Preview"
                                    width={290}
                                    height={190}
                                />
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}