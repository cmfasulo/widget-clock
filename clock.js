var i = true;
var background = true;

$(function() {
  startTime();

  $('#sec').on('click', function(e) {
    newBackground();
  });

  $('#ampm').on('click', function(e) {
    toggleFullScreen();
  });

  $('#time').on('click', function(e) {
    toggleBackground();
  });
});

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

  $('#time').html(time.h + ":" + time.m);
  $('#sec').html(time.s);
  $('#ampm').html(time.ampm);

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
  var video = $('video');
  var url = 'https://www.reddit.com/r/Cinemagraphs/top.json?t=all&limit=50';

  $.get(url, function(data) {
    data = data.data.children;
    var urls = data.map(function(el) { return el.data.url });
    var rand = Math.floor(Math.random() * 25);
    var newSrc = urls[rand]
    newSrc = newSrc.substring(0, newSrc.lastIndexOf('.')) + '.mp4';

    $('#primarySrc').attr('src', newSrc);
    video[0].load();
  });
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

function toggleBackground() {
  var elements = $('video, .top, .bottom');
  background = !background;

  if (background) {
    elements.removeClass('hide');
    elements.toggleClass('show');
  } else {
    elements.removeClass('show');
    elements.toggleClass('hide');
  }

  $('.middle').toggleClass('large');
  $('h1').toggleClass('large-clock');
  $('h4').toggleClass('large-sec');
}
