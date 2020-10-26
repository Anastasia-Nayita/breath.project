import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    MuiMenuItem: {
        root: {
            display: "block",
        },
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    chartmenu: {
        padding: theme.spacing(10),
        marginTop: theme.spacing(6),
        display: "inline-flex",
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
        margin: "0 20%",
    },
}));

export default function Navbar({ profilepic }) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? "Logout" : "Login"}
                />
            </FormGroup>

            <AppBar position="static">
                <Toolbar>
                    <FeatherIcon icon="menu" onClick={handleMenu} />
                    <Menu
                        className={classes.chartmenu}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to="/chart">charts</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/breathe">breathing timer</Link>
                        </MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">take a breath</Link>
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Link to="/profile">{profilepic}</Link>
                                <a href="/logout">
                                    <FeatherIcon icon="log-out" />
                                </a>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
