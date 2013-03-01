var cookieUtils = function() {

  var cookiesAsKeyValues = function () {
    var bakedCookies = [];
    var rawCookies = document.cookie.split(';');
    for (var i = 0; i < rawCookies.length; i++) {
      var keyValue = rawCookies[i].split('=');
      bakedCookies.push({
        key: keyValue[0].trim(), 
        value: keyValue[1] ? keyValue[1].trim() : undefined
      });
    }
    return bakedCookies;
  }
  
  
  var getCookieNamed = function (name) {
    var allCookies = cookiesAsKeyValues();
    for (var i = 0; i < allCookies.length; i++) {
      if (allCookies[i].key === name) {
        return allCookies[i];
      }
    }
  };
  
  
  var setSessionCookie = function (cookie) {
    document.cookie = cookie.key + "=" + cookie.value;
  };
  
  
  var deleteCookieNamed = function (name) {
    document.cookie = name + "=" + "deleted" + ";expires=" + new Date(0).toUTCString();
  };
  
  
  var arrayify = function (obj) {
    return (Object.prototype.toString.call(obj) !== '[object Array]') ? [obj] : obj;
  };


  return {
    cookiesAsKeyValues: cookiesAsKeyValues,
    getCookieNamed: getCookieNamed,
    setSessionCookie: setSessionCookie,
    deleteCookieNamed: deleteCookieNamed,
    arrayify: arrayify
  };
  
}();