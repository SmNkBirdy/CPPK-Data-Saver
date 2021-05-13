//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy
//to get debug of our background you need to go to extensions page and find a background page.
/* << program zone >> */
// create an empty array to store all the quests
var allQuests = [];
chrome.storage.local.set({"allQuests": allQuests});
// create bool to indicate current state
let extensionState = false;
chrome.storage.local.set({"extensionState": false});
/* << listeners zone >> */
//listener bump our script every time we load page with needed url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.get(tabId, current_tab_info => {
        if(changeInfo.status == "complete"){
            console.log("loaded page url: " + current_tab_info.url);
            console.log("current state: ", (extensionState)? "enabled" : "disabled")
            if("file:///C:/Users/QuirkyBirdy/Desktop/newExtention/test.html" == current_tab_info.url && extensionState){
                chrome.tabs.executeScript(tabId, {file: "./assets/js/foreground.js"}, () => console.log('foreground injected'));
            }
        }
    });
});

// listener that gets a cacheArray from foreground and save it in local variable and check program state from popup menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === '200: cacheQuest sended') {
        //get our quests
        chrome.storage.local.get("cacheQuest", value => {
            allQuests.push(value['cacheQuest']);
            chrome.storage.local.set({"allQuests": allQuests});
            chrome.runtime.sendMessage({message: '200: questions updated'});
            //debug our variables
            console.log("cacheQuests:");
            console.log(value['cacheQuest']);
            console.log("allQuests:");
            console.log(allQuests);
        });
        sendResponse({message: "200: message received"})
    } else if (request.message === '101: state changed') {
        //change program state
        chrome.storage.local.get("extensionState", value => {
            extensionState = value['extensionState'];
            console.log("change current state to: ", (extensionState)? "enabled" : "disabled");
            chrome.tabs.query({currentWindow: true, active : true}, function(tabArray){
                if(tabArray[0] != null){
                    chrome.tabs.get(tabArray[0]['id'], current_tab_info => {
                        console.log("loaded page url: " + current_tab_info.url);
                        console.log("current state: ", (extensionState)? "enabled" : "disabled")
                        if("file:///C:/Users/QuirkyBirdy/Desktop/newExtention/test.html" == current_tab_info.url && extensionState){
                            chrome.tabs.executeScript(tabArray[0]['id'], {file: "./assets/js/foreground.js"}, () => console.log('foreground injected'));
                        }
                    });
                }
            })

        });
        sendResponse({message: "200: state changed successfully"})
    } else if (request.message === '200: clear quests') {
        var allQuests = [];
        chrome.storage.local.set({"allQuests": allQuests});
        chrome.runtime.sendMessage({message: '200: questions updated'});
    } else if (request.message === '200: save quests') {
        chrome.tabs.query({currentWindow: true, active : true}, function(tabArray){
            if(tabArray[0] != null){
                chrome.tabs.executeScript(tabArray[0]['id'], {file: "./assets/js/save.js"}, () => console.log('save injected'));
            }
        })
    }
});
/* << functions zone >> */