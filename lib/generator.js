const pathFn = require('path')

function generator(data) {
  const {
    config: { archives },
    server: { status },
  } = this

  if (!archives) {
    return data
  }

  const { template = 'archives' } = archives

  if (status && status.path.indexOf(`${template}.html`) === -1) {
    return data
  }

  this.builder.compile(template)
  data.archives.forEach(p => this.builder.output(template, p.path, p))

  return data
}

module.exports = generator
