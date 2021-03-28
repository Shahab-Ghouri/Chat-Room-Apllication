const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updatedtext = document.querySelector(".pop-up");
const chatRooms = document.querySelector(".chat-rooms");
var btns = chatRooms.getElementsByClassName("btn");

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addchat(message)
    .then(() => {
      console.log("Chat Added");
      newChatForm.reset();
    })
    .catch((err) => console.log("errorrr"));
});

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();

  // show the hidden message
  updatedtext.innerText = ` Your Name was Successfully updated! ${newName}`;
  setTimeout(() => {
    updatedtext.innerText = " ";
  }, 3000);
});

// update Room
chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    if(e.target.id == "gaming"){
      document.getElementById("general").style.backgroundColor = "blue";
      document.getElementById("music").style.backgroundColor = "blue";
      e.target.style.backgroundColor = "red";
    }
    else if(e.target.id == "general"){
      document.getElementById("gaming").style.backgroundColor = "blue";
      document.getElementById("music").style.backgroundColor = "blue";
      e.target.style.backgroundColor = "red";
    }
    else if(e.target.id == "music"){
      document.getElementById("general").style.backgroundColor = "blue";
      document.getElementById("gaming").style.backgroundColor = "blue";
      e.target.style.backgroundColor = "red";
    }
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChat((data) => chatUI.render(data));
  }
});


const username = localStorage.username ? localStorage.username : "Anonymous";
// connecting classes
const chatroom = new Chatroom("general", username);
const chatUI = new ChatUI(chatList);

myfunction();
function myfunction(){
    
    if(prompt("Enter Password : ","")=="admin"){
      document.getElementById("general").style.backgroundColor = "red";
        chatroom.getChat((data) => {
            chatUI.render(data);
          });
          
    }
    else{
        alert("Please Enter Correct Password");
        myfunction();
    }
}
