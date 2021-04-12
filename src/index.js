import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from "./Main";

class TestDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "hello test!"
        };
        this.handleChangeValue = this.handleChangeValue.bind(this)
    }

    handleChangeValue(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        var value = this.state.value
        return <div>
            <input type="text" value={value} onChange={this.handleChangeValue}/>
            <h1>{value}</h1>
        </div>
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Main/>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
