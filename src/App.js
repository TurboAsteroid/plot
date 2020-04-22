import React from 'react';
import MyPlot from './components/MyPlot';
import WolframPlot from './components/WolframPlot';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equation: '',
            rangeStart: '',
            rangeEnd: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
        this.setState(() => (newState));
    }

    render() {
        return (
            <div className="App">
                <input name="equation" type="text" placeholder="выражение" value={this.state.equation}
                       onChange={this.handleChange}/>
                <br/>
                <input name="rangeStart" type="number" placeholder="старт" value={this.state.rangeStart}
                       onChange={this.handleChange}/>
                <br/>
                <input name="rangeEnd" type="number" placeholder="стоп" value={this.state.rangeEnd}
                       onChange={this.handleChange}/>
                <br/>
                <MyPlot equation={this.state.equation} rangeStart={this.state.rangeStart}
                        rangeEnd={this.state.rangeEnd}/>
                <WolframPlot equation={this.state.equation} rangeStart={this.state.rangeStart}
                             rangeEnd={this.state.rangeEnd}/>
            </div>
        );
    }
}

export default App;


