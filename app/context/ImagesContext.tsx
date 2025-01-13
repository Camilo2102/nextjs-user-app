"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState} from "react";

type ImagesS3UrlContextType = {
    urls: string[];
    setUrls: Dispatch<SetStateAction<string[]>>
}

const ImagesS3UrlContext = createContext<ImagesS3UrlContextType>({} as ImagesS3UrlContextType);

export function useImagesS3UrlContext() {
    return useContext(ImagesS3UrlContext);
}

export function ImagesS3UrlProvider({children }: {children: React.ReactNode}) {
    const [urls, setUrls] = useState<string[]>([]);
    
    return(
        <ImagesS3UrlContext.Provider value={{urls, setUrls}}>
            {children}
        </ImagesS3UrlContext.Provider>
    )
}