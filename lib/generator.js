const pathFn = require('path')

function generator(data) {
  const {
    fs,
    config,
    helper: { methods },
    renderer,
    logger,
  } = this
  const {
    base,
    public_dir,
    theme,
  } = config

  renderer.compile([{
    tag: 'archives',
    path: pathFn.join(base, 'themes', theme, 'layout', 'archives.html')
  }])

  function output(page) {
    const tag = 'archives'
    const data = Object.assign({ page, config }, methods)
    const fileString = renderer.render('swig', { tag, data })

    if (fileString) {
      fs.outputFileSync(pathFn.join(base, public_dir, page.path), fileString)
      logger.success(page.path)
    }
  }

  if (data.paginations.archives) {
    data.paginations.archives.forEach(p => output(p))
  }
}

module.exports = generator
