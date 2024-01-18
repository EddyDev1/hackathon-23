/*function load_page(p) { //loads the pages but will have to change 
  if(p=='H'){
     document.getElementById("content").innerHTML='<object type="text/html" data="index.html" ></object>';
  } else if(p=='C'){
    document.getElementById("content").innerHTML='<object type="text/html" data="chatbot.html" ></object>';
  } else if(p=='G'){
    document.getElementById("content").innerHTML='<object type="text/html" data="gameidea.html" ></object>';
  } else if(p=='S'){
    document.getElementById("content").innerHTML='<object type="text/html" data="anotheridea.html" ></object>';
  } else {
    document.getElementById("content").innerHTML='<object type="text/html" data="aboutai.html" ></object>';
  }
}*/

// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "How's it going?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

let total = 0;
function getBotResponse(input) {
  //regex to identify common cases
  const laughPat = new RegExp("lol", "i");
  const greetPat = new RegExp("hello", "i");
  const leavePat = new RegExp("bye", "i");
  const condPat = new RegExp("fine", "i");
  const condPat2 = new RegExp("nothing", "i");
  const condPat3 = new RegExp("ok", "i");

  //rock paper scissors game vars
  let winResp = "You still think you can beat me huh?";
  let loseResp = "I reset the score. I felt bad.. Lets do something else yea?";
  let win2Resp = "Try changing your strategy or else I will continue to run up the score >:)";
  let errResp = "Try asking something else. I am not that advance at the moment.";
  let playResp = " You can also play rock paper scissors with me! To play type your choice";
  if(total>=10) {total = 0; return loseResp;}

    //play rock paper scissors
    if (input == "rock") {
        total++;
      if(total==3){ 
        return winResp + " Paper. I am up " + total + "-0!"; 
      } else if(total==6){ 
        return win2Resp + " Paper. I am up " + total + "-0!"; 
      } else return " Paper. I am up " + total + "-0!";
    } else if (input == "paper") {
        total++;
      if(total==3) return winResp + " Scissors. I am up " + total + "-0!";
      else if(total==6) return win2Resp + " scissors. I am up " + total + "-0!";
      else return " scissors. I am up " + total + "-0!";
    } else if (input == "scissors") {
        total++;
      if(total==3) return winResp + " Rock. I am up " + total + "-0!";
      else if(total==6) return win2Resp + " rock. I am up " + total + "-0!";
      else return "rock. I am up " + total + "-0!";
    }

    //responses
    if (greetPat.test(input)) {
        return "Hello there!";
    } else if (leavePat.test(input)) {
        return "Talk to you later!";
    } else if(input == "Tell me a fun fact!"){
      return "Okay! Did you know that it takes about 364 licks to get to the center of a Tootsie Pop? Cool!";
    } else if(input == "Tell me another fun fact"){
      return "Okay! Did you know that the National Society of Black Engineers was created to increase the number of culturally responsible black engineers who excel academically, succeed professionally, and positively impact the community?";
    } else if(laughPat.test(input)){
      return "Ha ha! Whats so funny??!";
    } else if(condPat.test(input)){
      return "I am glad to hear that!";
    } else if(condPat2.test(input) || condPat3.test(input)){
      return "ok";
    } else {
      return errResp + playResp;
    }
}
//end of chat bot code