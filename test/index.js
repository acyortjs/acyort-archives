const assert = require('power-assert')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const path = require('path')
const Acyort = require('acyort')
const { defaults } = require('acyort-config')

const config = defaults

config.title = 'AcyOrt'
config.description = 'A Node.js blog tool powered by GitHub.'
config.user = 'LoeiFy'
config.repository = 'Recordum'
config.menu = {
  archives: '/archives/'
}
config.base = __dirname
config.cache =  true
config.url = 'http://acyort.com'
config.scripts = ['archives.js']
config.scripts_dir = '/'
config.archives = { per_page: 4 }

function text(path, tag) {
  const html = fs.readFileSync(path)
  const $ = cheerio.load(html)
  return $(tag).text().trim()
}

describe('archives', () => {
  it('width perpage', async () => {
    await new Acyort(config).build()

    assert(
      text(path.join(__dirname, 'archives', '2', 'index.html'), '.menu a') === 'Archives'
    )
    assert(
      text(path.join(__dirname, 'archives', '2', 'index.html'), '.head-tag') === '9 posts in total.'
    )
    assert(
      text(path.join(__dirname, 'archives', '2', 'index.html'), '.entry a') === '记录一下折腾黑苹果过程Adobe CEP 扩展相关Mirror - 基于 issues 的博客工具输入框输入值自动格式化'
    )
    assert(
      text(path.join(__dirname, 'archives', '2', 'index.html'), '#pagination a') === '← NewerOlder →'
    )
    assert(
      text(path.join(__dirname, 'archives', '2', 'index.html'), '.entry span') === '02-0412-1901-1504-28'
    )
  })

  it('no perpage', async () => {
    config.archives = {}
    await new Acyort(config).build()

    assert(
      text(path.join(__dirname, 'archives', 'index.html'), '#pagination span') === '1 / 1'
    )
    assert(
      text(path.join(__dirname, 'archives', 'index.html'), '.entry span') === '07-2205-0104-2102-2602-0412-1901-1504-2804-28'
    )
  })

  it('no set archives', async () => {
    delete config.archives
    fs.removeSync(path.join(__dirname, 'archives'))
    await new Acyort(config).build()

    assert(fs.existsSync(path.join(__dirname, 'archives')) === false)
  })

  it('template wrong', async () => {
    const archivesPath = path.join(__dirname, 'theme/ccc45/layout')

    fs.copySync(path.join(archivesPath, 'archives.html'), path.join(archivesPath, 'archives0.html'))
    fs.removeSync(path.join(archivesPath, 'archives.html'))

    after(() => {
      fs.copySync(path.join(archivesPath, 'archives0.html'), path.join(archivesPath, 'archives.html'))
      fs.removeSync(path.join(archivesPath, 'archives0.html'))
    })

    config.archives = {}
    await new Acyort(config).build()

    assert(fs.existsSync(path.join(__dirname, 'archives')) === false)
  })
})
