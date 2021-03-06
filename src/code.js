import Rx from 'rxjs/Rx'

export const createObservable = (cb) => {
  return Rx.Observable.create(observer => {
    cb((e, v) => {
      if (e) {
        observer.error(e)
      } else {
        observer.next(v)
        observer.complete()
      }
    })
  })
}


export const mapData = (array = []) => {
  return Rx.Observable.from(array)
  .filter(n => !isNaN(parseFloat(n)) && isFinite(n))
  .map(n => n * 2)
}


export const unsub = (o) => {
  return o
  .takeWhile(v => v % 2 === 0)
}


export const mergeData = (o1, o2) => {
  return o1
  .mergeMap(v => o2(v))
}
