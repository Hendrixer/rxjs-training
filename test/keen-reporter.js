const user = require('../training.json')
const keen = require('./keen')
const pJSON = require('../package.json')

if (!user.first_name && !user.last_name) {
  console.error('You must add your first_name and last_name to training.json please')
  process.exit(1)
}

const {Spec} = require('mocha/lib/reporters')
const og = process.exit.bind(process)


process.exit = console.log.bind(console)

class KeenReporter extends Spec {
  constructor(runner) {
    super(runner)
    
    this.keenEvents = {
      fail: [],
      complete: []
    }

    this.runner = runner
    this.currentSuiteTitle = ''
    this.runner.on('fail', this.onFail.bind(this))
    this.runner.on('end', this.onEnd.bind(this))
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

  onFail(a) {
    this.keenEvents.fail.push({
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
    this.keenEvents.complete.push({
      curriculum: pJSON.name,
      first_name: user.first_name,
      last_name: user.last_name,
      total_tests: this.stats.tests,
      passes: this.stats.passes,
      failures: this.stats.failures,
      skipped: this.stats.pending,
      performance: (this.stats.passes / this.stats.tests) * 100
    })

    keen.recordEvents(this.keenEvents, () => {
      og()
    })
  }
} 

module.exports = KeenReporter


