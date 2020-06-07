let questionPool = [{
      text: 'Which of the following is NOT one of the 5 French "Mother Sauces" as coined by Chef Auguste Escoffier in his cookbook "Le guide culinaire".',
      choices: ['Aioli ("garlic and oil sauce")', 'Béchamel ("white sauce")', 'Espagnole ("brown sauce")', 'Tomate ("tomatoe sauce")'],
      answer: 'Aioli ("garlic and oil sauce")'
     	},
      {
      	text: 'You are unfortunate enough to have Allium intolerance, which of the following ingredients must you avoid?',
      	choices: ['Onions', 'Endives', 'Bluefin Tuna', 'Flour'],
        answer:'Onions'
      },
      {
      	text: 'There are four major flavour types of Japanese ramen, they are:',
      	choices: ['Shio, Shoyu, Miso, Tonkotsu', 'Tantanmen, Shoyu, Miso, Tonkotsu', 'Dashi, Maguro, Miso, Tonkotsu', 'Tantanmen, Gomtang, Laksa, Tonkotsu'],
        answer: 'Shio, Shoyu, Miso, Tonkotsu'
      },

      {
      	text: 'Hainanese chicken rice is a dish consisting of ____ chicken and is usually garnished with chilled ____ and served with ____ sauce.',
      	choices: ['poached/simmered, cucumber, chili', 'wok-fried, bean sprouts, soy', 'hard boiled, tomatoes, sesame vinaigarette ', 'Seasoned and Roasted, peppers, Hoisin'],
        answer:'poached/simmered, cucumber, chili'
      },
      {
      	text: 'Al pastor is made with what animal, and was brought to which region by Lebanese immigrants?',
      	choices: ['pork, Central Mexico', 'pork, Central Andes Bolivia', 'chicken, Patagonian Steppe Argentina', 'chicken, Baja California Mexico'],
        answer: 'pork, Central Mexico'
      }
  ];

let currentQuestionIndex = 0;
let currentScore = 0;

function displayQuestion() {
    const testing = "inside displayQuestion";
    const question = questionPool[currentQuestionIndex];
    let choices = shuffleQuestions(question.choices);
    let html = `<h2 class="item">${question.text}</h2>
    <form class= "quiz-form item" name="quiz-form">
            <input type="radio" name="quiz-choice" value="${choices[0]}"> <label for="choice1">${choices[0]}</label><br>
            <input type="radio" name="quiz-choice" value="${choices[1]}"> <label for="choice2">${choices[1]}</label><br>
            <input type="radio" name="quiz-choice" value="${choices[2]}"> <label for="choice3">${choices[2]}</label><br>
            <input type="radio" name="quiz-choice" value="${choices[3]}"> <label for="choice4">${choices[3]}</label><br>
            <button class="submit" type="button"> <label for="submit">Submit</label></button>
    </form>
    <h3 class="item">Question ${currentQuestionIndex+1} out of ${questionPool.length}</h3>
    `;

    $('.question').append(html);
}

function submitAnswer() {
    $('.submit').on('click', function(event) {
        let questionAnswer = questionPool[currentQuestionIndex].answer;
        let userAnswer = $('input[name="quiz-choice"]:checked').next().html();

        if (userAnswer == questionAnswer){
            currentScore++;
            $('.question').children().remove();
            $(".answer").append(`<p>Correct! Your current score is ${currentScore}<\p><button class="next" type="button">Next</button>
            `);
        }else if(Boolean(userAnswer)==false){
            alert("please select an answer to continue");
            return;
        }else{
            $('.question').children().remove();
            $(".answer").append(`<p>Wrong! The correct answer is ${questionAnswer}.\nYour current score is ${currentScore} <\p><button class="next" type="button">Next</button>
            `);
        }
        currentQuestionIndex ++;
        nextQuestion();
    });
};

function nextQuestion() {
    $('.next').on('click',function(event){
        if(currentQuestionIndex == questionPool.length){
            $('.answer').children().remove();
            $(".result").append(`
            <p>Congrats, you finished! your total score was ${currentScore}</p>
            <button class="reset">Try Again!</button>
            `);
            console.log("current index: " + currentQuestionIndex);
            reset();

        }else{
            $('.answer').children().remove();
            displayQuestion();
            submitAnswer();
            nextQuestion()

        }
    });
};

function reset(){
    $('.result').on('click', function(event){
        $('.result').children().remove();
        currentScore = 0;
        currentQuestionIndex = 0;
        displayQuestion();
        submitAnswer();
        nextQuestion();
    });
};

function shuffleQuestions(array) {
  return array.sort(() => Math.random() - 0.5);
}

const bootup = function(){
    $(".container").hide();
    shuffleQuestions(questionPool);
    $('.startQuiz').on('click', function(event){
        $(".container").show();
        $('.intro').hide( )
        displayQuestion()
        submitAnswer()
        nextQuestion()
    });
};

$(bootup);
