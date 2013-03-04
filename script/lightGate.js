var lightGate = function () {

  var nameOfCookie = "journey_events",
      pathOfCookie = undefined,
      idOfStartingLink = undefined,
      startingEvent = undefined,
      idOfBodyTagAtEnd = undefined,
      endingEvent = undefined,
      sendDataFunction = undefined;


  var journeyStart = function(startDescription) {
    idOfStartingLink = startDescription.linkId;
    startingEvent = startDescription.eventObject;
    return this;
  };
  
  
  var journeyEnd = function(endDescription) {
    idOfBodyTagAtEnd = endDescription.bodyId;
    endingEvent = endDescription.eventObject;
    return this;
  };
  
  
  var cookieName = function (name) {
    nameOfCookie = name;
    return this;
  };
  
  
  var cookiePath = function(path) {
    console.log('called');
    pathOfCookie = path;
    return this;
  };
  
  
  var sendFunction = function (send) {
    sendDataFunction = send;
    return this;
  };

  
  var _addStartingEventToCookie = function() {
    var cookie = {key: nameOfCookie, value: JSON.stringify(startingEvent)};
    console.log(pathOfCookie);
    if (pathOfCookie !== undefined) cookie['path'] = pathOfCookie;
    console.log(cookie);
    cookieUtils.setSessionCookie(cookie);
  };


  var init = function () {
    _bindStartingEvent();
    _sendCookieEvents();
    _doEndingEvent();
  };


  var _sendCookieEvents = function () {
    var existingCookie = cookieUtils.getCookieNamed(nameOfCookie);
    
    if (existingCookie && existingCookie.value) {
      var events = cookieUtils.arrayify(JSON.parse(existingCookie.value));
      for (var i = 0; i < events.length; i++) {
        _sendEvent(events[i]);
      }
      cookieUtils.deleteCookieNamed(nameOfCookie);
    }
  };


  var _bindStartingEvent = function () {
    var startingLink = document.getElementById(idOfStartingLink);
    if (startingLink) {
      startingLink.onclick = _addStartingEventToCookie; 
    }
  };
  
  
  var _doEndingEvent = function () {
    if (document.getElementsByTagName("body")[0].getAttribute("id") === idOfBodyTagAtEnd) {
      _sendEvent(endingEvent);
    }
  };
  
  
  var _jsonEqual = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  
  
  var _sendEvent = function (data) {
    if (data["stage"] === undefined && data === endingEvent) data["stage"] = 1;
    if (data["stage"] === undefined && _jsonEqual(data,startingEvent)) data["stage"] = 0;
    sendDataFunction(data);
  };
  
  
  return {
    init: init,
    cookieName: cookieName,
    journeyStart: journeyStart,
    journeyEnd: journeyEnd,
    sendFunction: sendFunction,
    cookiePath: cookiePath
  };

}();