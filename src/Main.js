import React from 'react';
import Linechart from "./LineChart";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Button variant="contained" color="primary" disableElevation
                                    onClick={this.UpDateChart}>更新</Button>
                            <Linechart id="123" name="charts demo1" url="/res/get" ref={r => this.chart = r}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    UpDateChart = () => {
        this.chart.getData()
    }
}

export default Main;