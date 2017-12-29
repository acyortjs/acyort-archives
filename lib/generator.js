const pathFn = require('path')

function generator(data) {
  const {
    fs,
    config,
    helper: { methods },
    renderer,
    logger,
  } = this
  const { base, public_dir } = config

  function output(page) {
    const tag = 'archives'
    const data = Object.assign({ page, config }, methods)
    const fileString = renderer.render('swig', { tag, data })

    if (fileString) {
      fs.outputFileSync(pathFn.join(base, public_dir, page.path), fileString)
      logger.success(page.path)
    }
  }

  data.paginations.archives.forEach(p => output(p))
}

module.exports = generator
