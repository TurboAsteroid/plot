import React from 'react';
import CalcInput from '../libs/CalcInput';

class MyPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 200,
            height: 200
        };
        this.setCanvasRef = element => {
            this.canvas = element;
        };
    }

    componentDidUpdate() {
        let calc = new CalcInput(this.props.equation);
        this.props.checkEquasion(calc.parseResult);
        if (
            !calc.parseResult.result ||
            this.props.rangeStart === "" ||
            this.props.rangeEnd === "" ||
            parseFloat(this.props.rangeStart) >= parseFloat(this.props.rangeEnd)
        ) {
            return;
        } else {
            const canvas = this.canvas;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let points = [];
            let minY, maxY;
            let minX = parseFloat(this.props.rangeStart);
            let maxX = parseFloat(this.props.rangeEnd);
            let zoomX = Math.abs(maxX - minX) / (this.state.width - 20); // масштаб
            for (let i = minX; i < parseInt(maxX); i += parseFloat(zoomX)) {
                let calculate = calc.compute({x: i});
                if (calculate.result === false) {
                    this.props.checkEquasion(calculate);
                    return;
                }
                let y = calculate.value;
                if (!minY || y < minY) {
                    minY = y;
                }
                if (!maxY || y > maxY) {
                    maxY = y;
                }
                points.push({
                    x: i,
                    y: y
                });
            }
            if (minY === maxY) {
                minY -= 24;
                maxY += 24;
            }

            this.props.checkEquasion({result: true});

            let zoomY = Math.abs(maxY - minY) / (this.state.height - 20); // масштаб

            ctx.beginPath();
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 1;
            ctx.font = "10px Arial";
            for (let x = 1; x < 6; x++) {
                ctx.moveTo(x * this.state.width / 6, 10);
                ctx.lineTo(x * this.state.width / 6, this.state.height - 10);
                ctx.fillText(
                    (((x * Math.abs(maxX - minX) / 6) + minX)).toFixed(2),
                    x * this.state.width / 6,
                    this.state.height
                );
                ctx.moveTo(10, x * this.state.height / 6);
                ctx.lineTo(this.state.width - 10, x * this.state.height / 6);
                ctx.fillText(
                    (((6 - x) * Math.abs(maxY - minY) / 6) + minY).toFixed(2),
                    0,
                    x * this.state.height / 6
                );
            }
            ctx.stroke();

            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(10 + (points[0].x - minX) / zoomX, 10 - (points[0].y - maxY) / zoomY);
            for (let point of points) {
                ctx.lineTo(10 + (point.x - minX) / zoomX, 10 - (point.y - maxY) / zoomY);
            }
            ctx.stroke();
        }

    }

    render() {
        return (
            <div>
                <div>My plot</div>
                <canvas ref={this.setCanvasRef} width={this.state.width} height={this.state.height}/>
            </div>
        );
    }
}

export default MyPlot;


