import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Computer from '@material-ui/icons/Computer';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import TaskList from "./TaskList";

const drawerWidth = 240;
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
})

class MyTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ips: [],
            expands: {}
        }
    }

    componentDidMount() {
        this.getIps()
    }

    getIps() { //请求所有在线终端
        fetch("http://localhost:10000/conn/get_all_ip", {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            console.log(data)
                            this.setState({
                                ips: data.Data,
                            })
                        }
                    }
                )
        })
    }

    changeExpand(ip) { //折叠状态
        let expands=this.state.expands
        expands[ip] = !expands[ip]
        this.setState({
            expands: expands
        })
    }

    render() {
        const {classes} = this.props;

        // let l = (
        //     <List>
        //         {this.state.ips.map((text, index) => (
        //             <ListItem button key={text} onClick={this.getIps.bind(this, text)}>
        //                 <ListItemIcon>
        //                     <Computer/>
        //                 </ListItemIcon>
        //                 <ListItemText primary={text}/>
        //                 <ListItemSecondaryAction>
        //                     <IconButton edge="end" aria-label="delete">
        //                         <DeleteIcon/>
        //                     </IconButton>
        //                 </ListItemSecondaryAction>
        //                 {this.state.open ? <ExpandLess/> : <ExpandMore/>}
        //             </ListItem>
        //         ))}
        //     </List>
        // )

        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Divider/>
                <Typography variant="h4" noWrap>
                    在线终端
                </Typography>
                <Divider/>
                {/*动态生成list*/}
                {this.state.ips.map((text, index) => (
                    <List key="mylist">
                        <ListItem button onClick={this.changeExpand.bind(this, text)}>
                            <ListItemIcon>
                                <Computer/>
                            </ListItemIcon>
                            <ListItemText primary={text} secondary='Secondary text'/>
                                {this.state.expands[text] ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.expands[text]} timeout="auto" unmountOnExit>
                            <TaskList ip={text}/>
                            <Divider/>
                        </Collapse>
                    </List>
                ))}

                {/*<List component="div" disablePadding>*/}
                {/*    <ListItem button onClick={this.changeExpand.bind(this, "1")}>*/}
                {/*        <ListItemIcon>*/}
                {/*            <Computer/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="test" secondary='Secondary text'/>*/}
                {/*            {this.state.expands["1"] ? <ExpandLess/> : <ExpandMore/>}*/}
                {/*    </ListItem>*/}
                {/*    <Collapse in={this.state.expands["1"]} timeout="auto" unmountOnExit>*/}
                {/*        <ListItem button>*/}
                {/*            <ListItemText primary="test"/>*/}
                {/*            <ListItemSecondaryAction>*/}
                {/*                <IconButton edge="end" aria-label="delete">*/}
                {/*                    <DeleteIcon/>*/}
                {/*                </IconButton>*/}
                {/*            </ListItemSecondaryAction>*/}
                {/*        </ListItem>*/}
                {/*        <Divider/>*/}
                {/*    </Collapse>*/}
                {/*</List>*/}
            </Drawer>
        )
    }
}

export default withStyles(useStyles)(MyTask)