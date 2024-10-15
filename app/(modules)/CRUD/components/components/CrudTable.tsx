"use client";

import { CrudModule } from "@/@types/types";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import CrudActions from "./CrudActions";
import simpleCRUDService from "@/app/services/simpleCRUDService";
import useNotification from "@/app/hooks/useNotification";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import { useState } from "react";
import { useTableContext } from "../../context/tableContext";

export const CrudTable = (tableConfig: CrudModule.TableConfig,) => {

  const { showErrorAlert } = useNotification();

  const { getAll } = simpleCRUDService()
  
  const { reload } = useTableContext();

  const [data, setData] = useState<any>([])

  const getData = () => {
    getAll().then(data => setData(data)).catch(error => showErrorAlert(error.message))
  }

  useDidMountEffect(() => {
    getData();
  }, [reload])
  
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={tableConfig.tableProps.columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody >
          {data.map((value: any) => (
            <TableRow key={JSON.stringify(value)}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'actions' ? <CrudActions  data={value} columns={tableConfig.tableProps.columns} detaileable={tableConfig.detaileable} deleteable={tableConfig.deleteable} editable={tableConfig.editable}></CrudActions> : value[columnKey]}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};