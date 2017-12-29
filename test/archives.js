const processor = require('../lib/processor')
const generator = require('../lib/generator')

acyort.extend.register('after_process', processor.bind(acyort))
acyort.extend.register('after_build', generator.bind(acyort))
