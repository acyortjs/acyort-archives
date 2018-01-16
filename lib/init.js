function init() {
  const { archives } = this.config
  if (!archives) {
    return false
  }
  return this.builder.addTags([archives.template || 'archives'])
}

module.exports = init
