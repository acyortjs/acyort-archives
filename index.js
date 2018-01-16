acyort.extend.register('after_init', require('./lib/init').bind(acyort))
acyort.extend.register('after_process', require('./lib/processor').bind(acyort))
acyort.extend.register('after_build', require('./lib/generator').bind(acyort))
