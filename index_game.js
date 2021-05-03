const question = document.getElementById(`question`);
const choices = Array.from(document.getElementsByClassName(`choice-text`));
const progrestext = document.getElementById(`progrestext`);
const scoretext = document.getElementById(`score`)
const progresbarfull = document.getElementById(`progresbarfull`);

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];



let questions=[];
fetch("https://opentdb.com/api.php?amount=10&type=multiple")
.then(res => {
    return res.json();
}).then(load =>{
      questions = load.results.map(load => {
        const fomatedquestion = {
         question: load.question
        };
        const answerchoices =[... load.incorrect_answers];
        fomatedquestion.answer =Math.floor(Math.random() * 3) + 1;
        answerchoices.splice(fomatedquestion.answer -1, 0,
            load.correct_answer );
        answerchoices.forEach((choice, index,) =>{
            fomatedquestion[`choice` + (index+1)] =choice;
        })
        return fomatedquestion;
    });
    //questions=load;
    startGame();
})
.catch(err =>{
    console.log(err);
})
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;
  
 startGame = ()=>{
  
     questionCounter = 0;
      availableQuestion = [...questions]
      getNewQuestion()
 }


getNewQuestion = () =>
{
   if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
       localStorage.setItem(`mostRecentScore`,score);
       return window.location.assign(`/index_end.html`);
    }
    questionCounter++;
    progrestext.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progresbarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questinIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questinIndex];
    question.innerText=currentQuestion.question;
    choices.forEach(choice =>{
        const number = choice.dataset[`number`];
        choice.innerText = currentQuestion[`choice` + number]
    })
    availableQuestion.splice(questinIndex,1);
    acceptingAnswer = true
};
choices.forEach(choice =>{
    choice.addEventListener(`click`, e =>{
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedchois = e.target;
        const selectedanswer = selectedchois.dataset[`number`];
        const classtoApply = selectedanswer == currentQuestion.answer ? `correct`
        : `incorrect`;
        if(classtoApply===`correct`){
            incrementscore(CORRECT_BONUS)
        }
        selectedchois.parentElement.classList.add(classtoApply);
        setTimeout(()=>{
            selectedchois.parentElement.classList.remove(classtoApply);
            getNewQuestion()
        },1000)
    })
});
incrementscore= num =>{
    score += num;
    scoretext.innerText = score;
};


