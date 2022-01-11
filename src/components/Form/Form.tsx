import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";

export default function Form({
  path,
  setPath,
  handleSubmit,
}: {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPath(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ "&>*:not(:last-child)": { mr: 3, my: 1} }}
      >
        <Typography variant="h6">
          <label>Show open issues for https://github.com/</label>
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="repository"
          maxRows={8}
          value={path}
          onChange={handleChange}
          sx={{ width: 300 }}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Grid>
    </form>
  );
}
