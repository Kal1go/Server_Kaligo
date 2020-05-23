const request = require('supertest');
const app = require('../app');


const UserModel = {
  name: 'Kaligo',
  email: 'kaligoTest@gmail.com.br',
  level: '0',
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
  userName: UserModel.name,
  userLevel: UserModel.level,
  userID: UserModel._id,
  steps: [{
    title: 'Step 1',
    description: 'Isso descreve o passo',
    url: 'www.google.com',
    number: 1,
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
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Create', function(done) {
    request(app)
        .post('/api/list/create')
        .send(ListModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Read All', function(done) {
    request(app)
        .get('/api/list/get/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Read By ID', function(done) {
    request(app)
        .get(`/api/list/${ListModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Update', function(done) {
    request(app)
        .post('/api/list/update')
        .send(ListModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Delete by _id', function(done) {
    request(app)
        .get(`/api/list/delete/${ListModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Delete all', function(done) {
    request(app)
        .delete(`/api/list/delete`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
  it('Delete User', function(done) {
    request(app)
        .delete(`/api/user/delete/${UserModel._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          done(res.body.success ? null : res.body.message);
        });
  });
});
