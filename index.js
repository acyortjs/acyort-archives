const { archives = {} } = acyort.config
acyort.template.register([archives.template || 'archives'])
acyort.filter.register('after_process', require('./lib/processor').bind(acyort))
acyort.filter.register('after_build', require('./lib/generator').bind(acyort))
