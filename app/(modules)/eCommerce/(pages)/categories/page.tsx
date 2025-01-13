import { use, useEffect, useState } from "react";
import EcommerceCategoriesPage from "./components/eCommerceCategoriesPage";
import useLocalStorage from "@/app/hooks/useLocalStorage";

export default function CategoriesPage() {
    return <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-4 min-h-[calc(100vh_-36px)] p-9 mx-7">
            <EcommerceCategoriesPage />
        </div>
    </div>
}
