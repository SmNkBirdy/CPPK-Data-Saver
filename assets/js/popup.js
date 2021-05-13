//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy
/* << program zone >> */
allQuests = [];
currentQuest = 0;
updatePage();

/* << listeners zone >> */
document.getElementById("stateLabel").addEventListener('click', () => {
    changeState();
});

document.getElementById("first").addEventListener('click', () => {
    loadQuest(0);
});

document.getElementById("last").addEventListener('click', () => {
    loadQuest(allQuests.length - 1);
});

document.getElementById("previous").addEventListener('click', () => {
    loadQuest((currentQuest - 1 >= 0)? currentQuest - 1: currentQuest);
});

document.getElementById("next").addEventListener('click', () => {
    loadQuest((currentQuest + 1 < allQuests.length)? currentQuest + 1: currentQuest);
});

document.getElementById("close").addEventListener('click', () => {
    window.close();
});

document.getElementById("clearButton").addEventListener('click', () => {
    chrome.runtime.sendMessage({message: '200: clear quests'}, res => console.log(res));
});

document.getElementById("saveButton").addEventListener('click', () => {
    chrome.runtime.sendMessage({message: '200: save quests'}, res => console.log(res));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === '200: questions updated') {
        chrome.storage.local.get("allQuests", value => {
            allQuests = value['allQuests'];
            document.getElementById('first').innerText = 1;
            document.getElementById('last').innerText = allQuests.length;
            loadQuest(0);
        });
    }
});

/* << function zone >> */
//change state of program and send it to background
function changeState(){
    console.log("change extension state")
    chrome.storage.local.set({"extensionState": document.getElementById("stateCheckBox").checked});
    chrome.runtime.sendMessage({message: '101: state changed'}, res => console.log(res));
}
//take information from storage and apply it to the page
function updatePage(){
    chrome.storage.local.get("extensionState", value => {
        document.getElementById("stateCheckBox").checked = value['extensionState'];
    });
    chrome.storage.local.get("allQuests", value => {
        allQuests = value['allQuests'];
        document.getElementById('first').innerText = 1;
        document.getElementById('last').innerText = allQuests.length;
        loadQuest(0);
    });
    console.log("page updated!");
}

function loadQuest(a){
    document.getElementById('current').innerText = a + 1;
    if(allQuests.length > a){
        document.getElementById('question').innerText = allQuests[a][0];
        i = 1;
        document.getElementById('answers').innerHTML = "";
        while (allQuests[a][i].startsWith("+") || allQuests[a][i].startsWith("-")) {
            if (allQuests[a][i].startsWith("+")) {
                document.getElementById('answers').innerHTML += "<span>"+ allQuests[a][i]+ "</span><br>";
            } else {
                document.getElementById('answers').innerHTML += allQuests[a][i] + "<br>";
            }
            i++;
        }
        document.getElementById('explanation').innerText = allQuests[a][i];
        currentQuest = a;
    }
}