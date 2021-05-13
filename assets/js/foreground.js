//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy

/* <<< program by it's self >>> */


//start
giveAnswer();
//Now we create empty array cacheQuest to store our current question
cacheQuest = [];
//fill array
readQuestion();
readAnswers();
readExplanation();
//send it to background
console.log("sending array:");
console.log(cacheQuest);
chrome.storage.local.set({"cacheQuest": cacheQuest});
chrome.runtime.sendMessage({message: '200: cacheQuest sended'}, res => console.log(res));
//go to the next question
NextQuestion();
//end


/* <<< functions zone >>> */
/* !!! Next 3 functions work with cacheQuest variable !!! */
//Find question
function readQuestion() {
    quest = document.getElementsByTagName("h3")[0];
    (quest != null) ? cacheQuest.push(quest.innerText) : console.log("ERROR: Have no questions");
}

//Find answers
function readAnswers() {
    answers = document.getElementsByClassName(" answer");
    for (let i = 0; i < answers.length; i++) {
        (answers[i] != null) ? cacheQuest.push(((answers[i].className == "correct answer")? "+":"-") + answers[i].innerText.trim()) : console.log("ERROR: Have no answers");
    }
}

//Find explanation
function readExplanation() {
    explanation = (document.getElementsByClassName("incorrect_examContainer")[0] != null)?document.getElementsByClassName("incorrect_examContainer")[0]:document.getElementsByClassName("correct_examContainer")[0];
    (explanation != null) ? cacheQuest.push(explanation.innerText) : console.log("ERROR: Have no explanation");
}

/* These functions do nothing with variables cos they just push da buttons */
//click on first answer and submit it
function giveAnswer () {
    (document.getElementsByClassName(" answer")[0] != null)?document.getElementsByClassName(" answer")[0].click():console.log("ERROR: Have no buttons with answers");
    (document.getElementsByClassName("_verifyAnswer")[0] != null)?document.getElementsByClassName("_verifyAnswer")[0].click():console.log("ERROR: Have no submit answer button");
}

//check button with current question and choose the next question
function NextQuestion(){
    check = false;
    for (const item of document.getElementById("questionCardsContainer").children) {
        if(check){
            item.click();
            break;
        }
        if(item.getAttribute("href").startsWith("#")){
            check = true
        }
    }
}