import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Layout from "../components/layout/Layout";
import SearchBox from "../components/searchBox/SearchBox";
import SearchResults from "../components/searchResults/SearchResults";

const Top = () => {
  const [results, setResults] = useState([]);

  const onSearch = async (results) => {
    console.log("results:");
    console.log(results);
    setResults([...results]);
  };

  return (
    <Layout>
      <Box paddingBottom={5}>
        <SearchBox onSearch={onSearch} />
      </Box>
      {!results ? <Loading /> : <SearchResults results={results} />}
    </Layout>
  );
};

const Loading = () => <div>loading</div>;

export default Top;
