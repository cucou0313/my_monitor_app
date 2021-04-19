import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DataDiv from "./DataDiv";
import MyTask from "./MyTask";
import Linechart from "./LineChart";

const drawerWidth = 300;

const useStyles = theme => ({
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
});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes} = this.props;

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
                {/*任务列*/}
                <MyTask funChart={this.UpDateChart}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {/*echarts*/}
                    <Linechart ref={r => this.chart = r}/>

                </main>
            </div>
        )
    }

    UpDateChart = (name,id) => {
        this.chart.getAllData(name,id)
    }
}

export default withStyles(useStyles)(Main)