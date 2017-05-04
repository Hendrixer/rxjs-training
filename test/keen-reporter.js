const user = require('../training.json')
const keen = require('./keen')
const pJSON = require('../package.json')

if (!user.first_name && !user.last_name) {
  console.error('You must add your first and last name to training.json please')
  process.exit(1)
}

const {Spec} = require('mocha/lib/reporters')
const og = process.exit.bind(process)


process.exit = console.log.bind(console)

class KeenReporter extends Spec {
  constructor(runner) {
    super(runner)
    
    this.events = {
      test: [],
      start: []
    }

    this.runner = runner
    this.currentSuiteTitle = ''
    this.runner.on('pass', this.onPass.bind(this))
    this.runner.on('fail', this.onFail.bind(this))
    this.runner.on('end', this.onEnd.bind(this))
    this.runner.on('start', this.onStart.bind(this))
    this.runner.on('suite', (suite) => {
      this.currentSuiteTitle = this.getSuiteTitle(suite)
    })
  }

  getSuiteTitle(suite, title = '') {
    const titleResult = `.${suite.title}${title}`

    if (suite.parent && suite.parent.title) {
      return this.getSuiteTitle(suite.parent, titleResult)
    }
    return titleResult
  }

  onStart() {
    this.events.start.push({
      curriculum: pJSON.name,
      first_name: user.first_name,
      last_name: user.last_name
    })
  }

  onPass(a) {
    this.events.test.push({
      curriculum: pJSON.name,
      first_name: user.first_name,
      last_name: user.last_name,
      suite: this.currentSuiteTitle,
      title: a.title,
      pass: true,
      fail: false
    })
  }

  onFail(a) {
    this.events.test.push({
      curriculum: pJSON.name,
      first_name: user.first_name,
      last_name: user.last_name,
      suite: this.currentSuiteTitle,
      title: a.title,
      pass: false,
      fail: true
    })
  }

  onEnd () {
    keen.recordEvents(this.events, () => {
      og()
    })
  }
} 

module.exports = KeenReporter


