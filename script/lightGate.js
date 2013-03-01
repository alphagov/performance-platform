var lightGate = function () {

  var nameOfCookie = "journey_events"
      idOfStartingLink = undefined,
      sendDataFunction = undefined;


  startingLinkID = function(id) {
    idOfStartingLink = id;
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
    document.cookie = nameOfCookie + '=' + '"event"';
  };


  init = function () {
    var existingCookie = cookieUtils.getCookieNamed(nameOfCookie);
    
    if (existingCookie && existingCookie.value) {
      var events = cookieUtils.arrayify(JSON.parse(existingCookie.value));
      for (var i = 0; i < events.length; i++) {
        sendFunction(events[i]);
      }
    }

    document.getElementById(idOfStartingLink).onclick = tagCookie;
  };

  
  return {
    init: init,
    cookieName: cookieName,
    startingLinkID: startingLinkID,
    sendFunction: sendFunction
  };

}();