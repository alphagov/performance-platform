/*jslint indent: 2 */
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys

if (!Object.keys) {
  Object.keys = (function () {
    var hasProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        throw new TypeError('Object.keys called on non-object');
      }
 
      var result = [],
        prop, i;
 
      for (prop in obj) {
        if (hasProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; (i += 1)) {
          if (hasProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
/*jslint indent: 2 */
var GOVUK = GOVUK || {};
GOVUK.performance = {};

GOVUK.performance.addToNamespace = function (name, obj) {
  if (GOVUK.performance[name] === undefined) {
    GOVUK.performance[name] = obj;
  } 
  else {
    throw new Error("There is already a key: '" + name + "' in the namespace.");
  }
};


GOVUK.performance.close = function () {
  GOVUK.performance.addToNamespace = undefined;
  GOVUK.performance.close = undefined;
};

/*global document:true*/
/*global GOVUK: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("cookieUtils", (function () {
  
  var cookiesAsKeyValues, getCookieNamed, setSessionCookie, deleteCookieNamed, arrayify; 
  
  
  cookiesAsKeyValues = function () {
    var bakedCookies = [], rawCookies = document.cookie.split(';'), i = 0, keyValue;
    for (i = 0; i < rawCookies.length; (i += 1)) {
      keyValue = rawCookies[i].split('=');
      bakedCookies.push({
        key: keyValue[0].trim(),
        value: keyValue[1] ? keyValue[1].trim() : undefined
      });
    }
    return bakedCookies;
  };


  getCookieNamed = function (name) {
    var allCookies = cookiesAsKeyValues(), i = 0;
    for (i = 0; i < allCookies.length; (i += 1)) {
      if (allCookies[i].key === name) {
        return allCookies[i];
      }
    }
  };


  setSessionCookie = function (cookie) {
    var path = (cookie.path === undefined) ? "; Path=/" : "; Path=" + cookie.path;
    document.cookie = cookie.key + "=" + cookie.value + path;
  };


  deleteCookieNamed = function (name) {
    document.cookie = name.trim() + "=" + "deleted" + ";expires=" + new Date(0).toUTCString() + "; Path=/";
  };


  arrayify = function (obj) {
    return (Object.prototype.toString.call(obj) !== '[object Array]') ? [obj] : obj;
  };


  return {
    cookiesAsKeyValues: cookiesAsKeyValues,
    getCookieNamed: getCookieNamed,
    setSessionCookie: setSessionCookie,
    deleteCookieNamed: deleteCookieNamed,
    arrayify: arrayify
  };

}()));

/*global document:true*/
/*global GOVUK: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("lightGate", (function () {
  var nameOfCookie = "journey_events", pathOfCookie, idOfStartingLink, startingEvent, 
    idOfBodyTagAtEnd, endingEvent, sendDataFunction, eventsForInterestingPages = {},
    cookieUtils = GOVUK.performance.cookieUtils,
    
    journeyStart, journeyEnd, journeyStage, cookieName, cookiePath, sendFunction, init,
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
  
  
  journeyStage = function (stageDescription) {
    if (stageDescription.eventObject.stage === undefined) {
      stageDescription.eventObject.stage = Object.keys(eventsForInterestingPages).length + 1;
    }
    
    eventsForInterestingPages[stageDescription.bodyId] = stageDescription.eventObject;
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
    privateMethods.doLandOnPageEvents();
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

  
  privateMethods.doLandOnPageEvents = function () {
    var i = 0, interestingIds = Object.keys(eventsForInterestingPages), 
      id = document.getElementsByTagName("body")[0].getAttribute("id");

    if (id === idOfBodyTagAtEnd) {
      privateMethods.sendEvent(endingEvent);
    }
    
    for (i = 0; i < interestingIds.length; (i += 1)) {
      if (id === interestingIds[i]) {
        privateMethods.sendEvent(eventsForInterestingPages[interestingIds[i]]);
      }
    }
  };


  privateMethods.jsonEqual = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };


  privateMethods.sendEvent = function (data) {
    if (data.stage === undefined && data === endingEvent) {
      data.stage = Object.keys(eventsForInterestingPages).length + 1;
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
    journeyStage: journeyStage,
    sendFunction: sendFunction,
    cookiePath: cookiePath
  };

}()));
// @depend ../script/patch.js
// @depend ../script/namespace.js
// @depend ../script/cookieUtils.js
// @depend ../script/lightGate.js

