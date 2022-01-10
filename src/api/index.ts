import axios from "axios";

export const APIGithubGraphQL = axios.create({
  baseURL: "https:api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN_GITHUB}`,
  },
});