var socket = null;

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
 {   socket = io.connect('http://localhost:3000'); }
else {
    socket = io.connect('https://gyro-socket.herokuapp.com/');
}

function moveBox(data) {
    console.log(data);

    document.getElementsByTagName['h4'][0].innerHTML(`x: ${data.x} y: ${data.y} z: ${data.z}`);
}

socket.on('connection', ()=> {
    socket.on('movesquare', (data)=> {
        moveBox(data);
    });
});

function handleDeviceOrientation(z,x,o) {
    var data = {
        z: (Math.round(z))*3,
        x: (Math.round(x))*3,
        0: (Math.round(o))*3
    };

    socket.emit('devicemove', data);
    moveBox(data);
}
$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('img').hide();
        $('h4').html('Remote Controller');
        if(window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event)=> {
                var rotateDeg = event.alpha;
                var leftToRight = event.beta;
                var frontToBack = event.gamma;
                handleDeviceOrientation(frontToBack, leftToRight, rotateDeg);
            }, false);
        }
    }
    else {

    }
});    