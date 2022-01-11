import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import Repository from "../Repository/Repository";

type OrganizationProps = {
  organization: { url?: string; name?: string; repository: any };
  errors?: Array<any>;
  fetchMoreIssues: React.MouseEventHandler;
};

export default function Organization({
  organization,
  errors = [],
  fetchMoreIssues,
}: OrganizationProps) {
  if (errors.length > 0) {
    console.log("this is an error", errors);
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Typography variant="h5" color="secondary">
          Something went wrong
        </Typography>
        {errors
          .map((error: { message?: string }) => {
            if (error.message) return error.message;
            return "";
          })
          .join()}
      </Box>
    );
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Organization
        </Typography>
        <Typography variant="h5" component="div">
          Issues from Organization
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Link underline="none" href={organization.url} target="_blank">
            {organization.name}
          </Link>
        </Typography>
        <Typography variant="body1">Repository</Typography>
        <Repository
          fetchMoreIssues={fetchMoreIssues}
          repository={organization.repository}
        />
      </CardContent>
    </Card>
  );
}
