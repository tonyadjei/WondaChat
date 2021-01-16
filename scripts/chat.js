//to do
//add new documents
//set up a real time listener to get new chats
//update the username
//update the room

class Chatroom {
    constructor(channel, username){
        this.channel = channel;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format is a chat object(to be able to store in firebase)
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            channel: this.channel,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save chat document to database
        const response = await this.chats.add(chat); //takes some time and will return a promise when resolved, so just set a variiable to its result
        return response;
    }

    getChats(callback){
        this.unsub = this.chats
            .where('channel', '==', this.channel) //method for filtering documents to retrieve from a collection(takes 3 arguments, the field, the conditional operator to use and the actual value you are checking against, all go in qoutes)
            .orderBy('created_at') //this orders the documents by the particular field specified in its argument. NB: when you do this, you will get an error from firebase, (it will want you to do some configurations on the collection by creating an index first) 
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //update UI
                        callback(change.doc.data());
                    }
                })
            })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateChannel(channel){
        this.channel = channel;
        console.log('chatroom updated');
        if(this.unsub){
            this.unsub();
        }
    }
}