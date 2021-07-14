const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chat = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');
const chatWindow = document.querySelector('.chat-window');

const renderMessage = message => {
    const div = document.createElement('div')
    div.classList.add('render-message');
    div.innerText = message;
    chatWindow.appendChild(div);
}
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

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    renderMessage(message);
})
