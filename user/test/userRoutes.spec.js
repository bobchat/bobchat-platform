const chai = require("chai");
const chaiHttp = require("chai-http");
const {expect } = chai;
const API_URI = 'http://localhost:8080/user';
chai.use(chaiHttp);


describe('The Users Routes', () => {
  it('should get a token given a unique id', (done) => {
    const deviceUniqueId = '0123456789';
    chai
      .request(API_URI)
      .get("/token")
      .query({ deviceUniqueId })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        expect(res.body.user.deviceUniqueId).to.equal(deviceUniqueId);
        done();
      });
  });
});