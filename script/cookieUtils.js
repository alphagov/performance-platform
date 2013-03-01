var cookieUtils = function() {

  var cookiesAsKeyValues = function () {
    var bakedCookies = [];
    var rawCookies = document.cookie.split(';');
    for (var i = 0; i < rawCookies.length; i++) {
      var keyValue = rawCookies[i].split('=');
      bakedCookies.push([keyValue[0].trim(), keyValue[1].trim()]);
    }
    return bakedCookies;
  }

  return {
    cookiesAsKeyValues: cookiesAsKeyValues
  };
  
}();