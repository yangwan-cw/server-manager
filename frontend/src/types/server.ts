export interface Server {
  id: string;
  customer: string;
  imageName: string;
  version: string;
  serverAddress: string;
  responsible: string;
  status?: 'running' | 'stopped' | 'error' | 'unknown';
}
