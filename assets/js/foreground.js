//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy

/* <<< program by it's self >>> */


//start
giveAnswer();
//Now we create empty array cacheQuest to store our current question
cacheQuest = [];
//fill array
// if check equals true that mean we already give an answer and we can execute our script
// but if check equals false we need to wait until site script will be fully executed
check = false;
checkAnswers = document.getElementsByClassName(" answer");
for (const item of checkAnswers) {
    if(item.className == "correct answer" || item.className == "answer correct"){
        check = true;
    }
}

if(check){
    readId();
    readQuestion();
    readAnswers();
    readExplanation();
    //send it to background
    console.log("sending array:");
    console.log(cacheQuest);
    chrome.storage.local.set({"cacheQuest": cacheQuest});
    chrome.runtime.sendMessage({message: '200: cacheQuest sended'}, res => {
        console.log(res)
        NextQuestion();
    });
} else {
    //we simply add trigger on class name of first question, if it changed that mean script fully executed 
    addClassNameListener(" answer", function(){ 
        readId();
        readQuestion();
        readAnswers();
        readExplanation();
        //send it to background
        console.log("sending array:");
        console.log(cacheQuest);
        chrome.storage.local.set({"cacheQuest": cacheQuest});
        chrome.runtime.sendMessage({message: '200: cacheQuest sended'}, res => {
            console.log(res)
            NextQuestion();
        });
    });
}
//go to the next question
//NextQuestion();
//end


/* <<< functions zone >>> */
/* !!! Next 3 functions work with cacheQuest variable !!! */
//Find question
function readId(){
    id = document.getElementsByTagName("h3")[0].innerText;
    idParts = id.split('.');
    id = idParts[0];
    id += "."
    for (let i = 1; i < idParts.length; i++) {
        if(!!isNaN(parseFloat(idParts[i]))){
            break;
        }        
        id += idParts[i] + ".";
    }
    (id != null) ? (cacheQuest.push(id)) : (console.log("ERROR: ID Does not exist"));
}

function readQuestion() {
    quest = document.getElementsByClassName("block1 margin-bottom")[0].getElementsByTagName("b")[0];
    (quest != null) ? (cacheQuest.push(quest.innerText)) : (console.log("ERROR: Have no questions"));
}

//Find answers
function readAnswers() {
    answers = document.getElementsByClassName(" answer");
    for (let i = 0; i < answers.length; i++) {
        (answers[i] != null) ? (cacheQuest.push(((answers[i].className == "correct answer" || answers[i].className == "answer correct" )?("+"):("-")) + answers[i].innerText.trim())) : (console.log("ERROR: Have no answers"));
        console.log(answers[i].getAttribute("class"))
    }
}

//Find explanation
function readExplanation() {
    explanation = (document.getElementsByClassName("incorrect_examContainer")[0] != null)?(document.getElementsByClassName("incorrect_examContainer")[0]):(document.getElementsByClassName("correct_examContainer")[0]);
    (explanation != null) ? (cacheQuest.push(explanation.innerText)) : (console.log("ERROR: Have no explanation"));
}

/* These functions do nothing with variables cos they just push da buttons */
//click on first answer and submit it
function giveAnswer () {
    (document.getElementsByClassName(" answer")[0] != null)?(document.getElementsByClassName(" answer")[0].click()):(console.log("ERROR: Have no buttons with answers"));
    (document.getElementsByClassName("_verifyAnswer")[0] != null)?(document.getElementsByClassName("_verifyAnswer")[0].click()):(console.log("ERROR: Have no submit answer button"));
}

//check button with current question and choose the next question
function NextQuestion(){
    console.log("trying to go on new page");
    check = false;
    for (const item of document.getElementById("questionCardsContainer").children) {
        if(check){
            item.click();
            check = false;
            break;
        }
        if(item.getAttribute("href").startsWith("#")){
            check = true;
        }
        if(check){
            document.getElementsByClassName("btn _qnav")[document.getElementsByClassName("btn _qnav").length-1].click();
        }
    }
}

function addClassNameListener(elemClass, callback) {
    var elem = document.getElementsByClassName(elemClass)[0];
    var lastClassName = elem.className;
    window.setInterval( function() {   
       var className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10);
}