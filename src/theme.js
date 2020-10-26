import { createMuiTheme, createStyles } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[500],
        },
        secondary: {
            main: "#005249",
            light: "#00897A",
        },
        chosen: {
            main: "#AC9160",
            light: "#B5AA99",
        },
        highlight: {
            main: "#FFEECB",
        },
    },
    overrides: {
        MuiMenuItem: createStyles({
            root: {
                gap: "10%",
                width: "auto",
                whiteSpace: "nowrap",
                textDecoration: "none",
            },
        }),
        MuiList: createStyles({
            root: {
                width: "100%",
                padding: "5%",
            },

            padding: {
                padding: "10%",
            },
        }),
        MuiMenu: createStyles({
            list: {
                width: "100%",
            },
            paper: {
                width: "auto",
            },
        }),
        MuiPopover: createStyles({
            paper: {
                minWidth: "180px",
            },
        }),
    },
});
export default theme;
