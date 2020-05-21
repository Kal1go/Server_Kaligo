const request = require('supertest');
const app = require('../app');


const UserModel = {
  name: 'Kaligo',
  email: 'kaligoTest@gmail.com.br',
  appleID: 'e942da463aa9123123ed6c864bc51a7960de922db8bd6c',
  _id: '5ec5ccce17f3910017620772',
};

const ListModel = {
  title: 'Titulo 1',
  description: 'Aqui vai uma descricao',
  category: 'Enem',
  numberOfForks: 0,
  type: 'Playlist',
  _id: '507f191e810c19729de860ea',
  userID: UserModel._id,
  steps: [{
    title: 'Step 1',
    description: 'Isso descreve o passo',
    url: 'www.google.com',
    _id: '5ec44553684a1c0aa955b09d',
  }],
};

describe('Lists', function() {
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
  it('Create', function(done) {
    request(app)
        .post('/api/list/create')
        .send(ListModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Read All', function(done) {
    request(app)
        .get('/api/list/get/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Read By ID', function(done) {
    request(app)
        .get(`/api/list/${ListModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Update', function(done) {
    request(app)
        .post('/api/list/update')
        .send(ListModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Delete by _id', function(done) {
    request(app)
        .delete(`/api/list/delete/${ListModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Delete all', function(done) {
    request(app)
        .delete(`/api/list/delete`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
  it('Delete User', function(done) {
    request(app)
        .delete(`/api/user/delete/${UserModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
});
