import React from 'react';
const serverUrl= 'http://localhost:8080/';

class WolframPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        }
    }

    async componentDidUpdate(prevProps) {
        if (
            this.props.equation === prevProps.equation &&
            this.props.rangeStart === prevProps.rangeStart &&
            this.props.rangeEnd === prevProps.rangeEnd
        ) {
            return;
        }
        if (
            this.props.equation === "" ||
            this.props.rangeStart === "" ||
            this.props.rangeEnd === "" ||
            parseFloat(this.props.rangeStart) >= parseFloat(this.props.rangeEnd)
        ) {
            return;
        }
        let params = {
            equation: this.props.equation,
            rangeStart: this.props.rangeStart,
            rangeEnd: this.props.rangeEnd
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let request = await fetch(`${serverUrl}plot?${queryString}`);
        let response = await request.json();
        if (response.error) {
            console.error(response.error);
        }
        this.setState({src: response.src});
    }

    render() {
        if (this.state.src)
            return (
                <img src={this.state.src} alt=""/>
            );
        return <div/>
    }
}

export default WolframPlot;


