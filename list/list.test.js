const request = require('supertest');
const app = require('../app');

const ListModel = {
  title: 'Titulo 1',
  description: 'Aqui vai uma descricao',
  category: 'Enem',
  numberOfForks: 0,
  type: 'Playlist',
  _id: '',
  setps: [{
    title: 'Step 1',
    description: 'Isso descreve o passo',
    url: 'www.google.com',
  }],
};

describe('Lists', function() {
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
        .send(ListModel)
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
        .send(ListModel)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
});
