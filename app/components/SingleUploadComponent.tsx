'use client'

import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import useLocalStorage from "../hooks/useLocalStorage";
import { Button, Input } from "@nextui-org/react";
import ImagesPreview from "./ImagesPreview";

type SingleUploadComponentProps = {
    path: string;
}

export default function SingleUploadComponent({ path, onUpload }: SingleUploadComponentProps & { onUpload?: (url: string) => void }) {
    const { uploadToS3 } = useS3Upload();
    const { getValue } = useLocalStorage();
    const [isUploading, setIsUploading] = useState(false);
    const [staticUrls, setStaticUrls] = useState<string[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const file = e.target.files[0];

        try {
            let { url } = await uploadToS3(file, {
                endpoint: {
                    request: {
                        url: `/api/s3-upload/?folder=users/${getValue("userId")}/${path}`
                    }
                }
            });
            setStaticUrls([url]);
            onUpload && onUpload(url); // Send the URL to the parent component
        } catch (error) {
            console.error("Error uploading file:", error);
        }

        setIsUploading(false);
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-upload-${path}`}
                />
                <Button
                    as="label"
                    htmlFor={`file-upload-${path}`}
                    color="primary"
                    isLoading={isUploading}
                >
                    {isUploading ? "Cargando..." : "Cargar Imagen"}
                </Button>
            </div>

            <div className="mt-4">
                <ImagesPreview path={path} staticUrls={staticUrls} />
            </div>
        </>
    );
}