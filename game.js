
var game_pattern = [];
var user_clicked_pattern = [];

function nextSequence() {
    var color = ["red", "blue", "green", "yellow"];
    var random_number = Math.floor(Math.random() * 4);
    play_fade(color[random_number]);
    play_sound(color[random_number]);
    return color[random_number];
}

function play_fade(color) {
    $("#"+color).fadeOut()
    $("#"+color).fadeIn()
}

function play_sound(color) {
    var audio = new Audio("sounds/"+color+'.mp3')
    audio.play()
}


function animatePress(color) {
    $("#" + color).addClass('pressed');
    setTimeout(function() {
        $("#" + color).removeClass('pressed');  
    }, 100)
}

function checkLevel(level) {
    console.log(user_clicked_pattern)
    console.log(game_pattern)
    return game_pattern[level] == user_clicked_pattern[level];
}



$(".btn").click(function (event) {
    var user_clicked_color = this.id;
    animatePress(user_clicked_color);
    play_sound(user_clicked_color);
    user_clicked_pattern.push(user_clicked_color);
    if (checkLevel(user_clicked_pattern.length-1)) {
        if (user_clicked_pattern.length == game_pattern.length) {

            setTimeout(function() {
                var next_color = nextSequence();
                level +=1;
                game_pattern.push(next_color);
                $("#level-title").text('Level '+level);
                user_clicked_pattern = [];
                
            }, 1000)

        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 100);
        $("#level-title").text('Game Over, press any key to Restart');
        level = 0
        user_clicked_pattern = [];
        game_pattern = [];

        
    }
})

var level = 0;
$(document).keypress(function(event){
    var next_color = nextSequence();
    level +=1;
    game_pattern.push(next_color);
    $("#level-title").text('Level '+level);


})

