import { useEffect } from "react";
import { useImagesS3UrlContext } from "../context/ImagesContext";
import { Card, CardBody, Badge } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

export default function ImagesPreview({path, staticUrls}: {path: string, staticUrls?: string[]}) {
    const { urls, setUrls } = useImagesS3UrlContext();
    
    const handleDelete = (urlToDelete: string) => {
        if (!staticUrls) {
            setUrls(urls.filter((url) => url !== urlToDelete));
        } else {
            console.warn("Cannot delete static URLs");
        }
    };
    
    const imagesToDisplay = staticUrls?.length ? staticUrls : urls.filter((url) => url.includes(path));
    
    return (
        <div className="grid grid-cols-2 gap-4">
            {imagesToDisplay.map((url) => (
                <Badge key={uuidv4()} content={'X'} size="lg" color="danger" className="cursor-pointer" onClick={() => handleDelete(url)}>
                    <Card className="w-full">
                        <CardBody className="p-0">
                            <img src={url} alt={`Image`} className="w-full h-auto object-cover" />
                        </CardBody>
                    </Card>
                </Badge>
            ))}
        </div>
    );
}