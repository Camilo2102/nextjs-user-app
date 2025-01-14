import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserConfig } from '@/@types/userConfig';
import { CrudModule } from '@/@types/types';

import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

type UserConfigContextType = {
    userConfig: UserConfig.Config | null;
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
    const [isLoading, setIsLoading] = useState(true);
    const { getValue } = useLocalStorage();


    const router = useRouter();

    const loadUserConfig = async () => {
        try {
            const response = await fetch('/api/user-config');
            if (!response.ok) {
                throw new Error('Failed to load user config');
            }
            const config = await response.json();
            setUserConfig(config);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading user config:', error);
        }
    };

    useEffect(() => {
        loadUserConfig();
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
        <UserConfigContext.Provider value={{ userConfig, isAValidPage, getModuleProps, hasPermission, getGlobalProps }}>
            {isLoading ? <div>Loading...</div> : children}
        </UserConfigContext.Provider>
    );
}