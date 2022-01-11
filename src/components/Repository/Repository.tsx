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
} from "@mui/material";
import { NearbyError } from "@mui/icons-material";

import { ocurrencesReactions } from "../../utils/Ocurrences";

interface Node {
  id: string;
}

interface NodeEdgesReactions extends Node {
  content: string;
  id: string;
}

interface NodeEdgesIssues extends Node {
  url: string;
  title: string;
  reactions: { edges: Array<EdgesReactions> };
}

type EdgesReactions = { node: NodeEdgesReactions };

type EdgesIssues = {
  node: NodeEdgesIssues;
};

interface Repos extends Object {
  url: string;
  name: string;
  issues: { edges: Array<EdgesIssues>; pageInfo: { hasNextPage: boolean } };
}

export default function Repository({
  repository = {
    url: "",
    name: "",
    issues: { edges: [], pageInfo: { hasNextPage: false } },
  },
  fetchMoreIssues,
}: {
  repository: Repos;
  fetchMoreIssues: React.MouseEventHandler;
}) {
  if (!repository) {
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
