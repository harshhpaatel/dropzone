const assert = require("assert");
const app = require("../app");
const expect = require("chai").expect;
const request = require("supertest");

describe("Dropzone API", function () {
  it("App Health Status", async function () {
    const response = await request(app).get(`/status`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("ok");
  });
  describe("Image Service", function () {
    let uploadImageID = "";
    it("Image Service Health Status", async function () {
      const response = await request(app).get(`/images/status`);
      expect(response.status).to.equal(200);
    });

    it("Upload Image to Server", async function () {
      this.timeout(4000);
      const imageContent = {
        image: "test/sample.jpeg",
      };
      const response = await request(app).post(`/images`).send(imageContent);
      expect(response.status).to.equal(200);
      uploadImageID = response.body.public_id;
    });

    it("Delete Image from Server", async function () {
      this.timeout(3000);
      const response = await request(app).delete(`/images/${uploadImageID}`);
      expect(response.status).to.equal(200);
    });
  });
});
