const request = require("supertest");
const { app } = require("../server");

describe("GET /users/dev", () => {
  describe("when the input is valid", () => {
    it("should work", async () => {
      const res = await request(app)
        .post("/users/dev")
        .send({
          first: "Real",
          last: "Name"
        });
      expect(res.statusCode).toEqual(200);
    });
  });
  describe("when the input is invalid", () => {
    it("should return a 422", async () => {
      const res = await request(app)
        .post("/users/dev")
        .send({
          first: "",
          last: ""
        });
      expect(res.statusCode).toEqual(422);
    });
  });
});
