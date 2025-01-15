import { createApiGatewayApiInstance } from "@/app/lib/serverCalls";
import { useParams } from "next/navigation";
import { useUserConfig } from "../context/UserConfigContext";

export default function useSimpleCRUDService(pageEndpoint?: string) {
  const { name } = useParams();
  const { endpoint } = useUserConfig();
  
  // Create an Axios instance using the endpoint
  const apiInstance = createApiGatewayApiInstance(endpoint as string + "api/v2/");
  
  // Determine the query endpoint based on the pageEndpoint or the resource name
  const queryEndpoint = pageEndpoint || (name as string).charAt(0).toLowerCase() + (name as string).slice(1);

  // Get all data from the API
  const getAll = async () => {
    try {
      const response = await apiInstance.get(queryEndpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  };

  // Get data by ID from the API
  const getById = async (id: string) => {
    try {
      const response = await apiInstance.get(`${queryEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      throw error;
    }
  };

  // Create new data using POST method
  const create = async (data: any) => {
    try {
      const response = await apiInstance.post(queryEndpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  };

  // Update data using PUT method
  const update = async (data: any) => {
    try {
      const { createdAt, updatedAt, ...rest } = data;
      const response = await apiInstance.put(queryEndpoint, rest);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  // Remove data using DELETE method
  const remove = async (id: string) => {
    try {
      const response = await apiInstance.delete(`${queryEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error removing data:", error);
      throw error;
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove
  };
}
