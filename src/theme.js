import { createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[500],
        },
        secondary: {
            main: "#005249",
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
