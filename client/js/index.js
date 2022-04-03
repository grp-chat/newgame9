/* var ctx = document.getElementById("ctx").getContext("2d");
        ctx.font = '30px Arial'; */

var nickname = '';
var pinNumber = 0;
var correctPin = false;
var secs = 0;
var students = ["LOK", "JW", "CED", "CJH", "KX", "KN", "JV", "TCR"];
var gameOver = false;
//var nothing = '';


setInterval(() => {
    secs++;
}, 1000);


const promptMsg = () => {
    var nick = prompt("Please enter your pin number:");
    while (nick.length == 0) {
        alert("Please enter your pin number!");
        nick = prompt("Please enter your pin number:");
    }


    if (nick === '9852') {
        nickname = 'LK';
        correctPin = true;
    } else if (nick === '9035') {
        nickname = 'LXR'
        correctPin = true;
    } else if (nick === '6588') {
        nickname = 'TJY'
        correctPin = true;
    } else if (nick === '1072') {
        nickname = 'JL'
        correctPin = true;
    } else if (nick === '3839') {
        nickname = 'SZF'
        correctPin = true;
    } else if (nick === '5691') {
        nickname = 'JV'
    } else if (nick === '88888') {
        nickname = 'TCR'
        correctPin = true;
    } else if (nick === '3583') {
        nickname = 'JHA'
        correctPin = true;
    } else if (nick === '5086') {
        nickname = 'CED'
    } else if (nick === '2105') {
        nickname = 'CJH'
    } else if (nick === '2167') {
        nickname = 'KX'
    } else if (nick === '7051') {
        nickname = 'KN'
    } else if (nick === '1198') {
        nickname = 'LOK'
    } else if (nick === '7089') {
        nickname = 'JW'
    } else {
        alert("Wrong pin number!");
        promptMsg();
    }
};

promptMsg();


//........................................................................................

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.font = '30px Arial'
canvas.width = innerWidth
canvas.height = innerHeight

var dropBox = document.createElement("select");
dropBox.style.position = "absolute";
dropBox.style.left = "75%";
dropBox.style.top = "5%";
dropBox.setAttribute("id", "dropbox");
document.body.appendChild(dropBox);
if (nickname != "TCR") {
    dropBox.style.visibility = "hidden";
}


var h3P = document.createElement("h3");
h3P.style.position = "absolute";
h3P.style.left = "89%";
h3P.style.top = "2%";
h3P.innerHTML = "Pac Man = ";
h3P.style.color = "yellow";
document.body.appendChild(h3P);

var pacman = document.createElement("button");
pacman.style.position = "absolute";
pacman.style.left = "80%";
pacman.style.top = "5%";
pacman.innerHTML = "Make Pac-Man";
document.body.appendChild(pacman);
pacman.addEventListener('click', () => {
    socket.emit("makepacman", dropBox.value);
    h3P.innerHTML = "Pac Man = " + dropBox.value;
});
if (nickname != "TCR") {
    pacman.style.visibility = "hidden";
}

var h3B = document.createElement("h3");
h3B.style.position = "absolute";
h3B.style.left = "89%";
h3B.style.top = "7%";
h3B.innerHTML = "Blinky = ";
h3B.style.color = "red";
document.body.appendChild(h3B);

var blinky = document.createElement("button");
blinky.style.position = "absolute";
blinky.style.left = "80%";
blinky.style.top = "10%";
blinky.innerHTML = "Make blinky";
document.body.appendChild(blinky);
blinky.addEventListener('click', () => {
    socket.emit("makeblinky", dropBox.value);
    h3B.innerHTML = "Blinky = " + dropBox.value;
});
if (nickname != "TCR") {
    blinky.style.visibility = "hidden";
}

var h3Pi = document.createElement("h3");
h3Pi.style.position = "absolute";
h3Pi.style.left = "89%";
h3Pi.style.top = "12%";
h3Pi.innerHTML = "Pinky = ";
h3Pi.style.color = "pink";
document.body.appendChild(h3Pi);

var pinky = document.createElement("button");
pinky.style.position = "absolute";
pinky.style.left = "80%";
pinky.style.top = "15%";
pinky.innerHTML = "Make pinky";
document.body.appendChild(pinky);
pinky.addEventListener('click', () => {
    socket.emit("makepinky", dropBox.value);
    h3Pi.innerHTML = "Pinky = " + dropBox.value;
});
if (nickname != "TCR") {
    pinky.style.visibility = "hidden";
}

var h3I = document.createElement("h3");
h3I.style.position = "absolute";
h3I.style.left = "89%";
h3I.style.top = "17%";
h3I.innerHTML = "Inky = ";
h3I.style.color = "cyan";
document.body.appendChild(h3I);

var inky = document.createElement("button");
inky.style.position = "absolute";
inky.style.left = "80%";
inky.style.top = "20%";
inky.innerHTML = "Make inky";
document.body.appendChild(inky);
inky.addEventListener('click', () => {
    socket.emit("makeinky", dropBox.value);
    h3I.innerHTML = "Inky = " + dropBox.value;
});
if (nickname != "TCR") {
    inky.style.visibility = "hidden";
}

var gameStart = document.createElement("button");
gameStart.style.position = "absolute";
gameStart.style.left = "80%";
gameStart.style.top = "25%";
gameStart.innerHTML = "Game Start!";
document.body.appendChild(gameStart);
gameStart.addEventListener('click', () => {
    secs = 0;
    
});
if (nickname != "TCR") {
    gameStart.style.visibility = "hidden";
}


var gameRestart = document.createElement("button");
gameRestart.style.position = "absolute";
gameRestart.style.left = "80%";
gameRestart.style.top = "30%";
gameRestart.innerHTML = "Restart";
document.body.appendChild(gameRestart);
gameRestart.addEventListener('click', () => {
    socket.emit("restart", gameOver);
    /* alert(dropBox.value);
    alert("blinky"); */
});
if (nickname != "TCR") {
    gameRestart.style.visibility = "hidden";
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


class Boundary {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Player {
    constructor({ position, velocity, name, role }) {
        this.position = position
        this.velocity = velocity
        this.radius = 10
        //this.id = id
        this.name = name
        this.role = role
        //this.timer = timer

    }
    draw() {
        //secs = secs.toString()
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'grey'
        if (this.role === 'blinky') {
            c.fillStyle = 'red'
        }
        if (this.role === 'pinky') {
            c.fillStyle = 'pink'
        }
        if (this.role === 'inky') {
            c.fillStyle = 'cyan'
        }
        if (this.role === 'pacman') {
            c.fillStyle = 'yellow'
        }
        //console.log(this.name)
        //console.log(this.role)
        c.fill()
        c.closePath()
        c.strokeText(this.name, this.position.x - 12, this.position.y + 4)
        //c.fillText(secs.substring(0,2), 1000, 500)
        c.fillText(secs, 1000, 500)
    }
}

const map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', '-', ' ', '-', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', '-', ' ', '-', ' ', ' ', ' ', '-', ' ', '-', '-', ' ', ' ', ' ', '-', ' ', '-'],
    ['-', ' ', '-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', '-', ' ', '-', ' ', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', '-', ' ', '-', ' ', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', ' ', '-', '-', ' ', '-'],
    ['-', ' ', '-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', '-', ' ', '-', ' ', ' ', ' ', '-', ' ', '-', '-', ' ', ' ', ' ', '-', ' ', '-'],
    ['-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', '-', ' ', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]
const boundaries = []

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                })
                )
                break
        }
    })
})



//===============================================================================================

var socket = io();
socket.emit('newuser', nickname);
/* socket.on('timer', function(data) {
    secs = data;
    
}); */

/* socket.on('namelist', function (data) {
    data.forEach(name => {
        var opt = name;
        var el = document.createElement("option");
        el.textContent = opt;
        //el.value = opt;
        dropBox.appendChild(el);
    });
}); */

students.forEach(student => {
    var opts = student;
    var el = document.createElement("option");
    el.textContent = opts;
    //el.value = opt;
    dropBox.appendChild(el);

});


socket.on('newPositions', function (data) {
        c.clearRect(0, 0, canvas.width, canvas.height);
    
    

    var players = [];
    var ghost = [];

    for (var i = 0; i < data.length; i++) {
        //alert(data[i].number)
        //c.fillText(data[i].number, data[i].x, data[i].y);

        var player = new Player({
            position: {
                x: data[i].x,
                y: data[i].y
            },
            velocity: {
                x: data[i].spdX,
                y: data[i].spdY

            },
            id: data[i].id,
            name: data[i].nick,
            role: data[i].role
            //timer: data[i].timer

        })

        //console.log(players.length)
        /* if (players.length === 0) {
            players.push(player);

        } else {
            ghost.push(player)

        } */

        if (player.role === "blinky" || player.role === "pinky" || player.role === "inky") {
            ghost.push(player);
        } 
        if (player.role === "pacman") {
            players.push(player)
        }

        player.draw()

        boundaries.forEach((boundary) => {
            boundary.draw()

            if (player.position.y - player.radius + player.velocity.y
                <= boundary.position.y + boundary.height &&
                player.position.x + player.radius + player.velocity.x
                >= boundary.position.x &&
                player.position.y + player.radius + player.velocity.y
                >= boundary.position.y &&
                player.position.x - player.radius + player.velocity.x
                <= boundary.position.x + boundary.width) {
                //if collision happends
                player.velocity.x = 0
                player.velocity.y = 0

            }

        })

        //console.log(players[0].position.x)

        if (ghost.length < 3 || players.length === 0) {

        } else {
            console.log(ghost[0]);
            if (Math.hypot(
                players[0].position.x - ghost[0].position.x,
                players[0].position.y - ghost[0].position.y
            ) <
                players[0].radius + ghost[0].radius) {
                    socket.emit("gameover", gameOver);
                    alert(ghost[0].name + " caught " + players[0].name + "!");
            }
            if (Math.hypot(
                players[0].position.x - ghost[1].position.x,
                players[0].position.y - ghost[1].position.y
            ) <
                players[0].radius + ghost[1].radius) {
                    socket.emit("gameover", gameOver);
                    alert(ghost[1].name + " caught " + players[0].name + "!");
            }
            if (Math.hypot(
                players[0].position.x - ghost[2].position.x,
                players[0].position.y - ghost[2].position.y
            ) <
                players[0].radius + ghost[2].radius) {
                    socket.emit("gameover", gameOver);
                    alert(ghost[2].name + " caught " + players[0].name + "!");
            }
        }









        document.onkeydown = function (event) {
            if (event.keyCode === 68)
                socket.emit('keyPress', { inputId: 'right', state: true });
            else if (event.keyCode === 83)
                socket.emit('keyPress', { inputId: 'down', state: true });
            else if (event.keyCode === 65)
                socket.emit('keyPress', { inputId: 'left', state: true });
            else if (event.keyCode === 87)
                socket.emit('keyPress', { inputId: 'up', state: true });
        }

        document.onkeyup = function (event) {
            if (event.keyCode === 68)
                socket.emit('keyPress', { inputId: 'right', state: false });
            else if (event.keyCode === 83)
                socket.emit('keyPress', { inputId: 'down', state: false });
            else if (event.keyCode === 65)
                socket.emit('keyPress', { inputId: 'left', state: false });
            else if (event.keyCode === 87)
                socket.emit('keyPress', { inputId: 'up', state: false });
        }

    }

});








