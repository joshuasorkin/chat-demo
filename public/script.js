const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chat = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const chatWindow = document.querySelector('.chat-window');
const username = document.querySelector('.username-form');
const usernameInput = document.querySelector('.username-input');

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

    if(usernameSubmitted.value===""){
        document.querySelector('.username-error').value="Cannot send message with blank username"
    }
    else{
        /*send an event called 'chat' to server-side socket
        carrying the submitted chat message*/
        socket.emit('chat',usernameInput.value+": "+chatInput.value);
        //reset chat input field to blank once the message has been sent
        input.value = '';
    }
});

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
})
