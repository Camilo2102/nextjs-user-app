import { DeleteIcon } from "@/app/icons/crud/DeleteIcon";
import { CrudModule } from "@/@types/types";
import { Tooltip } from "@nextui-org/react";
import { ActionModal } from "./ActionModal";
import simpleCRUDService from "@/app/services/simpleCRUDService";
import useNotification from "@/app/hooks/useNotification";
import { useTableContext } from "../../context/tableContext";


export default function CrudActions(rowData: CrudModule.RowData) {
    const { remove } = simpleCRUDService();

    const { showErrorAlert, showSuccessAlert } = useNotification();

    const { reloadTable } = useTableContext();

    const handleDelete = async () => {
        console.log("aca");
        
        remove(rowData.data.id).then(() => {
            showSuccessAlert("Registro eliminado correctamente");
        }).catch((error) => {
            showErrorAlert(error.message);
        }).finally(() => {
            reloadTable();
        });
    }

    return (
        <div className="flex items-center gap-4 ">
            {rowData.editable && <div>
                <ActionModal title={rowData.data.name} columns={rowData.columns} type="update" info={rowData.data} />
            </div>}
            {rowData.deleteable && <div>
                <Tooltip
                    content="Eliminar"
                    color="danger"
                >
                    <button onClick={handleDelete}>
                        <DeleteIcon size={20} fill="#FF0080" />
                    </button>
                </Tooltip>
            </div>}
        </div>
    );
}