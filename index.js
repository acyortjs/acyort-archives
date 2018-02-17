const { archives = {} } = acyort.config
acyort.builder.register([archives.template || 'archives'])

acyort.extend.register('after_process', require('./lib/processor').bind(acyort))
acyort.extend.register('after_build', require('./lib/generator').bind(acyort))
