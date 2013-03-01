var lightGate = function () {

  var nameOfCookie = "journey_events"
      idOfStartingLink = undefined,
      startingEvent = undefined,
      sendDataFunction = undefined;


  journeyStart = function(startDescription) {
    idOfStartingLink = startDescription.linkId;
    startingEvent = startDescription.eventObject;
    return this;
  };
  
  
  journeyEnd = function(endDescription) {
    idOfBodyTagAtEnd = endDescription.bodyId;
    endingEvent = endDescription.eventObject;
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
    bindStartingEvent();
    sendCookieEvents();
    doEndingEvent();
  };


  var sendCookieEvents = function () {
    var existingCookie = cookieUtils.getCookieNamed(nameOfCookie);
    
    if (existingCookie && existingCookie.value) {
      var events = cookieUtils.arrayify(JSON.parse(existingCookie.value));
      for (var i = 0; i < events.length; i++) {
        sendFunction(events[i]);
      }
      cookieUtils.deleteCookieNamed(nameOfCookie);
    }
  };


  var bindStartingEvent = function () {
    document.getElementById(idOfStartingLink).onclick = tagCookie;
  };
  
  
  var doEndingEvent = function () {
    if (document.getElementsByTagName("body")[0].getAttribute("id") === idOfBodyTagAtEnd) {
      sendFunction(endingEvent);
    }
  };
  
  
  return {
    init: init,
    cookieName: cookieName,
    journeyStart: journeyStart,
    journeyEnd: journeyEnd,
    sendFunction: sendFunction
  };

}();