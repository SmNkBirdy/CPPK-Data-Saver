//ВЫБОР ПЕРВОГО ВОПРОСА И ОТВЕТ
//document.getElementsByClassName("test-checkbox")[0].checked = true;
document.getElementsByClassName(" answer")[0].click();
(document.getElementsByClassName("_verifyAnswer")[0] != null)?document.getElementsByClassName("_verifyAnswer")[0].click():console.log("Ответ уже сделан");

//ЧТЕНИЕ ВСЕГО ЭТОГО
console.log("Чтение вопросов и ответов");
quest = document.getElementsByTagName("h3")[0];
console.log((quest != null)?quest.innerText:"вопрос не найден")
answ = document.getElementsByClassName(" answer");
for (let i = 0; i < answ.length; i++) {
    console.log((answ[i] != null)? ((answ[i].className == "correct answer")? "+ ":"- ") + answ[i].innerText.trim() :"ответ не найден")
}
explanation = document.getElementsByClassName("incorrect_examContainer")[0];
explanation = (explanation == null)? document.getElementsByClassName("correct_examContainer")[0] : explanation
console.log((explanation != null)? explanation.innerText:"Описания нет");
//ПЕРЕХОД НА СЛЕДУЮЩИЙ
check = false;
/*
for (const item of document.getElementById("questionCardsContainer").children) {
    if(check){
        item.click();
        break;
    }
    if(item.getAttribute("href").startsWith("#")){
        check = true
    }
}*/
  