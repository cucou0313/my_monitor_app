import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DataDiv from "./DataDiv";
import TaskList from "./TaskList";
import MyTask from "./MyTask";
// class Main extends React.Component {
//     render() {
//         return(
//             <div>
//                 <Grid container spacing={3}>
//                     <Grid item xs={3}>
//                     </Grid>
//                     <Grid item xs={9}>
//                         <DataDiv/>
//                     </Grid>
//                 </Grid>
//             </div>
//         )
//     }
//
// }

// export default Main;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function Main() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h4" noWrap>
                        Monitor Go
                    </Typography>
                </Toolbar>
            </AppBar>
            <MyTask/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <DataDiv/>
            </main>
        </div>
    );
}