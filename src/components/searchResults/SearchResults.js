import Truncate from "react-truncate";
import { Paper, Grid, makeStyles, Chip } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "48px",
    width: "100",
  },
  paper: {
    textAlign: "left",
    padding: "10px",
  },
  paperBorder: {
    border: `3px solid #5898a7`,
  },
}));

const SearchResults = (props) => {
  const classes = useStyles();

  if (props.results.length < 1) {
    return <div>no results</div>;
  }

  return (
    <div style={{ width: "1000px" }}>
      <Grid container>
        最もおすすめの記事：
        <Grid item xs={12}>
          <Paper
            className={[classes.paper, classes.paperBorder].join(" ")}
            elevation={5}
          >
            <Truncate line={10} width={2400}>
              {props.results[0].text}
            </Truncate>
          </Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid} container spacing={2}>
        {props.results.slice(1).map((result, i) => (
          <Grid item xs>
            <div style={{ textAlign: "left" }}>{i + 2}番目におすすめ</div>
            <Paper className={classes.paper}>
              <Truncate line={5} width={1000}>
                {result.text}
              </Truncate>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchResults;
