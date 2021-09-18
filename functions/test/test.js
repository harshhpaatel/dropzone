const assert = require("assert");
const app = require("../app");
const expect = require("chai").expect;
const request = require("supertest");

describe("App", function () {
  it("App Health Status", async function () {
    const response = await request(app).get(`/status`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("ok");
  });
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
