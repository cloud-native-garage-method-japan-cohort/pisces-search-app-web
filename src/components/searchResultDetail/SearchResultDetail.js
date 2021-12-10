import React from "react";
import {
  Button,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  resultCaseName: {
    fontWeight: "bold",
  },
  resultText: {
    padding: 10,
    marginTop: 5,
    fontSize: 15,
    letterSpacing: 3,
    wordWrap: "break-word",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  resultSolutionsTitle: {
    fontWeight: "bold",
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SearchResultDetail = (props) => {
  const classes = useStyles();

  const content = props.result ? (
    <React.Fragment>
      <DialogTitle>
        <Typography className={classes.resultCaseName}>{props.result.caseName}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Box marginLeft="auto">
            <Typography variant="subtitle2">関連度: {props.result.score}</Typography>
          </Box>
        </Box>
        <Paper className={classes.resultText} variant="outlined">
          {props.result.text}
        </Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>関連キーワード</TableCell>
              <TableCell className={classes.tableHeader}>関連度</TableCell>
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
        <Box paddingTop="20px">
          <Typography className={classes.resultSolutionsTitle} variant="subtitle2">
            関連ソリューション: {(props.result.solutions || []).length}件
          </Typography>
          {props.result.solutions.map(solution => <Chip label={solution} size="small" />)}
        </Box>
      </DialogContent>
    </React.Fragment>
  ) : null;

  return (
    <Dialog
      open={props.result}
      onClose={props.onClose}
      maxWidth="sm"
      TransitionComponent={Transition}
      fullWidth
    >
      {content}
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultDetail;