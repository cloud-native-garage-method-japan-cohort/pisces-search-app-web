import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Style from "./Header.module.css";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#333333",
  },
  title: {
    fontWeight: "bold",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          営業資料検索くん
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
