lightGate.cookieName("test_journey")
         .sendFunction(stubAnalyticsService.post)
         .journeyStart({ linkId: "start", eventObject: {message: "hello"} })
         .journeyStage({ bodyId: "middle", eventObject: {message: "ping"} })
         .journeyEnd({ bodyId: "end", eventObject: {message: "bye"} })
         .init();
