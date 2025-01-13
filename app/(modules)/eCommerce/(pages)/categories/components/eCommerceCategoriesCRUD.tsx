import { CrudModule } from "@/@types/types";
import CrudComponent from "@/app/(modules)/CRUD/components/components/CrudComponent";


export default function EccomerceCategoriesCrudPage() {
    const crudProp: CrudModule.Props = {
        addable: true,
        deleteable: true,
        detaileable: true,
        editable: true,
        element: "Categorias",
        title: "Categorias",
        exportable: false,
        tableProps: {
            columns: [
                { name: "nombre", uid: "name", type: 'string' },
                { name: "descripcion", uid: "description", type: 'string' },
                { name: 'ACTIONS', uid: 'actions', type: 'actions' }
            ],
            values: []
        }
    }


    return <CrudComponent crudProps={crudProp} />
}