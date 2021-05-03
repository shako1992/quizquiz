
const finalscore =document.getElementById(`finalscore`);
const mostRecentScore =localStorage.getItem(`mostRecentScore`);
finalscore.innerText = (`${`თქვენ სწორად უპასუხეთ `}`+mostRecentScore +"  შეკითხვას");
