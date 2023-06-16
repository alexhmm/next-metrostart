export enum CollectionMenuAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Sort = 'SORT',
  Update = 'UPDATE',
}

export interface Collection {
  id: string;
  description?: string;
  name: string;
  links: Link[];
}

export interface CollectionPostPatchRequest {
  description?: string;
  name: string;
}

export interface Link {
  id: string;
  icon: string | undefined;
  name: string;
  url: string;
}

export interface LinkItemPostPatchRequest {
  name: string;
  url: string;
}

export type CollectionWithoutLinks = Omit<Collection, 'links'>;
