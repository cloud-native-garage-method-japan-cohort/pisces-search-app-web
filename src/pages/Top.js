import React, { useCallback, useState } from "react";
import { Box, CircularProgress, Fab, makeStyles} from "@material-ui/core";
import { Add as AddIcon } from '@material-ui/icons';
import FileUploader from "../components/fileUploader/FileUploader";
import Layout from "../components/layout/Layout";
import SearchBox from "../components/searchBox/SearchBox";
import SearchResults from "../components/searchResults/SearchResults";
import SearchResultDetail from "../components/searchResultDetail/SearchResultDetail";

const useStyles = makeStyles({
  addButton: {
    position: "fixed",
    top: "auto",
    left: "auto",
    right: 20,
    bottom: 20,
  },
});

const Top = () => {
  const [results, setResults] = useState([]);
  const [inSearching, setInSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState(undefined);
  const [openUploader, setOpenUploader] = useState(false);

  const onSearchStart = useCallback(() => {
    setInSearching(true);
  }, [setInSearching]);
  const onSearchComplete = useCallback((results) => {
    setResults([...results]);
    setInSearching(false);
  }, [setResults, setInSearching]);
  const onClickResult = useCallback((result) => {
    setSelectedResult(result);
  }, [setSelectedResult]);
  const onCloseDetail = useCallback(() => {
    setSelectedResult(undefined);
  }, [setSelectedResult]);
  const onClickAdd = useCallback(() => {
    setOpenUploader(true);
  }, [setOpenUploader]);

  const classes = useStyles();

  return (
    <Layout>
      <Box paddingBottom={5}>
        <SearchBox onStart={onSearchStart} onComplete={onSearchComplete} />
      </Box>
      {inSearching ? <CircularProgress /> : <SearchResults results={results} onClickResult={onClickResult} />}
      <SearchResultDetail result={selectedResult} onClose={onCloseDetail} />

      <Fab className={classes.addButton} color="primary" onClick={onClickAdd}>
        <AddIcon />
      </Fab>
      <FileUploader open={openUploader} onClose={() => setOpenUploader(false)} />
    </Layout>
  );
};

export default Top;
