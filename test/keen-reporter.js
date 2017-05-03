const {Spec} = require('mocha/lib/reporters')
const og = process.exit.bind(process)

process.exit = console.log.bind(console)

class KeenReporter extends Spec {
  constructor(runner) {
    super(runner)
    this.runner = runner
    this.passes = 0
    this.failures = 0

    this.runner.on('pass', this.onPass.bind(this))
    this.runner.on('fail', this.onFail.bind(this))
    this.runner.on('end', this.onEnd.bind(this))
    this.runner.on('start', this.onStart.bind(this))
  }

  onStart() {
    console.log('recording start')
  }

  onPass() {
    console.log('recording pass')
  }

  onFail() {
    this.failures++
    console.log('recording fail')
  }

  onEnd() {
    console.log('recording end')
    og()
  }
} 

module.exports = KeenReporter


