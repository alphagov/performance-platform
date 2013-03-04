var messages = [];
var stubAnalyticsService = function (data) {
  stubAnalyticsService.count++;
  messages.push(data);
};

lightGate.cookieName("test_journey")
         .sendFunction(stubAnalyticsService)
         .journeyStart({ linkId: "start", eventObject: "hello" })
         .journeyEnd({ bodyId:"end", eventObject: "bye" })
         .init();
