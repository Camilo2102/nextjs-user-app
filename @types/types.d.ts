export namespace CrudModule {
    type Column = {
        uid: string;
        name: string;
        type: string;
    }

    type TableProps = {
        columns: Column[],
        values: any[]
    }
    
    type Props = ConfigStatus & {
        title: string;
        element: string;
    }

    type TableConfig = RowConfig & {
        tableProps: TableProps;
    }

    type RowData = RowConfig & {
        data: any
        columns: Column[]
    }

    type ConfigStatus = RowConfig & {
        addable?: boolean;
        exportable?: boolean;
        tableProps: TableProps;
    }

    type RowConfig = {
        editable?: boolean;
        deleteable?: boolean;
        detaileable?: boolean;
    }

    type CrudProps = {
        modificable: boolean;
        title: string;
        element: string;
        addable: boolean,
        editable: boolean,
        deleteable: boolean,
        exportable: boolean,
        detaileable: boolean,
        columns: Column[],
        disableAddFields: boolean,
        fieldsDisabled: boolean,
    }
}

export namespace ECommerceModule {
    type LandingProps = {
        animation: 'cubeAnimation' | 'fallAnimation' | 'foldOutAnimation' | 'openAnimation' | 'scaleOutAnimation';
        interval: number;
        isStatic: boolean;
        enabled: boolean;
        categories: any;
    }

    type CategoriesProps = {
        itemsPerRow: number;
        cardType: number;
    }

    type Item = {
        title: string;
        img: string;
        price: string;
    }
}
