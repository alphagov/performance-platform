describe("the end of the user journey", function () {

  it("should have sent an end event", function () {
    expect(messages).toContain("bye");
  });
  
});