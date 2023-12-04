const socket = io("http://localhost:5000", { transports: ["websocket"] });


// DOM elements in respective JS Variables
const messageContainer = document.querySelector('.container');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const sendBtn = document.querySelector('.btn');

//Audio files
let audio1 = new Audio('/sound/sound1.mp3'); //on receiving messages
let audio2 = new Audio('sound/sound2.mp3'); //on send button

// Function which will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio1.play();
    };
};

// Sends message to the server, if the form/message gets submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
});

//AudioPlay on send Button
function audioFunction() {
    sendBtn .addEventListener('click', (audioFunction) => {
        audioFunction = audio2.play();
    });
};

//Lets the server know the name of the user at the time of joining the chat
const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

// Receiving events from the server below-

// The name of the user on the left side of the chat
socket.on('user-joined', name => {
    append(`${name} Joined the chat`, "left")
});

//Receiving messages on left side
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');

});

//When a user leaves the chat
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});