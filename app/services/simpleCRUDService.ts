
import { createApiInstance } from "@/app/lib/serverCalls";
import { useParams } from "next/navigation";


const apiInstance = createApiInstance({ baseURL: "http://localhost:9001/api/v2/", headers: { 'Content-Type': 'application/json' } });

export default function useSimpleCRUDService(pageEndpoint?: string){
    const { name } = useParams();
    
    const endpoint = pageEndpoint || (name as string).charAt(0).toLowerCase() + (name as string).slice(1);

    const getAll = async () => {
        return apiInstance(endpoint)
    }

    const getById = async (id: string) => {
        return apiInstance(`${endpoint}/${id}`)
    }

    const create = async (data: any) => {
        return apiInstance(endpoint, { method: 'POST', body: data })
    }

    const update = async (data: any) => {
        const {createdAt, updatedAt, ...rest} = data;
        return apiInstance(`${endpoint}`, { method: 'PUT', body: rest })
    }

    const remove = async (id: string) => {
        return apiInstance(`${endpoint}/${id}`, { method: 'DELETE' })
    }
    
    return {
        getAll,
        getById,
        create,
        update,
        remove
    }
}
