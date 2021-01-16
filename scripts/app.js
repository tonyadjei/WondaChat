// dom queries
const list = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const nameMessage = document.querySelector('.update-mssg');


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

//check local storage for a name
const username = localStorage.username ? localStorage.username: 'anon';

// class instsances
const chatUI = new ChatUI(list);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));