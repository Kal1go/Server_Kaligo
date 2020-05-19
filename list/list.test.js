const request = require('supertest');
const app = require('../app');

const ListModel = {
  title: 'Titulo 1',
  description: 'Aqui vai uma descricao',
  category: 'Enem',
  numberOfForks: 0,
  type: 'Playlist',
  _id: '5ec44b25af70800e55aa8bc1',
  steps: [{
    title: 'Step 1',
    description: 'Isso descreve o passo',
    url: 'www.google.com',
    _id: '5ec44553684a1c0aa955b09d',
  }],
};

describe('Lists', function() {
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
});
