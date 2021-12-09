import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  resultText: {
    padding: 10,
    marginTop: 5,
    fontSize: 15,
    letterSpacing: 3,
  },
});

const SearchResultDetail = (props) => {
  const classes = useStyles();

  const content = props.result ? (
    <DialogContent>
      <Box display="flex">
        <Box marginLeft="auto">
          <span>関連度: {props.result.score}</span>
        </Box>
      </Box>
      <Paper className={classes.resultText} variant="outlined">
        {props.result.text}
      </Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>関連キーワード</TableCell>
            <TableCell>関連度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.result.concepts.map(concept => (
            <TableRow>
              <TableCell>{concept.text}</TableCell>
              <TableCell>{concept.relevance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  ) : null;

  return (
    <Dialog
      open={props.result}
      onClose={props.onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>検索結果詳細</DialogTitle>
      {content}
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultDetail;