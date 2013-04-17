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
    
    var nodeWithJourneyTag = Sizzle("[data-journey]")[0];
    if (nodeWithJourneyTag) {
      if (nodeWithJourneyTag.nodeName === "A") {
        var oldOnclick = nodeWithJourneyTag.onclick;
        nodeWithJourneyTag.onclick = function () {
          if (oldOnclick) {
            oldOnclick();
          }
          addStartStringToCookie(nodeWithJourneyTag.getAttribute("data-journey"));
        };
      } 
      else {
        analyticsService(nodeWithJourneyTag.getAttribute("data-journey"));
      }
    }
  };

  return {
    setup: setup
  }
}());