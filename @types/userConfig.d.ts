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
        navbar: NavBarProps;
    }

    export interface NavBarProps {
        isStatic: boolean;
        brand: string;
        items: MenuItem[];
    }

    export interface MenuItem {
        name: string;
        path: string;
        roles: string[];
    }
    
}