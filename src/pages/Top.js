import React, { useCallback, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Layout from "../components/layout/Layout";
import SearchBox from "../components/searchBox/SearchBox";
import SearchResults from "../components/searchResults/SearchResults";

const Top = () => {
  const [results, setResults] = useState([]);
  const [inSearching, setInSearching] = useState(false);

  const onSearchStart = useCallback(() => {
    setInSearching(true);
  }, [setInSearching]);
  const onSearchComplete = useCallback((results) => {
    setResults([...results]);
    setInSearching(false);
  }, [setResults, setInSearching]);

  return (
    <Layout>
      <Box paddingBottom={5}>
        <SearchBox onStart={onSearchStart} onComplete={onSearchComplete} />
      </Box>
      {inSearching ? <CircularProgress /> : <SearchResults results={results} />}
    </Layout>
  );
};

export default Top;
