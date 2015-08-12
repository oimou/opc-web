"use strict";

import Util from "./util.jsx";

class Canvas extends React.Component {
    render() {
        let className = "canvas";

        return (
            <canvas id="canvas" className={className} width="1280" height="960"></canvas>
        );
    }
}

class Nav extends React.Component {
    render() {
        let className = "btn-takemotion";

        return (
            <div id="takemotion" className={className}>TAKEMOTION</div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.socket = io.connect();
    }

    componentDidMount() {
        let button = document.querySelector("#takemotion");
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");

        this.socket.on("connect", () => {
            console.log("connected");
        });

        this.socket.on("liveview:frame", (data) => {
            let img = new Image();
            let jpgStr = Util.arrayBufferToBase64(data.jpg);

            img.src = "data:image/png;base64," + jpgStr;
            ctx.drawImage(img, 0, 0);
            img = null;
        });

        button.addEventListener("click", () => {
            button.disabled = true;
            this.socket.emit("takemotion:start");
        }, false);

        this.socket.on("takemotion:finish", () => {
            button.disabled = false;
        });
    }

    render() {
        return (
            <div>
                <Canvas />
                <Nav />
            </div>
        );
    }
}

React.render(
    <App />,
    document.querySelector("#app")
);
