import chai from 'chai';
import { request } from '../util';
const should = chai.should();
let layout;

describe('layouts.js', () => {

  describe('/', () => {
    describe('GET', () => {
      describe('As regular organization', () => {
        it('it should give an error', done => {
          request('/layouts')
          .asRegularAdmin()
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('err');
            done();
          });
        });
      });
      describe('As system organization', () => {
        it('it should give list of layouts', done => {
          request('/layouts')
          .asSystemAdmin()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array').length(2);
            done();
          });
        });
      });
    });

    describe('POST', () => {
      describe('As regular organization', () => {
        it('it should give an error', done => {
          request('/layouts', 'POST')
          .asRegularAdmin()
          .send({ queries: ["TESTQUERY1", "TESTQUERY2"] })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('err');
            done();
          });
        });
      });
      describe('As system organization', () => {
        it('it should give the new layout', done => {
          request('/layouts', 'POST')
          .asSystemAdmin()
          .send({ queries: ["TESTQUERY1", "TESTQUERY2"] })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('queries', ["TESTQUERY1", "TESTQUERY2"]);
            res.body.data.should.have.property('permissions');
            res.body.data.permissions.should.be.a('array').length(0);

            layout = res.body.data;
            done();
          });
        });
        it('it should be in the database', done => {
          request('/layouts')
          .asSystemAdmin()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array').length(3);
            done();
          });
        });
      });
    });

  });

  describe('/:lid', () => {
    describe('GET', () => {
      describe('As regular organization', () => {
        it('should give an error', done => {
          request(`/layouts/${layout._id}`)
          .asRegularAdmin()
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('err');
            done();
          });
        });
      });
      describe('As system organization', () => {
        it('should give list of layouts', done => {
          request(`/layouts/${layout._id}`)
          .asSystemAdmin()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id', layout._id);
            res.body.data.should.have.property('name', layout.name);
            res.body.data.should.have.property('permissions');
            res.body.data.permissions.should.be.a('array').length(0);
            done();
          });
        });
      });
    });

    describe('POST', () => {
      describe('As regular organization', () => {
        it('should give an error', done => {
          request(`/layouts/${layout._id}`, 'POST')
          .asRegularAdmin()
          .send({ queries: ["TESTQUERY1", "TESTQUERY3"] })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('err');
            done();
          });
        });
      });
      describe('As system organization', () => {
        it('should give the updated layout', done => {
          request(`/layouts/${layout._id}`, 'POST')
          .asSystemAdmin()
          .send({ queries: ["TESTQUERY1", "TESTQUERY3"] })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id', layout._id);
            res.body.data.should.have.property('queries', ["TESTQUERY1", "TESTQUERY3"]);
            res.body.data.should.have.property('permissions');
            res.body.data.permissions.should.be.a('array').length(0);
            done();
          });
        });
      });
    });

    describe('DELETE', () => {
      describe('As regular organization', () => {
        it('should give an error', done => {
          request(`/layouts/${layout._id}`, 'DELETE')
          .asRegularAdmin()
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'error');
            res.body.should.have.property('err');
            done();
          });
        });
      });
      describe('As system organization', () => {
        it('should give the removed layout', done => {
          request(`/layouts/${layout._id}`, 'DELETE')
          .asSystemAdmin()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_layout', layout._id);
            res.body.data.should.have.property('usersDeleted', 0);
            done();
          });
        });
        it('should be removed from the database', done => {
          request('/layouts')
          .asSystemAdmin()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status', 'success');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array').length(2);
            done();
          });
        });
      });
    });

  });
});
