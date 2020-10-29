"use strict";
const IO = require("socket.io-client");
const React = require("react");
const ReactDOM = require("react-dom");

const Input = require("./input");

let socket = IO("http://192.168.1.175:3000");
let prevSpeeds = [0, 0];
const input = new Input();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            editing: false,
            address: "192.168.1.175",
            maxout: 1,
            maxVolt: 12,
            speeds: [0, 0]
        };
        setInterval(() => {
            let axis = [input.getAxis("s", "w"), input.getAxis("a", "d")];
            axis = axis.map(o => o * this.state.maxout);

            let speeds = [axis[0], axis[0]];
            if (axis[1] > 0)
                speeds[1] *= 0;
            if (axis[1] < 0)
                speeds[0] *= 0;
            this.setState({speeds: speeds});

            if (!speeds.every((o, i) => prevSpeeds[i] === o))
                if (socket !== null)
                    socket.emit("motor", speeds.map(o => o * 255));

            prevSpeeds = speeds;
            input.resetKeys();
        }, 1000 / 60);

        socket.on("connect", () => this.setState({connected: true}));
        socket.on("disconnect", () => this.setState({connected: false}));
    }

    render() {
        if (!this.state.connected) {
            return (
                <div className="container">
                    <div id="landing-icon">
                        {
                            !this.state.editing ? (
                                <div className="sk-fading-circle">
                                    <div className="sk-circle1 sk-circle"></div>
                                    <div className="sk-circle2 sk-circle"></div>
                                    <div className="sk-circle3 sk-circle"></div>
                                    <div className="sk-circle4 sk-circle"></div>
                                    <div className="sk-circle5 sk-circle"></div>
                                    <div className="sk-circle6 sk-circle"></div>
                                    <div className="sk-circle7 sk-circle"></div>
                                    <div className="sk-circle8 sk-circle"></div>
                                    <div className="sk-circle9 sk-circle"></div>
                                    <div className="sk-circle10 sk-circle"></div>
                                    <div className="sk-circle11 sk-circle"></div>
                                    <div className="sk-circle12 sk-circle"></div>
                                </div>
                            ) : (
                                <img src="imgs/create-white-18dp.svg"/>
                            )
                        }
                    </div>
                    <div id="landing-title">
                        {
                            !this.state.editing ? "Connecting" : "Editing"
                        }
                    </div>
                    <div id="landing-desc">
                        {
                            !this.state.editing ? "Modify the below textbox to halt auto-connection and change the target address"
                                : "Press Enter or click elsewhere to apply changes and re-invoke the auto-connection "
                        }
                    </div>
                    <div id="landing-input">
                        <input type="text" id="txtbox-address" value={this.state.address}
                               onClick={() => {
                                   this.setState({editing: true});
                                   socket.close();
                               }}
                               onBlur={() => {
                                   this.setState({editing: false});
                                   socket.io.uri = this.state.address + ":3000";
                                   socket.io.reconnecting = undefined;
                                   socket.io._reconnection = true;
                                   socket.connect();
                               }}
                               onChange={e => this.setState({address: e.target.value})}
                               onKeyUp={e => {
                                   if (e.key === "Enter")
                                       e.target.blur()
                               }}/>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div id="header">
                    <span className="online"></span>
                    <div className="status">{this.state.address}</div>
                </div>
                <div id="center">
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div id="footer">
                    <div className="speed">
                        <div className="speed-desc">L</div>
                        <div>
                            <span className="speed-value" id="speed-left">
                            {Math.round(this.state.speeds[0] * 100).toString()}
                            </span>
                            <span>%</span>
                        </div>
                        <div className="speed-desc" id="volt-left">{this.state.speeds[0] * 12}V</div>
                    </div>
                    <div id="maxout">
                        <input id="slider-maxout" type="range" min="0" max="24"
                               value={this.state.maxout * 24}
                               onChange={e => this.setState({maxout: e.target.value / 24})}/>
                        <div className="speed-desc" id="lbl-maxout">
                            Max Output {this.state.maxVolt * this.state.maxout}V
                        </div>
                    </div>
                    <div className="speed">
                        <div className="speed-desc">R</div>
                        <div>
                            <span className="speed-value" id="speed-right">
                            {Math.round(this.state.speeds[1] * 100).toString()}
                            </span>
                            <span>%</span>
                        </div>
                        <div className="speed-desc" id="volt-right">{this.state.speeds[1] * 12}V</div>
                    </div>
                </div>
            </div>
        );
    }
}

window.addEventListener("load", e => {
    const app = ReactDOM.render(<App/>, document.body);
});