describe("lightGate.js - journey tracking for google analytics", function () {
  
  // SETUP
  var linkId = 'start',
      cookie = 'test'
      stubLink = "<a href='#' id='" + linkId + "'>This is a link</a>",
      pageBody = document.getElementsByTagName('body')[0],
      sendFunction = stubAnalyticsService,
      eventToSend = {
        'category': "foo",
        'action': "journey_start",
        "label": "some_label",
        "nonInteraction": true
      },
      anotherEventToSend = {
        'category': "bar",
        'action': "journey_start",
        "label": "some_label",
        "nonInteraction": true
      };
  

  // BEFORE ALL
  pageBody.innerHTML += stubLink;  

  lightGate.cookieName(cookie)
           .sendFunction(stubAnalyticsService.post)
           .journeyStart({ linkId: linkId, eventObject: eventToSend })
           .journeyEnd({ bodyId:"end", eventObject:anotherEventToSend })
           .init();
           
   afterEach(function () {
     cookies = document.cookie.split(';');
     for (var i = 0; i < cookies.length; i++) {
       cookieUtils.deleteCookieNamed(cookies[i].split('=')[0]);
     }
     stubAnalyticsService.reset();
   });
  
  describe("initialization", function () {
    
    it("should not blow up if the link does not exist", function () {
      lightGate.journeyStart({ linkId: "does_not_exist", eventObject: eventToSend })
               .init();
      // should pass
    });


    it("should bind event to starting link", function () {
      expect(document.getElementById(linkId).onclick).not.toBe(null)
    });
      
        
    it("should try to send a waiting event", function () {
      cookieUtils.setSessionCookie({key: cookie, value: '"waiting"'});
      lightGate.init();
      expect(stubAnalyticsService.messages()[0]).toBe('waiting');
    });
      
        
    it("should try to send any waiting events", function () {
      cookieUtils.setSessionCookie({key: cookie, value: JSON.stringify(["foo","bar","zap"])});
      lightGate.init();
      expect(stubAnalyticsService.count()).toBe(3);
      expect(stubAnalyticsService.messages()).toContain("foo");
      expect(stubAnalyticsService.messages()).toContain("bar");
      expect(stubAnalyticsService.messages()).toContain("zap");
    });
    
    
    it("should delete cookies after events are sent", function () {
      var val = JSON.stringify({foo: 'bar', zap: [1,2,3,4,5]});
      cookieUtils.setSessionCookie({key: "something", value: val});
      lightGate.cookieName("something").init();
      expect(document.cookie).not.toContain("something=" + val);
    });
    
    
    it("should only send events once", function () {
      cookieUtils.setSessionCookie({key: "another_test", value: JSON.stringify(['hello','there'])});
      lightGate.cookieName("another_test").init();
      lightGate.cookieName("another_test").init();
      expect(stubAnalyticsService.count()).toBe(2);
      expect(stubAnalyticsService.messages()).toContain('hello');
      expect(stubAnalyticsService.messages()).toContain('there');
    });
    
  
  });
  
  
  describe("on click", function () {
    
    it("should add an event to the cookie when the link is clicked", function () {
      document.getElementById(linkId).click();
      expect(document.cookie).toContain(cookie + "=" + JSON.stringify(eventToSend));
    });
    
  });
  
  
  describe("landing on end page", function () {
    
    it("should fire an event when the last page of the journey is reached", function () {
      pageBody.setAttribute('id','end');
      lightGate.journeyEnd({ bodyId:"end", eventObject:anotherEventToSend }).init()
      expect(stubAnalyticsService.messages()).toContain(anotherEventToSend);
    });
    
  });
  
});