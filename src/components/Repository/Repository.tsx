import React from "react";
import {
  Typography,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Box,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { NearbyError } from "@mui/icons-material";

import { RepositoryType } from "../../utils/types";
import { ocurrencesReactions } from "../../utils/Ocurrences";

export default function Repository({
  repository,
  fetchMoreIssues,
  onStarRepository,
}: {
  repository: RepositoryType;
  fetchMoreIssues: React.MouseEventHandler;
  onStarRepository: (id: string, starred: boolean) => void;
}) {
  if (repository === null) {
    return <Typography variant="h6">That repo doesn't exists</Typography>;
  }

  return (
    <>
      <Typography mb={1} variant="body2">
        <Link href={repository.url} underline="none" target="_blank">
          {repository.name}
        </Link>
      </Typography>
      <Divider />
      <Box mt={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography mr={1} variant="body2">
              {repository.stargazers.totalCount}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStarRepository(repository.id, repository.viewerHasStarred);
              }}
              variant={repository.viewerHasStarred ? "outlined" : "contained"}
            >
              {repository.viewerHasStarred ? "unstar" : "star"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography mt={1} variant="body1">
        Issues
      </Typography>
      {repository.issues.edges.length > 0 ? (
        <>
          <List>
            {repository.issues.edges.map((issue) => (
              <Link
                key={issue.node.id}
                href={issue.node.url}
                underline="none"
                target="_blank"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <NearbyError />
                  </ListItemIcon>
                  <ListItemText primary={issue.node.title} />
                  <Box>
                    <List sx={{ py: 0 }}>
                      {issue.node.reactions.edges.length > 0 ? (
                        Object.entries(
                          ocurrencesReactions(issue.node.reactions.edges)
                        ).map((reaction, i) => (
                          <ListItem
                            disableGutters
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              py: 0,
                            }}
                            key={i}
                          >
                            {reaction[0]} {reaction[1]}
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">No reactions</Typography>
                      )}
                    </List>
                  </Box>
                </ListItemButton>
              </Link>
            ))}
          </List>
          {repository.issues.pageInfo.hasNextPage && (
            <Button variant="contained" onClick={fetchMoreIssues}>
              More
            </Button>
          )}
        </>
      ) : (
        <Typography variant="body2">No Issues yet! </Typography>
      )}
    </>
  );
}
