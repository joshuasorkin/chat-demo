const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chat = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');

//add event listener to submit button
chat.addEventListener('submit',event =>{
    //prevent page from reloading on form submission
    event.preventDefault();
    /*send an event called 'chat' to server-side socket
    carrying the submitted chat message*/
    socket.emit('chat',input.value);
    //reset chat input field to blank once the message has been sent
    input.value = '';
});

