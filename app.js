const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data})
    });
    socket.on("disconnect",function () {
        io.emit("user-disconnected",socket.id);
    });
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
});
