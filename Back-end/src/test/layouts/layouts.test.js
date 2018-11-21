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
            res.body.data.should.be.a('array').length(0);
            done();
          });
        });
      });
    });
  });
});
