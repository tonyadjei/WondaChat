// dom queries
const list = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const nameMessage = document.querySelector('.update-mssg');
const chatRooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

// update username
updateNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = updateNameForm.name.value.trim();
    chatroom.updateName(newName);
    updateNameForm.reset();
    nameMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => nameMessage.innerText = '', 3000);
});

//update the chat rooms
chatRooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateChannel(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username: 'anon';

// class instsances
const chatUI = new ChatUI(list);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));


//NOTE: when using event delegation, always use an if statement with at 'e.target.tagName' to check
// if the event occurred on the element you want.