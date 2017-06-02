import * as code from './code'
import Rx from 'rxjs/Rx'

describe('Rxjs', () => {
  describe('#createObservable', () => {
    it('should be a function', () => {
      expect(code.createObservable).to.be.a('function')
    })

    it('should emit error if callback has error', done => {
      code.createObservable(nodeFunc(23, 'error here'))
      .subscribe(noop, (e) => {
        expect(e).to.be.ok
        done()
      }, done)
    })

    it('should emit the value from the callback an complete', done => {
      code.createObservable(nodeFunc('hello there'))
      .subscribe(v => expect(v).to.equal('hello there'), noop, done)
    })
  })

  describe('#mapData', () => {
    it('should be a function', () => {
      expect(code.mapData).to.be.a('function')
    })

    it('observable should return numbers', done => {
      code.mapData([1,2,3])
      .subscribe(d => {
        expect(d).to.be.a('number')
      }, noop, done)
    })

    it('all numbers should be multiplied by 2', done => {
      const results = []
      code.mapData([1,2,3,4,5,6])
      .subscribe(n => results.push(n), noop, () => {
        expect(results).to.eql([2,4,6,8,10,12])
        done()
      })
    })

    it('should not error if an item is not a number', done => {
      code.mapData([1,2,'hello', 4])
      .subscribe(noop, (e) => {
        expect(e).to.not.be.ok
      }, done)
    })

    it('should not error if no input is given', done => {
      code.mapData()
      .subscribe(noop, (e) => {
        expect(e).to.not.be.ok
      }, done)
    })
  })

  describe('#unsub', () => {
    it('should be a function', () => {
      expect(code.unsub).to.be.a('function')
    })

    it('should not unsub if all items are even', done => {
      code.unsub(Rx.Observable.from([2,4,6]))
      .bufferCount(3)
      .subscribe(vals => expect(vals).to.eql([2,4,6]), noop, done)
    })

    it('should unsub when a number is odd', done => {
      const vals = [] 
      code.unsub(Rx.Observable.from([2,4,3,6]))
      .subscribe(v => vals.push(v), noop, () => {
        expect(vals).to.eql([2,4])
        done()
      })
    })

  })
  describe('#mergeData', () => {
    it('should be a function', () => {
      expect(code.mergeData).to.be.a('function')
    })

    it('should pass the value from the first observable to the second one for merging', done => {
      code.mergeData(Rx.Observable.from([20]), createO(30, (users, v) => {
        return [users + v]
      }))
      .subscribe(v => {
        expect(v).to.equal(50)
      }, noop, done)
    })
  })
})

function noop () {}

function createO (v, cb) {
  return function(val) {
    return Rx.Observable.from(cb(val, v))
  }
}


function nodeFunc (v,e) {
  return function(cb) {
    if (e) {
      cb(e, null)
    } else {
      cb(null, v)
    }
  }
}
