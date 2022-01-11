export interface INode {
  id: string;
}

export interface INodeEdgesReactions extends INode {
  content: string;
}

export interface INodeEdgesIssues extends INode {
  reactions: Reactions;
  title: string;
  updatedAt: string;
  url: string;
}

export type NodeEdgesReactions = {
  node: INodeEdgesReactions;
};

export type Reactions = {
  edges: Array<NodeEdgesReactions>;
  totalCount: number;
};

export type NodeEdgesIssues = {
  node: INodeEdgesIssues;
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type Issues = {
  edges: Array<NodeEdgesIssues>;
  pageInfo: PageInfo;
  totalCount: number;
};

export type StarGazers = {
  totalCount: number;
};

export type RepositoryType = {
  id: string;
  issues: Issues;
  stargazers: StarGazers;
  name: string;
  url: string;
  viewerHasStarred: boolean;
};

export type OrganizationType = {
  name: string;
  repository: RepositoryType;
  url: string;
};
