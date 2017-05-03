const add = require('./app')

describe('Testing here', () => {
  it('should test', () => {
    expect(add(2)).to.equal(7)
  })
  it('should test', () => {
    expect(add(2)).to.equal(4)
  })
})
