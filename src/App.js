import React from 'react';
import MyPlot from './components/MyPlot';
import WolframPlot from './components/WolframPlot';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
    root: {
        width: 430,
        margin: '50px auto'
    },
    title: {
        fontSize: 14,
    },
    inputMargin: {
        marginLeft: 8
    },
    plot: {
        margin: '5px auto'
    },
    tooltip: {
        color: '#666'
    }
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equation: '',
            rangeStart: '',
            rangeEnd: '',
            equationTooltip: '',
            checkEquation: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    checkRange() {
        if (this.state.rangeStart === "" || this.state.rangeEnd === "") {
            return false;
        }
        if (
            this.state.rangeStart !== "" &&
            this.state.rangeEnd !== "" &&
            parseFloat(this.state.rangeStart) < parseFloat(this.state.rangeEnd)
        ) {
            return false;
        }
        return true;
    }
    checkEquation = (calculate) => {
        if (calculate.result === false && calculate.message !== this.state.equationTooltip) {
            this.setState({
                equationTooltip: calculate.message,
                checkEquation: true
            })
        } else if (calculate.result === true && this.state.equationTooltip !== "") {
            this.setState({
                equationTooltip: "",
                checkEquation: false
            })
        }
    };

    render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Make Plots
                    </Typography>
                    <div className={classes.tooltip}>
                        You can use:
                        <ul>
                            <li>numbers</li>
                            <li>+-/*^()</li>
                            <li>function: sqrt()</li>
                            <li>variable: x</li>
                        </ul>
                    </div>
                    <TextField
                        label="Expression"
                        name="equation"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
                        error={this.state.checkEquation}
                        helperText={this.state.equationTooltip}
                    />
                    <TextField
                        label="Range start"
                        name="rangeStart"
                        margin="normal"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
                        error={this.checkRange()}
                        helperText="Must be less then End"
                    />
                    <TextField
                        className={classes.inputMargin}
                        label="Range end"
                        name="rangeEnd"
                        margin="normal"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
                        error={this.checkRange()}
                        helperText="Must be grater then Start"
                    />
                    <br/>

                    <MyPlot
                        equation={this.state.equation}
                        rangeStart={this.state.rangeStart}
                        rangeEnd={this.state.rangeEnd}
                        checkEquasion={this.checkEquation}/>
                    <WolframPlot
                        equation={this.state.equation}
                        rangeStart={this.state.rangeStart}
                        rangeEnd={this.state.rangeEnd}/>

                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(App);


