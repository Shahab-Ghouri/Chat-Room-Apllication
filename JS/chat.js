// whenever class is used in JS, constructor is must and arguments are also necessary
class Chatroom {
  constructor(room, username) {
    // creting variables
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  // to send the message to firebase which is asynchronous function

  async addchat(message) {
    const now = new Date(); // this will give the current time
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  // to fetch data from the firebase

  getChat(callBack) {
    this.unsub = this.chats
      .where("room", "==", this.room) // first argument is of firebase and "where " is used for database
      .orderBy("created_at") // brings the data in order of time
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callBack(change.doc.data());
          }
        });
      });
  }
  // updating name
  updateName(username) {
    this.username = username;
    localStorage.setItem("username",username);    // to strore the name to storage of browser
  }
  // updating room
  // if you want to update room, you have to unsubscribe/ break connection from firebase
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if(this.unsub){
      this.unsub();
    }
  }
}
// ************XXXXXX*****************





// let chatroom = new Chatroom("music", "ALi"); // creating object of class

// chatroom.updateName("Ghouri");
// chatroom.updateRoom("gaming");

// console.log(chatroom);

// calling of addChat
// chatroom
//   .addchat("Hello my name is shahab")
//   .then(() => {
//     console.log("Chat Added");
//   })
//   .catch((err) => {
//     console.log("errorr");
//   });

// chatroom.getChat((data) => {
//   console.log(data);
// });
