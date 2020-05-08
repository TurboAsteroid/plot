import React from 'react';
const serverUrl= 'http://localhost:8080/';

class WolframPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            err: ''
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
        try {
            let request = await fetch(`${serverUrl}plot?${queryString}`);
            let response = await request.json();
            this.setState({
                src: response.src,
                err: ''
            });
        } catch (e) {
            this.setState({
                src: '',
                err: "no connection to WolframAlpha"
            });
        }
    }

    render() {
        if (this.state.src && this.state.src !== '')
            return (
                <div>
                    <div>Wolfram plot</div>
                    <img src={this.state.src} alt=""/>
                </div>
            );
        if (this.state.err && this.state.err !== '') {
            return <div>
                <div>Wolfram plot</div>
                <div>{this.state.err}</div>
            </div>
        }
        return <div/>
    }
}

export default WolframPlot;


