import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Repeat from "@material-ui/icons/Repeat";
import Linechart from "./LineChart";

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

class DataDiv extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <TextField id="standard-basic" label="ProcessName"/>
                    <MyButton variant="contained" startIcon={<Repeat/>} color="blue"
                              onClick={this.UpDateChart}>更新</MyButton>
                </div>
                <Linechart ref={r => this.chart = r}/>
            </React.Fragment>
        )
    }

    UpDateChart = () => {
        this.chart.getData()
    }
}


export default DataDiv
