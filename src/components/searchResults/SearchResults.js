import React, { useCallback } from "react";
import Truncate from "react-truncate";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "48px",
    width: "100",
  },
  paper: {
    textAlign: "left",
    padding: "10px",
    cursor: "pointer",
    wordWrap: "break-word",
  },
  paperBorder: {
    border: `3px solid #5898a7`,
  },
  resultCaseName: {
    fontWeight: "bold",
    paddingBottom: "3px",
  },
  resultText: {
    color: "grey",
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
            onClick={() => props.onClickResult(props.results[0])}
          >
            <Typography className={classes.resultCaseName}>{props.results[0].caseName}</Typography>
            <Typography className={classes.resultText} variant="subtitle2">
              <Truncate line={10} width={2400}>
                {props.results[0].text}
              </Truncate>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid} container spacing={2}>
        {props.results.slice(1).map((result, i) => (
          <Grid item xs={3}>
            <div style={{ textAlign: "left" }}>{i + 2}番目におすすめ</div>
            <Paper className={classes.paper} onClick={() => props.onClickResult(result)}>
              <Typography className={classes.resultCaseName}>{result.caseName}</Typography>
              <Typography className={classes.resultText} variant="subtitle2">
                <Truncate line={5} width={1000}>
                  {result.text}
                </Truncate>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchResults;
