/*global cookieUtils:true, document:true*/
/*jslint indent: 2 */

var lightGate = (function () {
  
  var nameOfCookie = "journey_events", pathOfCookie, idOfStartingLink, startingEvent, 
    idOfBodyTagAtEnd, endingEvent, sendDataFunction, 
    
    journeyStart, journeyEnd, cookieName, cookiePath, sendFunction, init,
    privateMethods = {};


  journeyStart = function (startDescription) {
    idOfStartingLink = startDescription.linkId;
    startingEvent = startDescription.eventObject;
    return this;
  };


  journeyEnd = function (endDescription) {
    idOfBodyTagAtEnd = endDescription.bodyId;
    endingEvent = endDescription.eventObject;
    return this;
  };


  cookieName = function (name) {
    nameOfCookie = name;
    return this;
  };


  cookiePath = function (path) {
    pathOfCookie = path;
    return this;
  };


  sendFunction = function (send) {
    sendDataFunction = send;
    return this;
  };


  privateMethods.addStartingEventToCookie = function () {
    var cookie = {key: nameOfCookie, value: JSON.stringify(startingEvent)};
    if (pathOfCookie !== undefined) {
      cookie.path = pathOfCookie;
    }
    cookieUtils.setSessionCookie(cookie);
  };


  init = function () {
    privateMethods.bindStartingEvent();
    privateMethods.sendCookieEvents();
    privateMethods.doEndingEvent();
  };


  privateMethods.sendCookieEvents = function () {
    var existingCookie = cookieUtils.getCookieNamed(nameOfCookie), events, i = 0;

    if (existingCookie && existingCookie.value) {
      events = cookieUtils.arrayify(JSON.parse(existingCookie.value));
      for (i = 0; i < events.length; (i += 1)) {
        privateMethods.sendEvent(events[i]);
      }
      cookieUtils.deleteCookieNamed(nameOfCookie);
    }
  };

  
  privateMethods.bindStartingEvent = function () {
    var startingLink = document.getElementById(idOfStartingLink);
    if (startingLink) {
      startingLink.onclick = privateMethods.addStartingEventToCookie; 
    }
  };

  
  privateMethods.doEndingEvent = function () {
    if (document.getElementsByTagName("body")[0].getAttribute("id") === idOfBodyTagAtEnd) {
      privateMethods.sendEvent(endingEvent);
    }
  };


  privateMethods.jsonEqual = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };


  privateMethods.sendEvent = function (data) {
    if (data.stage === undefined && data === endingEvent) {
      data.stage = 1;
    }
    
    if (data.stage === undefined && privateMethods.jsonEqual(data, startingEvent)) {
      data.stage = 0;
    }
    
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

}());