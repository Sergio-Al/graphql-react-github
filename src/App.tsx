import React, { useEffect, useState } from "react";
import Form from "./components/Form/Form";
import Organization from "./components/Organization/Organization";
import { Container, Box, Divider, Typography } from "@mui/material";

import { APIGithubGraphQL } from "./api";
import { GET_ISSUES_OF_REPOSITORY} from "./api/requests";

function App() {
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState([]);
  const TITLE: string = "React GraphQL Github Client";

  const onFetchFromGithub = () => {
    APIGithubGraphQL.post("", { query: GET_ISSUES_OF_REPOSITORY}).then((response) => {
      setOrganization(response.data.data.organization);
      setErrors(response.data.errors);
    });
  };

  useEffect(() => {
    onFetchFromGithub();
  }, []);

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
        <Form />
      </Box>
      <Divider />
      {organization ? (
        <Organization organization={organization} errors={errors} />
      ) : (
        <Typography variant="overline" display="block" gutterBottom>
          Results coming soon
        </Typography>
      )}
    </Container>
  );
}

export default App;
