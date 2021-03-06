import React, { useCallback, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { queryDiscovery } from "../../utils/index";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: "40px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 600,
  },
  input: {
    width: 600,
  },
  iconButton: {
    padding: 10,
  },
  suggestions: {
    paddingTop: 10,
    margin: "auto",
    width: "70%",
  },
}));

const SearchBox = (props) => {
  const [sendText, setSendText] = useState("");
  const [type, setType] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const doSearch = async (type) => {
    props.onStart();
    const res = await queryDiscovery(sendText, type, 5);

    let allSuggestions = new Set();
    for (let data of res.data) {
      const concepts = data.concepts || [];
      for (let concept of concepts) {
        allSuggestions.add(concept.text)
      }
    }
    setSuggestions([...Array.from(allSuggestions)]);

    props.onComplete(res.data);
  };
  const onClickSearch = useCallback(async (event) => {
    event.preventDefault();
    await doSearch(type);
  }, [type, doSearch]);
  const onSubmitForm = useCallback((event) => {
    onClickSearch(event);
  },[onClickSearch]);
  const onChangeType = useCallback(async (event, newType) => {
    setType(newType);
    await doSearch(newType);
  },[type, setType, doSearch]);
  const onChangeSearchText = useCallback((event) => {
    setSendText(event.target.value);
  }, [setSendText]);
  const onClickSuggestion = useCallback((event) => {
    const searchWords = sendText.split(" ");
    searchWords.push(event.currentTarget.dataset.suggestion);

    const newSendText = searchWords.join(" ");
    setSendText(newSendText);

    const suggestionsSet = new Set(suggestions);
    suggestionsSet.delete(event.currentTarget.dataset.suggestion);
    setSuggestions([...Array.from(suggestionsSet)]);
  }, [sendText, setSendText, suggestions, setSuggestions]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <form className={classes.root} onSubmit={onSubmitForm}>
        <Grid contaiener>
          <Grid item={12}>
            <Tabs indicatorColor="primary" textColor="primary" value={type} onChange={onChangeType}>
              <Tab label="??????" value={0} />
              <Tab label="?????????????????????" value={1} />
            </Tabs>
          </Grid>
          <Grid item={12}>
            <Paper >
              <TextField
                className={classes.input}
                variant="outlined"
                value={sendText}
                placeholder="Watson Discovery ?????????"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      type="button"
                      className={classes.iconButton}
                      aria-label="search"
                      onClick={onClickSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                onChange={onChangeSearchText}
                fullWidth
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
      <div className={classes.suggestions}>
        <Typography variant="subtitle2">???????????????</Typography>
        {suggestions.map((suggestion) => (
          <Chip 
            size="small"
            label={suggestion}
            data-suggestion={suggestion}
            onClick={onClickSuggestion}
            clickable
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
