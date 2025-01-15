"use client";

import { CrudModule } from "@/@types/types";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import CrudActions from "./CrudActions";
import simpleCRUDService from "@/app/services/simpleCRUDService";
import useNotification from "@/app/hooks/useNotification";
import { useEffect, useState } from "react";
import { useTableContext } from "../../context/tableContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export const CrudTable = (tableConfig: CrudModule.TableConfig,) => {
  const { showErrorAlert } = useNotification();
  const { getAll } = simpleCRUDService()

  const { reload } = useTableContext();

  const [data, setData] = useState<any>([])

  const getData = () => {
    getAll().then(data => {
      setData(data)
    }).catch(error => showErrorAlert(error.message))
  }

  useEffect(() => {
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
          {data.length && data.map((value: any) => (
            <TableRow key={JSON.stringify(value)}>
            {(columnKey) => {
              let content;
          
              if (columnKey === 'actions') {
                content = (
                  <CrudActions data={value} columns={tableConfig.tableProps.columns} detaileable={tableConfig.detaileable} deleteable={tableConfig.deleteable} editable={tableConfig.editable}></CrudActions>
                );
              } else if (columnKey === 'image') {
                content = (
                  <Image
                    src={value[columnKey]}
                    alt="Shopping Item Preview"
                    width={290}
                    height={190}
                  />
                );
              } else {
                content = value[columnKey];
              }
          
              return <TableCell>{content}</TableCell>;
            }}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};