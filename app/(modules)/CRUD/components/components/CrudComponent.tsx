"use client"
import { Button, Input } from "@nextui-org/react";
import { CrudTable } from "../components/CrudTable";
import { CrudModule } from "@/@types/types";
import { ActionModal } from "./ActionModal";


export default function CrudComponent( {crudProps}: {crudProps: CrudModule.Props}){  
    return (
        <section className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
          <h3 className="text-xl font-semibold">{crudProps.title}</h3>
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
              <Input
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder={`Buscar ${crudProps.element}`}
              />
  
            </div>
            <div className="flex flex-row gap-3.5 flex-wrap">
              {crudProps.addable && <ActionModal title={crudProps.element} columns={crudProps.tableProps.columns} type="create" />}
              {crudProps.exportable && <Button color="primary" >
                Exportar como CSV
              </Button>}
            </div>
          </div>
          <div className="max-w-[95rem] mx-auto w-full">
            <CrudTable tableProps={crudProps.tableProps} detaileable={crudProps.detaileable} deleteable={crudProps.deleteable} editable={crudProps.editable}/>
          </div>
        </section>
      );
}