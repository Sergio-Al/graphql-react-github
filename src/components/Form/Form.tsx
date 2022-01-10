import React, { useState, useEffect } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";

export default function Form() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
    setPath(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(path);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ "&>*:not(:last-child)": { mr: 3 } }}
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
