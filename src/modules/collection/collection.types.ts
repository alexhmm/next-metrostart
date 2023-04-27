export interface LinkItem {
  id: string;
  favicon: string;
  name: string;
  url: string;
}

export interface LinkItemPostPatchRequest {
  name?: string;
  url?: string;
}
