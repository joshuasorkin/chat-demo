const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chat = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const chatWindow = document.querySelector('.chat-window');
const username = document.querySelector('.username-form');
const usernameInput = document.querySelector('.username-input');
const usernameSubmitted = document.querySelector('.username-submitted');
const usernameResponse = document.querySelector('.username-response');

const renderMessage = message => {
    const div = document.createElement('div')
    div.classList.add('render-message');
    div.innerText = message;
    chatWindow.appendChild(div);
}
//add event listener to chat submit button
chat.addEventListener('submit',event =>{
    //prevent page from reloading on form submission
    event.preventDefault();

    if(usernameSubmitted.value===undefined){
        document.querySelector('.chat-error').innerText="Cannot send message with blank username."
    }
    else{
        /*send an event called 'chat' to server-side socket
        carrying the submitted chat message*/
        /*todo: username should be stored server-side and accessed through session token, so that
        username can't be forged with client-side modification of this socket.emit() call*/
        socket.emit('chat',usernameInput.value+": "+chatInput.value);
        //reset chat input field to blank once the message has been sent
        chatInput.value = '';
    }
});

//add event listener to username submit button
//todo: some of the code overlaps with chat.addEventListener()
//so maybe it can be refactored into a common addEventListenerToSubmit() function?
username.addEventListener('submit',event =>{
    //prevent page from reloading on form submission
    event.preventDefault();
    var usernameToSubmit=usernameInput.value;
    //check if username is blank
    if (usernameToSubmit===undefined||usernameToSubmit.trim().length===0){
        document.querySelector('.chat-error').innerText="Submitted username cannot be blank."
    }
    else{
        /*send an event called 'submitUsername' to server-side socket
        carrying the submitted username for proposed change*/
        socket.emit('submitUsername',usernameInput.value);
        //reset chat input field to blank once the message has been sent
        chatInput.value = '';
    }

})

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
})

//add event listener for receiving 'username_update' message from server
socket.on('username_update',message=>{
    usernameResponse.innerText=message;
    if(socket.hasOwnProperty("username")){
        usernameSubmitted.innerText=socket.username;
    }
})
