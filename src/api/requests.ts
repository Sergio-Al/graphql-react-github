export const GET_ORGANIZATION = `
 {
     organization(login: "the-road-to-learn-react") {
         name
         url
     }
 }`;

export const GET_REPOSITORY_OF_ORGANIZATION = `{
    organization(login: "the-road-to-learn-react") {
        name
        url
        repository(name: "the-road-to-learn-react") {
            name
            url
        }
    }
}`;

export const GET_ISSUES_OF_REPOSITORY = `{
    organization(login: "the-road-to-learn-react") {
        name
        url
        repository(name: "the-road-to-learn-react") {
            name
            url
            issues(last: 5) {
                edges {
                    node {
                        id
                        title
                        url
                    }
                }
            }
        }
    }
}`;

// first way of making it dynamic
export const getIssuesOfRepositoryQuery = (
  organization: string,
  repository: string
) => `{
    organization(login: "${organization}") {
        name
        url
        repository(name: "${repository}") {
            name
            url
            issues(last: 5) {
                edges{
                    node {
                        id
                        title
                        url
                    }
                }
            }
        }
    }
}`;

// second way (this is suggested!)
export const GET_ISSUES_OF_REPOSITORY_DYNAMIC = `
query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(first: 5, after: $cursor, states: OPEN) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              url
              reactions(first: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
                totalCount
              }
              updatedAt
            }
          }
          totalCount
        }
      }
    }
  }`;
