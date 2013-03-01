var lightGate = function () {

  var nameOfCookie = "journey_events"
      idOfStartingLink = undefined,
      startingEvent = undefined,
      sendDataFunction = undefined;


  journeyStart = function(elementId, eventToSend) {
    idOfStartingLink = elementId;
    startingEvent = eventToSend;
    return this;
  };
  
  
  cookieName = function (name) {
    nameOfCookie = name;
    return this;
  };
  
  
  sendFunction = function (send) {
    sendDataFunction = send;
    return this;
  }

  
  tagCookie = function() {
    cookieUtils.setSessionCookie({key: nameOfCookie, value: JSON.stringify(startingEvent)});
  };


  init = function () {
    var existingCookie = cookieUtils.getCookieNamed(nameOfCookie);
    
    if (existingCookie && existingCookie.value) {
      var events = cookieUtils.arrayify(JSON.parse(existingCookie.value));
      for (var i = 0; i < events.length; i++) {
        sendFunction(events[i]);
      }
      cookieUtils.deleteCookieNamed(nameOfCookie);
    }

    document.getElementById(idOfStartingLink).onclick = tagCookie;
  };

  
  return {
    init: init,
    cookieName: cookieName,
    journeyStart: journeyStart,
    sendFunction: sendFunction
  };

}();