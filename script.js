document.getElementById('cirnoClick').ondragstart = function() { return false; };

var clickCountP1 = 0;
var clickCountP2 = 0;
var readyP1 = false;
// var readyP2 = false;
var gameStart = false;
var gameStarting = false;
var dbReadyP1 = firebase.database().ref('readyP1');
var dbReadyP2 = firebase.database().ref('readyP2');
dbReadyP1.set(false);
// dbReadyP2.set(false);
var dbClickCountP1 = firebase.database().ref('clickCountP1');
var dbClickCountP2 = firebase.database().ref('clickCountP2');
dbClickCountP1.set(0);
dbClickCountP2.set(0);
punchNo = 0;

var mainSong = $('#backAudio');
var oneSound = new Audio('audio/1.mp3');
var twoSound = new Audio('audio/2.mp3');
var threeSound = new Audio('audio/3.mp3');
var goSound = new Audio('audio/go.mp3');
var timeSound = new Audio('audio/time.mp3');
var victorySound = new Audio('audio/victory.mp3');
var victoryCheerSound = new Audio('audio/victorycheer.wav')
var defeatSound = new Audio('audio/defeat.mp3');
var punch1Sound = new Audio('audio/Punch1.wav');
var punch2Sound = new Audio('audio/Punch2.wav');
var punch3Sound = new Audio('audio/Punch3.wav');
var punch4Sound = new Audio('audio/Punch4.wav');
var explosionSound = new Audio('audio/explosion.mp3');
var screamSound = new Audio('audio/scream.wav');

mute = false;
mainSong.get(0).play();

$('#muteButton').click(function(){
	if(!mute){
		mute = true;
		var button = $(this);
		var buttonSource = $('#mute');
		button.attr("disabled", "");
		oneSound.volume = 0;
		twoSound.volume = 0;
		threeSound.volume = 0;
		goSound.volume = 0;
		timeSound.volume = 0;
		victorySound.volume = 0;
		victoryCheerSound.volume = 0;
		defeatSound.volume = 0;
		punch1Sound.volume = 0;
		punch2Sound.volume = 0;
		punch3Sound.volume = 0;
		punch4Sound.volume = 0;
		explosionSound.volume = 0;
		screamSound.volume = 0;
		mainSong.animate({volume: 0.66}, 333, function(){
			buttonSource.attr('src', 'images/muting1.png');
			mainSong.animate({volume: 0.33}, 333, function(){
				buttonSource.attr('src', 'images/muting2.png');
				mainSong.animate({volume: 0.0}, 333, function(){
					buttonSource.attr('src', 'images/muted.png');		
					button.removeAttr("disabled", "");
				});
			});
			
		});
	}
	else{
		mute = false;
		var button = $(this);
		var buttonSource = $('#mute');
		button.attr("disabled", "");
		oneSound.volume = 1;
		twoSound.volume = 1;
		threeSound.volume = 1;
		goSound.volume = 1;
		timeSound.volume = 1;
		victorySound.volume = 1;
		victoryCheerSound.volume = 1;
		defeatSound.volume = 1;
		punch1Sound.volume = 1;
		punch2Sound.volume = 1;
		punch3Sound.volume = 1;
		punch4Sound.volume = 1;
		explosionSound.volume = 1;
		screamSound.volume = 1;
		mainSong.animate({volume: 0.33}, 333, function(){
			buttonSource.attr('src', 'images/muting2.png');
			mainSong.animate({volume: 0.66}, 333, function(){
				buttonSource.attr('src', 'images/muting1.png');
				mainSong.animate({volume: 1.0}, 333, function(){
					buttonSource.attr('src', 'images/unmuted.png');		
					button.removeAttr("disabled", "");
				});
			});
			
		});
		
	}
})

dbReadyP2.on('value', snap=>{
	console.log(snap.val());
	if(snap.val()==true){
		if(readyP1){
			readyP2 = snap.val();
			gameStartTimer();
		}
		if(!readyP1){
			readyP2 = snap.val();
		}
	}
	else{
		readyP2 = snap.val();
		return;
	}
})

dbClickCountP1.on('value', snap=>{
	console.log('p1Clicks: '+snap.val());
})

dbClickCountP2.on('value', snap=>{
	clickCountP2 = snap.val();
	console.log('p2Clicks: '+snap.val());
	$('#enemyDisplay').text('Enemy: '+snap.val());
})

$('#cirnoClick').mousedown(function(){
	if(!gameStart && !gameStarting){
		if(!readyP2){
			readyP1 = true;
			gameStarting = true;
			dbReadyP1.set(true);
			gameQueue();
		}
		if(readyP2){
			gameStartTimer();
			gameStarting = true;
			dbReadyP1.set(true);
		}
	}
	if(gameStart && gameStarting){
		clickCountP1 += 1;
		$('#clickCountDisplay').text('Clicks: ' +clickCountP1);
		$('#cirnoClickGif').attr('src', 'images/cirnoclicked.gif');
		dbClickCountP1.set(clickCountP1);
		punchNo++;
		var randomPunch = Math.floor(Math.random()*104);
		if(randomPunch>-1 && randomPunch <25){
			var tempX = event.clientX - 100;
			var tempY = event.clientY - 100;			
			$('#appendPunch1').append('<img id="punch'+punchNo+'" class="atMouse punch1">');
			setTimeout(function(){
				document.getElementById('punch'+punchNo+'').src = 'images/punch1.gif';
			}, 0);
			document.getElementById('punch'+punchNo+'').style.left = ''+tempX+'px';
			document.getElementById('punch'+punchNo+'').style.top = ''+tempY+'px';
			setTimeout(function(){
				$('#appendPunch1').empty();
			}, 300);
			punch1Sound.pause();
			punch1Sound.currentTime = 0;
			punch1Sound.play();
		}
		else if(randomPunch>24 && randomPunch<50){
			var tempX = event.clientX - 80;
			var tempY = event.clientY - 100;
			$('#appendPunch2').append('<img id="punch'+punchNo+'" class="punch1">');
			setTimeout(function(){
				document.getElementById('punch'+punchNo+'').src = 'images/punch2.gif';
			}, 0);
			document.getElementById('punch'+punchNo+'').style.left = ''+tempX+'px';
			document.getElementById('punch'+punchNo+'').style.top = ''+tempY+'px';
			setTimeout(function(){
				$('#appendPunch2').empty();
			}, 300);			
			punch2Sound.pause();
			punch2Sound.currentTime = 0;
			punch2Sound.play();
		}
		else if(randomPunch>49 && randomPunch<75){
			var tempX = event.clientX - 120;
			var tempY = event.clientY - 100;			
			$('#appendPunch3').append('<img id="punch'+punchNo+'" class="punch1">');
			setTimeout(function(){
				document.getElementById('punch'+punchNo+'').src = 'images/punch3.gif';
			}, 0);
			document.getElementById('punch'+punchNo+'').style.left = ''+tempX+'px';
			document.getElementById('punch'+punchNo+'').style.top = ''+tempY+'px';
			setTimeout(function(){
				$('#appendPunch3').empty();
			}, 450);			
			punch3Sound.pause();
			punch3Sound.currentTime = 0;
			punch3Sound.play();
		}
		else if(randomPunch>74 && randomPunch<100){
			var tempX = event.clientX - 100;
			var tempY = event.clientY - 100;						
			$('#appendPunch4').append('<img id="punch'+punchNo+'" class="punch1">');
			setTimeout(function(){
				document.getElementById('punch'+punchNo+'').src = 'images/punch4.gif';
			}, 0);
			document.getElementById('punch'+punchNo+'').style.left = ''+tempX+'px';
			document.getElementById('punch'+punchNo+'').style.top = ''+tempY+'px';
			setTimeout(function(){
				$('#appendPunch4').empty();
			}, 300);			
			punch4Sound.pause();
			punch4Sound.currentTime = 0;
			punch4Sound.play();
		}
		else if(randomPunch>99){
			clickCountP1 += 50;
			dbClickCountP1.set(clickCountP1);
			$('#appendPunch5').append('<img id="punch'+punchNo+'" class="explosionStyle">');
			setTimeout(function(){
				document.getElementById('punch'+punchNo+'').src = 'images/explosion.gif';
			}, 0);
			setTimeout(function(){
				$('#appendPunch5').empty();
			}, 2500);			
			explosionSound.pause();
			explosionSound.currentTime = 0;
			explosionSound.play();
			screamSound.pause();
			screamSound.currentTime = 0;
			screamSound.play();
			$('#clickCountDisplay').text('Clicks: ' +clickCountP1);
		}
	}
});

$('#cirnoClick').mouseup(function(){
	$('#cirnoClickGif').attr('src', 'images/cirno.gif');
});

var gameQueue = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div class="animated infinite flash">Waiting...</div>');
}

var gameStartTimer = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>3</div>');
	threeSound.play();
	setTimeout(gameStartTimer2, 1000);
}

var gameStartTimer2 = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>2</div>');
	twoSound.play();
	setTimeout(gameStartTimer1, 1000);
}

var gameStartTimer1 = function() {
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div>1</div>');
	oneSound.play();
	setTimeout(gameStartTimer0, 1000);
}

var gameStartTimer0 = function() {
	goSound.play();
	gameStarting = true;
	gameStart = true;
	$('#cirnoClickOverlay').empty();
	$('#cirnoClickOverlay').append('<div class="animated zoomOutUp">Go!</div>');
	$('#cirnoClickGif').css('filter', 'brightness(100%)');
	timer.start();
}

var timer = {
	reset: function(){
		clearInterval(intervalId);
		gameStarting = false;
		timerCount = 9;
		$('#timerDisplay').text(timerCount);
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
			timeSound.play();
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
	if(clickCountP1>clickCountP2){
		victoryCheerSound.play();
		victorySound.play();
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>Victory!<div id='opponentScore'>Opponent: "+clickCountP2+"</div></div>");
		setTimeout(newGame, 5000);
	}
	else if(clickCountP1==clickCountP2){
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>Tied?!?!<div id='opponentScore'>Opponent: "+clickCountP2+"</div></div>");	
		setTimeout(newGame, 5000);
	}
	else{
		defeatSound.play();
		$('#cirnoClickOverlay').append("<div class='animated bounceIn'>Defeat!<div id='opponentScore'>Opponent: "+clickCountP2+"</div></div>");
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
	$('#clickCountDisplay').text('Clicks: 0');
	$('#enemyDisplay').text('Enemy: 0');
	$('#timerDisplay').text('9');
}



// $('body').click(function(event){
// 	punchNo++;
// 	var tempX = event.clientX - 60;
// 	var tempY = event.clientY - 60;
// 	$('#appendPunch1').append('<img id="punch'+punchNo+'" class="atMouse punch1">');
// 	setTimeout(function(){
// 		document.getElementById('punch'+punchNo+'').src = 'images/punch1.gif';
// 	}, 0);
// 	document.getElementById('punch'+punchNo+'').style.left = ''+tempX+'px';
// 	document.getElementById('punch'+punchNo+'').style.top = ''+tempY+'px';
// 	setTimeout(function(){
// 		$('#appendPunch1').empty();
// 		console.log('remove failed');
// 	}, 300);
// })