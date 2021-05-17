//my english is broken OwO
//made by QuirkyBirdy btw
//https://github.com/SmNkBirdy
chrome.storage.local.get("allQuests", value => {
    data = ""
    console.log(value['allQuests']);
    for (const quest of value['allQuests']) {
        data += "insert into table1 (id, question, answer1, answer2, answer3, answer4, answer5, explanation, correctanswer) values ("
        data += '"' + quest[0] + '", "' + quest[1] + '"';
        i = 2;
        correctAnsw = "";
        while (quest[i].startsWith("+") || quest[i].startsWith("-")) {
            if(quest[i].startsWith("+")){
                correctAnsw += quest[i] + " ";
                data += ', "' + quest[i].substring(1);
            }else{
                data += ', "' + quest[i].substring(1);
            }
            i++;
        }
        for (let l = i; l < 7; l++) {
            data += ', ""';
        }
        data += ', "' + quest[i] + '");';
    }

    filename = "данные.sql"
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