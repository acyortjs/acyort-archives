const pathFn = require('path')

function generator(data) {
  const {
    fs,
    config,
    helper: { methods },
    renderer,
    logger,
  } = this
  const { base, theme } = config
  const tpl = pathFn.join(base, 'themes', theme, 'layout', 'archives.html')

  if (fs.existsSync(tpl)) {
    renderer.compile([{ tag: 'archives', path: tpl }])
  }

  function output(page) {
    const tag = 'archives'
    const pageData = Object.assign({ page, config }, methods)
    const fileString = renderer.render('swig', { tag, data: pageData })

    if (fileString) {
      fs.outputFileSync(pathFn.join(base, config.public_dir, page.path), fileString)
      logger.success(page.path)
    }
  }

  if (data.paginations.archives) {
    data.paginations.archives.forEach(p => output(p))
  }
}

module.exports = generator
