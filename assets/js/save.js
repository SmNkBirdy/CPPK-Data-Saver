//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy
chrome.storage.local.get("allQuests", value => {
    data = ""
    console.log(value['allQuests']);
    for (const quest of value['allQuests']) {
        data += "@" + quest[1] + "\n";
        i = 2;
        while (quest[i].startsWith("+") || quest[i].startsWith("-")) {
            if(quest[i].startsWith("+")){
                data += "!" + quest[i].substring(1) + "\n";
            }else{
                data += "~" +quest[i].substring(1) + "\n";
            }
            i++;
        }
        data += "[" + quest[i] + "\n]\n#\n"
    }

    filename = "данные.txt"
    type = "text"
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
});