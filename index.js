var i = true;

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var ampm;
  m = checkTime(m);
  s = checkTime(s);

  if (h > 12) {
    h = h - 12;
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }

  if (h === 0) {
    h = 12;
  }

  if ((m.toString() === '00' || m.toString() === '30') && i === true) {
    i = false;
    newMedia();
    var iReset = setTimeout(function() { i = true }, 120000);
  }
  // if (i === true) {
  //   i = false;
  //   newMedia();
  // }

  document.getElementById('time').innerHTML = h + ":" + m;
  document.getElementById('sec').innerHTML = s;
  document.getElementById('ampm').innerHTML = ampm;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function newMedia() {
  console.log('new media');
  var request = new XMLHttpRequest();
  var video = document.querySelector('#media > video');

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var results = JSON.parse(request.responseText).data.children;
      var urls = results.map(function(el) { return el.data.url });
      var rand = Math.floor(Math.random() * 25);
      var newSrc = urls[rand]
      newSrc = newSrc.substring(0, newSrc.lastIndexOf('.')) + '.mp4';

      document.querySelector('#media > video > source').src = newSrc;
      document.querySelector('#media > video').load();
    }
  }

  request.open('Get', 'https://www.reddit.com/r/Cinemagraphs/top.json?t=all&limit=50');
  request.send();
}

document.addEventListener("DOMContentLoaded", function(event){
  startTime();
});
