"use client"
import { CrudModule } from "@/@types/types";
import useNotification from "@/app/hooks/useNotification";
import simpleCRUDService from "@/app/services/simpleCRUDService";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useTableContext } from "../../context/tableContext";
import { EditIcon } from "@/app/icons/crud/EditIcon";
import SingleUploadComponent from "@/app/components/SingleUploadComponent";

export const ActionModal = ({ title, columns, type = 'create', info }: { title: string, columns: CrudModule.Column[], type: 'create' | 'update', info?: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState<any>(info ?? {})

  const { showErrorAlert, showSuccessAlert } = useNotification();

  const { create, update } = simpleCRUDService()

  const { reloadTable } = useTableContext();

  const createInputs = () => {
    return columns.map(column => {
      if (column.type === 'actions') return;
      if(column.type === 'image') return <SingleUploadComponent key={column.uid}  path={column.name} onUpload={(url) => setData({ ...data, [column.name]: url})}/>
      return <Input type={column.type} key={column.name} label={column.name} value={data[column.name]} onChange={(e) => setData({ ...data, [column.name]: e.target.value })} />
    }
    )
  }
  const handleAction = (close: () => void) => {
    if (type === 'create') {
      handleCreate(close)
    } else {
      handleUpdate(close)
    }
  }

  const handleCreate = (close: () => void) => {
    create(data).then(data => {
      close();
      showSuccessAlert("Registro creado correctamente");
    }).catch(error => showErrorAlert(error.message))
       .finally(() => {
        reloadTable();
      });
  }

  const handleUpdate = (close: () => void) => {
    update(data).then(data => {
      close()
      showSuccessAlert("Registro actualizado correctamente");
    }).catch(error => showErrorAlert(error.message)).finally(() => {
      reloadTable();
    });
  }

  const button = type === 'create' ?
    <Button onPress={onOpen} color="primary">
      Agregar {title}
    </Button>
    :
    <Tooltip content="Editar" color="secondary">
      <button onClick={onOpen}>
        <EditIcon size={20} fill="#979797" />
      </button>
    </Tooltip>

  return (
    <div>
      <>
        {button}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {type === 'create' ? 'Agregar' : 'Editar'} {title}
                </ModalHeader>
                <ModalBody>
                  {createInputs()}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={() => handleAction(onClose)}>
                    {type === 'create' ? 'Agregar' : 'Editar'}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};