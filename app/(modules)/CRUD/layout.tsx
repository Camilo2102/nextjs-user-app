import { TableProvider } from "./context/tableContext";

export default function CRUDLayout({ children }: { children: React.ReactNode }) {
    return (
        <TableProvider>
            {children}
        </TableProvider>
    )
}