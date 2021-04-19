import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Repeat from "@material-ui/icons/Repeat";
import Linechart from "./LineChart";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'

const useStyles = makeStyles({
    root: {
        background: (props) =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: (props) =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    },
});

function MyButton(props) {
    const {color, ...other} = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />;
}

MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
};


const testStyle = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
});

class DataDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: ""
        }
    }

    testTask() { //测试任务
        fetch("http://localhost:10000/task/check?name=" + this.state.taskName, {
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
        fetch("http://localhost:10000/task/add?name=" + this.state.taskName, {
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
            <React.Fragment>
                <div>

                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="ProcessName"
                            inputProps={{'aria-label': 'ProcessName'}}
                            onChange={e => {
                                this.setState({taskName: e.target.value})
                            }}
                        />
                        <IconButton className={classes.iconButton} aria-label="search"
                                    onClick={this.testTask.bind(this)}>
                            <PlaylistAddCheckIcon/>
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical"/>
                        <IconButton color="primary" className={classes.iconButton} aria-label="directions"
                                    onClick={this.addTask.bind(this)}>
                            <PlaylistAddIcon/>
                        </IconButton>
                    </Paper>


                    <TextField id="standard-basic" label="ProcessName"
                               onChange={() => this.setState({taskName: "ss"})}/>
                    <MyButton variant="contained" startIcon={<Repeat/>} color="red"
                              onClick={this.addTask.bind(this,)}>创建任务</MyButton>

                    <MyButton variant="contained" startIcon={<Repeat/>} color="blue"
                              onClick={this.UpDateChart}>加载数据</MyButton>
                </div>
                <Linechart ref={r => this.chart = r}/>
            </React.Fragment>
        )
    }

    UpDateChart = () => {
        this.chart.getAllData()
    }
}

export default withStyles(testStyle)(DataDiv)
