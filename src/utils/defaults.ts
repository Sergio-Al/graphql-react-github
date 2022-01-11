import { OrganizationType } from "./types";

export const organizationDefault: OrganizationType = {
  name: "",
  repository: {
    id: "",
    issues: {
      edges: [
        {
          node: {
            id: "",
            reactions: {
              edges: [
                {
                  node: {
                    id: "",
                    content: "",
                  },
                },
              ],
              totalCount: 0,
            },
            title: "",
            updatedAt: "",
            url: "",
          },
        },
      ],
      pageInfo: {
        endCursor: "",
        hasNextPage: false,
      },
      totalCount: 0,
    },
    stargazers: {
      totalCount: 0,
    },
    name: "",
    url: "",
    viewerHasStarred: false,
  },
  url: "",
};
