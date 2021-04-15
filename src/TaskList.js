import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Switch from "@material-ui/core/Switch";


const useStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            tasks: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    };

    getTask() { //请求该终端任务信息
        console.log(this.props.ip)
        fetch("http://" + this.props.ip + ":10000/task/get", {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            console.log(data)
                            this.setState({
                                tasks: data.Data
                            })
                        }
                    }
                )
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={this.getTask.bind(this)}>
                    <ListItemText primary="更新终端"/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button className={classes.nested}>
                    <ListItemText primary="系统收集"/>
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                {this.state.tasks.map((value, index) => (
                    <ListItem key={value.TaskId} button className={classes.nested}>
                        <ListItemText primary={value.TaskName}/>
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default withStyles(useStyles)(TaskList)