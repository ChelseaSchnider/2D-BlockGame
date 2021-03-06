const express = require("express")();
const http = require("http").Server(express)
const Socketio = require("socket.io")(http)

var position = {
    x:200,
    y:200
};

Socketio.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "top":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });
});

http.listen(5000, () => {
    console.log("Listening on :5000...")
});