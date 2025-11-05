export interface Server {
  id: string;
  customer: string;
  imageName: string;
  version: string;
  serverAddress: string;
  responsible: string;
  category: 'development' | 'testing' | 'production' | 'staging';
  status?: 'running' | 'stopped' | 'error' | 'unknown';
}
