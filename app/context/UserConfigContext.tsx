import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserConfig } from '@/@types/userConfig';
import { CrudModule } from '@/@types/types';

import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

type UserConfigContextType = {
    userConfig: UserConfig.Config | null;
    endpoint: string | null;
    isAValidPage: (moduleName: string, pageName: string) => boolean;
    getModuleProps: (moduleName: string, pageName: string) => CrudModule.Props | null;
    hasPermission: (moduleName: string, pageName: string) => boolean;
    getGlobalProps: () => UserConfig.GlobalProps | null;
};

const UserConfigContext = createContext<UserConfigContextType>({} as UserConfigContextType);

export function useUserConfig() {
    return useContext(UserConfigContext);
}


export function UserConfigProvider({ children }: { children: ReactNode }) {
    const [userConfig, setUserConfig] = useState<UserConfig.Config | null>(null);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [endpoint, setEndpoint] = useState<string | null>(null);
    const { getValue } = useLocalStorage();


    const router = useRouter();

    const loadUserConfig = async () => {
        try {
            setIsLoading1(true);
            const response = await fetch('/api/user-config');
            if (!response.ok) {
                throw new Error('Failed to load user config');
            }
            const config = await response.json();
            
            localStorage.setItem("creationConfig", JSON.stringify({
                userId: config.id,
                projectName: config.projectName
            }))

            setUserConfig(config);
            setIsLoading1(false);
        } catch (error) {
            console.error('Error loading user config:', error);
        }
    };

    const loadEndpoint = async () => {
        setIsLoading2(true);
        
        const delayMs = 50000;
        
        while (true) {
            const creationConfig = localStorage.getItem("creationConfig");
            try {
                const res = await fetch("https://neoepxiis2bkwoloyrrpq4dejm0idycr.lambda-url.us-east-2.on.aws", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',  // Specify JSON content type
                    },
                    body: creationConfig,  // Ensure you're sending JSON as the body
                });
    
                // If the response status is 400, retry
                if (res.status === 400 || res.status === 404) {
                    console.log('Request failed with status 400, retrying...');
                    await new Promise(resolve => setTimeout(resolve, delayMs)); // Retry after delay
                    continue; // Retry the request
                }
    

                const result = await res.json();
                setEndpoint(result.apiEndpointUrl);
                setIsLoading2(false);
                break;
    
            } catch (error) {
                await new Promise(resolve => setTimeout(resolve, delayMs)); 
            }
        }
    };
    
    useEffect(() => {
        loadUserConfig();
        loadEndpoint();
    }, []);
    

    const isAValidPage = (moduleName: string, pageName: string) => {
        return userConfig?.modules.find(module => module.name.toLowerCase() === moduleName.toLowerCase())?.pages.find(page => page.name.toLowerCase() === pageName.toLowerCase()) !== undefined;
    };

    const getModuleProps = (moduleName: string, pageName: string) => {
        // eslint-disable-next-line
        const module = userConfig?.modules.find(module => module.name.toLowerCase() === moduleName.toLowerCase());

        if(!module) return;

        const page = module?.pages.find(page => page.name.toLowerCase() === pageName.toLowerCase());

        if(!page?.props) {
            router.push('/not-found');
            return;
        };
        
        return page?.props;
    };

    const getGlobalProps = () => {
        return userConfig?.globalProps ?? null;
    };

    const hasPermission = (moduleName: string, pageName: string) => {
        const role = getValue('role');

        if(!role) return false;

        // eslint-disable-next-line
        const module = userConfig?.modules.find(module => module.name.toLowerCase() === moduleName.toLowerCase());

        if(!module) return false;

        const page = module?.pages.find(page => page.name.toLowerCase() === pageName.toLowerCase());

        return page?.permissions.includes(role) ?? false;
    };

    return (
        <div>
            {isLoading2 ? (
                <div>Initializing App...</div>
            ) : isLoading1 ? (
                <div>Loading...</div>
            ) : (
                <UserConfigContext.Provider value={{ userConfig, endpoint, isAValidPage, getModuleProps, hasPermission, getGlobalProps }}>
                    {children}
                </UserConfigContext.Provider>
            )}
        </div>
    );
    
}