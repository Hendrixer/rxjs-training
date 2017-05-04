import { App } from './app'
import {expect} from 'chai'
import * as sinon from 'sinon'

describe('App here', () => {
  describe('Nested app', () => {
    it('should add', () => {
      const app = new App()

    expect(app.add(2)).to.equal(2)
    })
  })
})
