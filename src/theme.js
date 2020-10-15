import { createMuiTheme } from "@material-ui/core/styles";
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
    // overrides: {
    //     MuiCard: {
    //         root: {
    //             variant: "outlined",
    //         },
    //     },
    // },
});
export default theme;
