import React from 'react';
import Linechart from "./LineChart";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <button color="primary" onClick={this.UpDateChart}>更新</button>
                <Linechart id="123" name="charts demo1" url="/test" ref={r => this.child = r}/>
            </div>
        )
    }

    UpDateChart = () => {
        this.child.getData()
    }
}

export default Main;