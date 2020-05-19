const request = require('supertest');
const server = require('../');

const UserModel = {
  name: 'Kaligo',
  email: 'kaligo@gmail.com.br',
  appleID: 'e942da463aa9ed6c864bc51a7960de922db8bd6c',
  _id: '507f191e810c19729de860ea',
};

describe('Login', function() {
  it('Create User', function(done) {
    request(server)
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
