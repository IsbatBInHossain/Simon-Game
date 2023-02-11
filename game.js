const colors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let index = 0;
let gamePattern = [];
const randColor = () => {
    let randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}
const playSound = (btn) => {
    let beat = new Audio("sounds/" + btn + ".mp3");
    beat.play();
}
const gameAnim = (color) => {
    let cls = "." + color;
    $(cls).animate({ opacity: 0 }, "fast").animate({ opacity: 100 }, "fast");
}
const newGame = () => {
    wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over").delay(200).queue(function () {
        $(this).removeClass("game-over").dequeue();
    });
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
    index = 0;
    gamePattern = [];
    userClickedPattern = [];
}
const checkAnswer = (ind) => {
    if (userClickedPattern[ind] === gamePattern[ind]) {
        if (ind === (gamePattern.length - 1)) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        newGame();

    }
};
const nextSequence = () => {
    index = 0;
    userClickedPattern = [];
    gamePattern.push(randColor());
    console.log(gamePattern);
    playSound(gamePattern[level]);
    gameAnim(gamePattern[level]);
    level++;
    $("h1").text("Level " + level);
}

$(document).keydown(() => {
    if (level === 0) {
        nextSequence();
    }
});

$(".btn").click((event) => {
    if (level != 0) {
        userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        console.log("user input: " + userClickedPattern);
        checkAnswer(index);
        index++;
        playSound(userChosenColor);
        gameAnim(userChosenColor);
        $("#" + userChosenColor).addClass("pressed").delay(100).queue(function () {
            $(this).removeClass("pressed").dequeue();
        });
    }
})
