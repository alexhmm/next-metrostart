export interface Collection {
  id: string;
  description?: string;
  name: string;
  links: LinkItem[];
}

export interface LinkItem {
  id: string;
  icon: string | undefined;
  name: string;
  url: string;
}

export interface LinkItemPostPatchRequest {
  name: string;
  url: string;
}
