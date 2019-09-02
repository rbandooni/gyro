var socket = null;

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
 {   socket = io.connect('http://localhost:3000'); }
else {
    socket = io.connect('https://gyro-socket.herokuapp.com/');
}

function movesquare(data) {
    console.log(data);

    document.getElementsByTagName['h4'][0].innerHTML(`x: ${data.x} y: ${data.y} z: ${data.z}`);
}

socket.on('connect', ()=> {
    socket.on('movesquare', (data)=> {
        movesquare(data);
    });
});

