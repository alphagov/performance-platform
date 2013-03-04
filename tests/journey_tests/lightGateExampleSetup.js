lightGate.cookieName("test_journey")
         .sendFunction(stubAnalyticsService.post)
         .journeyStart({ linkId: "start", eventObject: "hello" })
         .journeyEnd({ bodyId:"end", eventObject: "bye" })
         .init();
