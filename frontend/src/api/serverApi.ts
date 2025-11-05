import apiClient from './axios';
import { Server } from '../types/server';

export const serverApi = {
  getServers: async (): Promise<Server[]> => {
    const response = await apiClient.get<Server[]>('/servers');
    return response.data;
  },

  getServerById: async (id: string): Promise<Server> => {
    const response = await apiClient.get<Server>(`/servers/${id}`);
    return response.data;
  },

  getServerStatus: async (id: string): Promise<string> => {
    const response = await apiClient.get<{ status: string }>(`/servers/${id}/status`);
    return response.data.status;
  },
};
