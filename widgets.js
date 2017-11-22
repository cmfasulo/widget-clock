$(function() {
  getWeather();
  getDate();
  getFact();

  $('#weather').on('click', function(e) {
    getWeather();
  });

  $('#fact').on('click', function(e) {
    getFact();
  });
});

function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
}

function getWeather() {
  var secret = getCookie('weatherKey');
  var url = 'http://api.apixu.com/v1/forecast.json?key=' + secret + '&q=92109';

  $.get(url, function(data) {
    var iconUrl = 'http:' + data.current.condition.icon;
    $('#weather-icon').attr('src', iconUrl);
    $('#current-temp').html(Math.round(data.current.temp_f) + '&#176;' + 'F');
    $('#high-temp').html(Math.round(data.forecast.forecastday[0].day.maxtemp_f) + '&#176;' + 'F');
    $('#low-temp').html(Math.round(data.forecast.forecastday[0].day.mintemp_f) + '&#176;' + 'F');
    getAstro(data.forecast.forecastday[0].astro);
  });

  var weather = setTimeout(getWeather, 600000);
}

function getAstro(astro) {
  var date = new Date();
  var dateStr = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  var url = 'http://api.usno.navy.mil/moon/phase?date=' + dateStr + '&nump=1';
  var phases = [
    'New',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent'
  ];

  $.get(url, function(data) {
    var phaseDay = data.phasedata[0].date.split(' ')[2];
    var phase = data.phasedata[0].phase;
    var phaseIdx = phases.indexOf(phase);

    if (parseInt(phaseDay) - parseInt(date.getDate()) > 3) {
      phase = phaseIdx === 0 ? phases[phases.length - 1] : phases[phaseIdx - 1];
    }

    phase = phase.replace(/\s/g, '') + '.png';

    $('#moon-icon').attr('src', 'images/' + phase);
    $('#sunrise').html(astro.sunrise);
    $('#sunset').html(astro.sunset);
  });
}

function getDate() {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var day = new Date();
  var calendarDate = new Date().toString().split(' ');
  day = days[day.getDay()];
  calendarDate = calendarDate.slice(1, 4);
  calendarDate = calendarDate[0] + ' ' + calendarDate[1] + ', ' + calendarDate[2];
  $('#date').html(day + '<br/>' + calendarDate);

  var date = setTimeout(getDate, 1000);
}

function getFact() {
  var url = 'http://mentalfloss.com/api/facts?page=2&limit=1&cb=0.7328708411229612';
  $.getJSON(url, function(data) {
    var headline = randomFact(data);

    while (headline.length > 100) {
      headline = randomFact(data);
    }

    $('#fact').html(headline);
  });

  var fact = setTimeout(getFact, 600000);
}

function randomFact(data) {
  var rand = Math.floor(Math.random() * (data.length - 1));
  return data[rand].headline;
}
