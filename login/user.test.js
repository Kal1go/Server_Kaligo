const request = require('supertest');
const app = require('../app');

const UserModel = {
  name: 'Kaligo',
  email: 'kaligo@gmail.com.br',
  appleID: 'e942da463aa9ed6c864bc51a7960de922db8bd6c',
  _id: '507f191e810c19729de860ea',
};

describe('', function() {
  it('Read Users', function(done) {
    request(app)
        .get('/api/user/get/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Create User', function(done) {
    request(app)
        .post('/api/user/create')
        .send(UserModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
});
