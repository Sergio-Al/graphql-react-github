import React, { useEffect, useState, useCallback } from "react";
import Form from "./components/Form/Form";
import Organization from "./components/Organization/Organization";
import { Container, Box, Divider, Typography } from "@mui/material";

import { APIGithubGraphQL } from "./api";
import { GET_ISSUES_OF_REPOSITORY_DYNAMIC } from "./api/requests";

function App() {
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState([]);
  const [endCursor, setCursor] = useState(null);
  const [path, setPath] = useState("facebook/react");
  const TITLE: string = "React GraphQL Github Client";

  const getIssuesOfRespository = (path: string, cursor: string | null) => {
    const [organization, repository] = path.split("/");

    return APIGithubGraphQL.post("", {
      // query: getIssuesOfRepositoryQuery(organization, repository),
      query: GET_ISSUES_OF_REPOSITORY_DYNAMIC,
      variables: { organization, repository, ...(cursor && { cursor }) },
    });
  };

  const onFetchFromGithub = useCallback(
    (path: string, cursor: string | null = null) => {
      getIssuesOfRespository(path, cursor).then((response) => {
        setOrganization(response.data.data.organization);
        setCursor(
          response.data.data.organization.repository.issues.pageInfo.endCursor
        );
        setErrors(response.data.errors);
      });
    },
    []
  );

  const onFetchMoreIssues = () => {
    console.log("getting more soon...");
    onFetchFromGithub(path, endCursor);
  };

  useEffect(() => {
    onFetchFromGithub("facebook/react", null);
  }, [onFetchFromGithub]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFetchFromGithub(path, "");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        "&>*": {
          my: 3,
        },
      }}
    >
      <Box textAlign="center">
        <h1>{TITLE}</h1>
      </Box>
      <Divider />
      <Box>
        <Form path={path} setPath={setPath} handleSubmit={handleFormSubmit} />
      </Box>
      <Divider />
      {organization ? (
        <Organization
          organization={organization}
          errors={errors}
          fetchMoreIssues={onFetchMoreIssues}
        />
      ) : (
        <Typography variant="overline" display="block" gutterBottom>
          Results coming soon
        </Typography>
      )}
    </Container>
  );
}

export default App;
