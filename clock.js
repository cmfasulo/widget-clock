var i = true;
var background = true;

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var time = formatTime(h, m, s)

  if ((time.m.toString() === '00' || time.m.toString() === '30') && i === true) {
    i = false;
    newBackground();
    var iReset = setTimeout(function() { i = true }, 120000);
  }

  document.getElementById('time').innerHTML = time.h + ":" + time.m;
  document.getElementById('sec').innerHTML = time.s;
  document.getElementById('ampm').innerHTML = time.ampm;
  var t = setTimeout(startTime, 500);
}

function formatTime(h, m, s) {
  var time = {};
  time.h = checkHour(h);
  time.m = checkZero(m);
  time.s = checkZero(s);
  time.ampm = h >= 12 ? "PM" : "AM";

  return time;
}

function checkHour(i) {
  if (i > 12) { i = i - 12; }
  if (i === 0) { i = 12; }
  return i;
}

function checkZero(i) {
  if (i < 10) { i = '0' + i; } // add zero in front of numbers < 10
  return i;
}

function newBackground() {
  var video = document.querySelector('video');
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var results = JSON.parse(request.responseText).data.children;
      var urls = results.map(function(el) { return el.data.url });
      var rand = Math.floor(Math.random() * 25);
      var newSrc = urls[rand]
      newSrc = newSrc.substring(0, newSrc.lastIndexOf('.')) + '.mp4';

      document.querySelector('video > source').src = newSrc;
      video.load();
    }
  }

  request.open('Get', 'https://www.reddit.com/r/Cinemagraphs/top.json?t=all&limit=50');
  request.send();
}

function toggleFullScreen() {
  var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    launchFullscreen(document.documentElement);
  } else {
    exitFullscreen();
  }
}

function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  startTime();

  document.querySelector('#sec').addEventListener('click', function(e) {
    newBackground();
  });

  document.querySelector('#ampm').addEventListener('click', function(e) {
    toggleFullScreen();
  });

  document.querySelector('#time').addEventListener('click', function(e) {
    var video = document.querySelector('#media > video');

    if (background === true) {
      video.classList = 'hide';
      background = false;
    } else {
      video.classList = 'show';
      background = true;
    }
  });
});
