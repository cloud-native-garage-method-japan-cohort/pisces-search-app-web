import React, { useCallback, useState } from "react";
import {
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
    marginTop: "60px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
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
  const [suggestions, setSuggestions] = useState(["sample"]);

  const onClickSearch = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await queryDiscovery(sendText, type, 5);

      /*
      const allSuggestions = [];
      for (let data in res.data) {
        const concepts = data.concepts || [];
        allSuggestions.concat(concepts.map((concept) => concept.name));
      }
      setSuggestions([...allSuggestions]);
      */

      props.onSearch(res.data);
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

  const classes = useStyles();

  return (
    <React.Fragment>
      <form onSubmit={onSubmitForm}>
        <Paper className={classes.root}>
          <TextField
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
        {suggestions.map((suggest) => (
          <Chip size="small" label={suggest} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
