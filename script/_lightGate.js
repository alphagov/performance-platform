GOVUK.performance.addToNamespace("_lightGate", function () {
	var nameOfCookie = "journey_events",
	  analyticsService;
	
	var addStartStringToCookie = function (journeyValue) {
    var cookie = {key: nameOfCookie, value: journeyValue, path: "/"};
    GOVUK.performance.cookieUtils.setSessionCookie(cookie);
	};
	
  var sendCookieEvents = function () {
    var existingCookie = GOVUK.performance.cookieUtils.getCookieNamed(nameOfCookie), events, i = 0;

    if (existingCookie && existingCookie.value) {
      analyticsService(existingCookie.value);
      GOVUK.performance.cookieUtils.deleteCookieNamed(nameOfCookie);
    }
  };

  var setup = function(config) {
    analyticsService = config.analyticsFunction;
    
    sendCookieEvents();
    
    var startingLink = Sizzle("[data-journey]")[0];
    if (startingLink) {
      if (startingLink.nodeName === "A") {
        startingLink.onclick = function () { 
          addStartStringToCookie(startingLink.getAttribute("data-journey"));
        };
      } 
      else {
        analyticsService(startingLink.getAttribute("data-journey"));
      }
    }
  };

  return {
    setup: setup
  }
}());