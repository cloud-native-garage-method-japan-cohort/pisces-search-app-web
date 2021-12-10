import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  logo: {
    height: "23px",
    paddingBottom: "3px",
    paddingRight: "15px",
  },
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
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/ibm-logo.png"} />
        <Typography className={classes.title} variant="h6">
          営業資料検索くん
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
