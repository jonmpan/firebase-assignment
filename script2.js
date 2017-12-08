document.getElementById('cirnoClick').ondragstart = function() { return false; };

var clickCountP1 = 0;
var clickCountP2 = 0;
var readyP1 = false;
var readyP2 = false;
var gameStart = false;
var gameStarting = false;
var dbReadyP1 = firebase.database().ref('readyP1');
var dbReadyP2 = firebase.database().ref('readyP2');
dbReadyP1.set(false);
dbReadyP2.set(false);
var dbClickCountP1 = firebase.database().ref('clickCountP1');
var dbClickCountP2 = firebase.database().ref('clickCountP2');
dbClickCountP1.set(0);
dbClickCountP2.set(0);

dbReadyP1.on('value', snap=>{
	console.log(snap.val());
	if(snap.val()==true){
		if(readyP2){
			gameStartTimer();
		}
		if(!readyP2){
			readyP1 = snap.val();
		}
	}
	else{
		return;
	}
})

dbClickCountP2.on('value', snap=>{
	console.log('p1Clicks: '+snap.val());
})

dbClickCountP1.on('value', snap=>{
	clickCountP1 = snap.val();
	console.log('p2Clicks: '+snap.val());
})

// $('#setP1Ready').click(function(){
// 	dbReadyP1.set(true);
// })

// $('#setP1Click').click(function(){
// 	clickCountP1++;
// 	dbClickCountP1.set(clickCountP2);
// })

$('#cirnoClick').mousedown(function(){
	if(!gameStart && !gameStarting){
		if(!readyP1){
			readyP2 = true;
			gameStarting = true;
			dbReadyP2.set(true);
			gameQueue();
		}
		if(readyP1){
			gameStartTimer();
			dbReadyP2.set(true);
		}
	}
	if(gameStart && gameStarting){
		clickCountP2 += 1;
		$('#clickCountP1').text('Clicks: ' +clickCountP2);
		$('#cirnoClickGif').attr('src', 'images/cirnoclicked.gif');
		dbClickCountP2.set(clickCountP2);
	}
});

$('#cirnoClick').mouseup(function(){
	$('#cirnoClickGif').attr('src', 'images/cirno.gif');
});

var gameQueue = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div class="animated infinite flash">Waiting...</div>');
	// setTimeout(gameStartTimer, 1000);
}

var gameStartTimer = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>3</div>');
	setTimeout(gameStartTimer2, 1000);
}

var gameStartTimer2 = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>2</div>');
	setTimeout(gameStartTimer1, 1000);
}

var gameStartTimer1 = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>1</div>');
	setTimeout(gameStartTimer0, 1000);
}

var gameStartTimer0 = function() {
	gameStarting = true;
	gameStart = true;
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div class="animated zoomOutUp">Go!</div>');
	$('#cirnoClickGif').css('filter', 'brightness(100%)');
	timer.start();
}

var timer = {
	reset: function(){
	},

	start: function(){
		console.log('start');
		timerCount = 9;
		$('#timerDisplay').text(timerCount);
		intervalId = setInterval(timer.count, 1000);
	},

	stop: function(){

	},

	count: function() {
		if(timerCount>0){
			console.log('count');
			timerCount --;
			$('#timerDisplay').text(timerCount);
		}
		else{
			console.log('stop');
			clearInterval(intervalId);
			gameStarting = false;
			$('#cirnoClickGif').css('filter', 'brightness(50%)');
			$('#cirnoClickOverlay').empty();
			$('#cirnoClickOverlay').append("<div class='animated bounceIn'>Time's Up!</div>");
			setTimeout(scoreDisplay, 2000);
		}
	}
}

var scoreDisplay = function() {
	console.log('scoreDisplay');
	$('#cirnoClickOverlay').empty();
	if(clickCountP2>clickCountP1){
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>You Win!<div id='opponentScore'>Opponent: "+clickCountP1+"</div></div>");
		setTimeout(newGame, 5000);
	}
	else if(clickCountP2==clickCountP1){
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>You Tied!<div id='opponentScore'>Opponent: "+clickCountP1+"</div></div>");	
		setTimeout(newGame, 5000);
	}
	else{
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>You Lose!<div id='opponentScore'>Opponent: "+clickCountP1+"</div></div>");
		setTimeout(newGame, 5000);
	}
}

var newGame = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append("<div class='animated bounceIn'>Click to Start!</div>");
	gameStart = false;
	gameStarting = false;
	readyP1 = false;
	readyP2 = false;
	dbReadyP1.set(false);
	dbReadyP2.set(false);
	dbClickCountP1.set(0);
	dbClickCountP2.set(0);
	clickCountP1 = 0;
	clickCountP2 = 0;
	$('#clickCountP1').text('Clicks: ' +clickCountP2);
}