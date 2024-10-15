export namespace UserConfig {

    export interface Config {
        id: string;
        modules: Module[];
        globalProps: GlobalProps;
    }


    export interface Module {
        name: string;
        type: number;
        pages: Page[];
    }

    export interface Page {
        name: string;
        props: CrudProps | null;
        permissions: string[];
    }

    export interface GlobalProps {
        [key: string]: NavBarProps;
    }

    export interface NavBarProps {
        isStatic: boolean;
        brand: string;
        menuItems: MenuItem[];
    }

    export interface MenuItem {
        name: string;
        path: string;
    }
    
}