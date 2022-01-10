import React from "react";
import {
  Typography,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FolderShared } from "@mui/icons-material";

type Issues = {
  node: { id: string; url: string; title: string };
};

export default function Repository({
  repository = { url: "", name: "", issues: { edges: [] } },
}: {
  repository: { url: string; name: string; issues: { edges: Array<Issues> } };
}) {
  return (
    <>
      <Typography variant="body2">
        <Link href={repository.url} underline="none" target="_blank">
          {repository.name}
        </Link>
      </Typography>
      <Typography mt={3} variant="body1">Issues</Typography>
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
                <FolderShared />
              </ListItemIcon>
              <ListItemText primary={issue.node.title} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
}
