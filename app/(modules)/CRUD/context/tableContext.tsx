'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type TableContextType = {
    reload: boolean;
    reloadTable: () => void;
};

const TableContext = createContext<TableContextType>({} as TableContextType);

export function useTableContext() {
    return useContext(TableContext);
}

export function TableProvider({ children }: { children: ReactNode }) {
    const [reload, setReload] = useState(false);


    const reloadTable = () => {
        setReload(!reload);
    }
    
    return (
        <TableContext.Provider value={{ reload, reloadTable }}>
            {children}
        </TableContext.Provider>
    );
}