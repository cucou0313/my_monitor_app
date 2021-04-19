import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import Switch from "@material-ui/core/Switch";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InputBase from "@material-ui/core/InputBase";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Divider from "@material-ui/core/Divider";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

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
            tasks: [],
            taskName: "",
            CoreCount: 1,
            LogicalCoreCount: 1,
            CollectSysInfo: false,
            taskStatus: {},
            alertType: "success",
            alertMsg: "",
            alertOpen: false,
        }
    }


    componentDidMount() {
        this.getAllTask()
    }

    /**
     * @Description:请求该终端任务信息
     * @return
     */
    getAllTask() {
        console.log(this.props.ip)
        fetch("http://" + this.props.ip + ":10000/task/get", {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            this.setState({
                                tasks: data.Data,
                                CoreCount: data.CoreCount,
                                LogicalCoreCount: data.LogicalCoreCount,
                                CollectSysInfo: data.CollectSysInfo,
                                taskStatus: data.taskStatus
                            })
                            //更新父组件信息
                            this.props.func(this.props.ip, "任务:" + data.runCount + "<br/>" + data.totalCount)
                        } else {
                            this.setState({
                                alertType: "error",
                                alertMsg: "获取任务信息失败",
                                alertOpen: true
                            })
                        }
                    }
                )
        })
    }

    /**
     * @Description:删除任务
     * @return
     */
    delTask(id) {
        console.log(this.props.ip)
        fetch("http://" + this.props.ip + ":10000/task/del?id=" + id, {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        this.setState({
                            alertType: data.Code === 0 ? "success" : "error",
                            alertMsg: data.Msg,
                            alertOpen: true
                        })
                        this.getAllTask()
                    }
                )
        })
    }

    /**
     * @Description:系统资源监控开关
     * @return
     */
    sysSwitchChange() {
        let newtStatus = !this.state.CollectSysInfo
        fetch("http://" + this.props.ip + ":10000/task/open_system?flag=" + newtStatus, {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            this.setState({
                                alertType: "success",
                                alertMsg: data.Msg,
                                alertOpen: true,
                                CollectSysInfo: newtStatus
                            })
                        } else {
                            this.setState({
                                alertType: "error",
                                alertMsg: "Switch system collection fail!\n errMsg=" + data.Msg,
                                alertOpen: true,
                            })
                        }
                    }
                )
        })
    }

    /**
     * @Description:任务开启关闭
     * @return
     */
    taskSwitchChange(id) {
        console.log(this.state.taskStatus[id])
        let newStatus = !this.state.taskStatus[id]
        fetch("http://" + this.props.ip + ":10000/task/" + (newStatus ? "start?" : "stop?") + "id=" + id, {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            this.setState({
                                alertType: "success",
                                alertMsg: data.Msg,
                                alertOpen: true,
                                taskStatus: {...this.state.taskStatus, [id]: newStatus}
                            })
                            this.getAllTask()
                        } else {
                            this.setState({
                                alertType: "error",
                                alertMsg: data.Msg,
                                alertOpen: true,
                                CollectSysInfo: this.state.CollectSysInfo
                            })
                        }
                    }
                )
        })
    }

    alerthandleClose() {
        this.setState({
            alertOpen: false
        })
    }

    updateChart(name, id) {
        this.props.func2(name, id)
    }

    checkTask() { //测试任务
        fetch("http://" + this.props.ip + ":10000/task/check?name=" + this.state.taskName, {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        console.log(data.Msg)

                    }
                )
        })
    }

    addTask() { //新建任务
        fetch("http://" + this.props.ip + ":10000/task/add?name=" + this.state.taskName, {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        console.log(data.Msg)

                    }
                )
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <List component="div" disablePadding>
                <ListItem component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="ProcessName"
                        inputProps={{'aria-label': 'ProcessName'}}
                        onChange={e => {
                            this.setState({taskName: e.target.value})
                        }}
                    />
                    <IconButton className={classes.iconButton} aria-label="search"
                                onClick={this.checkTask.bind(this)}>
                        <PlaylistAddCheckIcon/>
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical"/>
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions"
                                onClick={this.addTask.bind(this)}>
                        <PlaylistAddIcon/>
                    </IconButton>
                </ListItem>

                <ListItem button className={classes.nested} onClick={this.updateChart.bind(this, "", "")}>
                    <ListItemText primary="加载运行的任务数据"/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteSweepRoundedIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button className={classes.nested}>
                    <ListItemText primary="系统收集"/>
                    <ListItemSecondaryAction>
                        <Switch
                            checked={this.state.CollectSysInfo}
                            onChange={this.sysSwitchChange.bind(this)}
                            inputProps={{'aria-label': 'secondary checkbox'}}
                            edge="end"
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                {(this.state.tasks || []).map((value, index) => (
                    <ListItem key={value.TaskId} button className={classes.nested}
                              onClick={this.updateChart.bind(this, value.TaskName, value.TaskId)}>
                        <ListItemText primary={value.TaskName}
                                      secondary={'进程ID:' + value.PId}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="down"
                                        href={"http://" + this.props.ip + ":10000/res/down_file?name=" + value.TaskName + "&id=" + value.TaskId}>
                                <GetAppRoundedIcon color="primary"/>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={this.delTask.bind(this, value.TaskId)}>
                                <DeleteSweepRoundedIcon/>
                            </IconButton>
                            <Switch
                                checked={this.state.taskStatus[value.TaskId]}
                                onChange={this.taskSwitchChange.bind(this, value.TaskId)}
                                inputProps={{'aria-label': 'secondary checkbox'}}
                                color="primary"
                                edge="end"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}

                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.alertOpen}
                    onClose={this.alerthandleClose.bind(this)}
                    key={"list alert" + this.props.ip}
                >
                    <Alert severity={this.state.alertType}>
                        {this.state.alertMsg}
                    </Alert>
                </Snackbar>
            </List>
        )
    }
}

export default withStyles(useStyles)(TaskList)