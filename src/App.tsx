import React, { useEffect, useState, useCallback } from "react";
import Form from "./components/Form/Form";
import Organization from "./components/Organization/Organization";
import { Container, Box, Divider, Typography } from "@mui/material";

import { APIGithubGraphQL } from "./api";
import {
  GET_ISSUES_OF_REPOSITORY_DYNAMIC,
  ADD_STAR,
  REMOVE_STAR,
} from "./api/requests";
import { organizationDefault } from "./utils/defaults";

function App() {
  const [organization, setOrganization] = useState(organizationDefault);
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

  function modifyStarred(repositoryId: string, isStarred: boolean) {
    APIGithubGraphQL.post("", {
      query: isStarred ? REMOVE_STAR : ADD_STAR,
      variables: { repositoryId },
    }).then((response) => {
      const { totalCount } = organization.repository.stargazers;
      const newViewerStarredValue: boolean = isStarred
        ? response.data.data.removeStar.starrable.viewerHasStarred
        : response.data.data.addStar.starrable.viewerHasStarred;
      setOrganization({
        ...organization,
        repository: {
          ...organization.repository,
          viewerHasStarred: newViewerStarredValue,
          stargazers: {
            totalCount: newViewerStarredValue ? totalCount + 1 : totalCount - 1,
          },
        },
      });
    });
  }

  const onFetchFromGithub = useCallback(
    (path: string, cursor: string | null = null) => {
      getIssuesOfRespository(path, cursor).then((response) => {
        // Getting data... console.log(response.data.data.organization);
        setOrganization(response.data.data.organization);
        if (response.data.data.organization.repository !== null) {
          setCursor(
            response.data.data.organization.repository.issues.pageInfo.endCursor
          );
        }

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

  const onStarRepository = (id: string, starred: boolean) => {
    // your id and starred state
    // console.log(
    //   `This is your id ${id} and your have ${
    //     starred ? "starred!" : "not Starred yet"
    //   }`
    // );
    modifyStarred(id, starred);
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
          onStarRepository={onStarRepository}
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
