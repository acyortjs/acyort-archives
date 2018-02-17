function generator(data) {
  const {
    config: { archives },
    server: { status },
  } = this

  if (!archives) {
    return data
  }

  const { template = 'archives' } = archives

  if (
    !status.path ||
    status.path.indexOf(`${template}.html`) > -1 ||
    status.path.indexOf('/partials/') > -1 ||
    status.path.indexOf('.yml') > -1 ||
    status.path.indexOf('/layout.html') > -1
  ) {
    data.archives.forEach(p => this.builder.output(template, p.path, p))
  }

  return data
}

module.exports = generator
