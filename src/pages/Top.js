import React, { useCallback, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Layout from "../components/layout/Layout";
import SearchBox from "../components/searchBox/SearchBox";
import SearchResults from "../components/searchResults/SearchResults";
import SearchResultDetail from "../components/searchResultDetail/SearchResultDetail";

const Top = () => {
  const [results, setResults] = useState([]);
  const [inSearching, setInSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState(undefined);

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

  return (
    <Layout>
      <Box paddingBottom={5}>
        <SearchBox onStart={onSearchStart} onComplete={onSearchComplete} />
      </Box>
      {inSearching ? <CircularProgress /> : <SearchResults results={results} onClickResult={onClickResult} />}
      <SearchResultDetail result={selectedResult} onClose={onCloseDetail} />
    </Layout>
  );
};

export default Top;
