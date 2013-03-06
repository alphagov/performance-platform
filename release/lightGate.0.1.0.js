/*global document:true*/

var cookieUtils = (function () {
    
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

}());

/*global cookieUtils:true, document:true*/
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
// @depend ../script/cookieUtils.js
// @depend ../script/lightGate.js

