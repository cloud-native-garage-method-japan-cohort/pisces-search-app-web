import React, { useCallback, useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { queryDiscovery } from "../../utils/index";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  suggestions: {
    paddingTop: 10,
  },
}));

const SearchBox = (props) => {
  const [sendText, setSendText] = useState("");
  const [type, setType] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  const onClickSearch = useCallback(
    async (event) => {
      event.preventDefault();

      props.onStart();
      const res = await queryDiscovery(sendText, type, 5);

      let allSuggestions = [];
      for (let data of res.data) {
        const concepts = data.concepts || [];
        allSuggestions = allSuggestions.concat(concepts.map((concept) => concept.text));
      }
      setSuggestions([...allSuggestions]);

      props.onComplete(res.data);
    },
    [sendText, type, setSuggestions]
  );
  const onSubmitForm = useCallback(
    (event) => {
      onClickSearch(event);
    },
    [onClickSearch]
  );
  const onChangeTypeSelect = useCallback(
    (event) => {
      setType(event.target.value);
    },
    [setType]
  );
  const onChangeSearchText = useCallback(
    (event) => {
      setSendText(event.target.value);
    },
    [setSendText]
  );
  const onClickSuggestion = useCallback((event) => {
    const newSendText = sendText + event.currentTarget.dataset.suggestion
    setSendText(newSendText);
  }, [sendText, setSendText]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <form onSubmit={onSubmitForm}>
        <Paper className={classes.root}>
          <TextField
            value={sendText}
            placeholder="Watson Discovery で検索"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={onChangeTypeSelect}
                  disableUnderline
                >
                  <MenuItem value={1}>事例</MenuItem>
                  <MenuItem value={2}>ソリューション</MenuItem>
                </Select>
              ),
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
      </form>
      <div className={classes.suggestions}>
        <span>関連ワード</span>
        <Box>
          {suggestions.map((suggestion) => (
            <Chip 
              size="small"
              label={suggestion}
              data-suggestion={suggestion}
              onClick={onClickSuggestion}
              clickable
            />
          ))}
        </Box>
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
