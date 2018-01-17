const assert = require('power-assert')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const path = require('path')
const sinon = require('sinon')
const Acyort = require('acyort')
const { defaults } = require('acyort-config')

const config = defaults

config.base = __dirname
config.cache =  true
config.scripts = ['archives.js']
config.scripts_dir = '/'

function text(path, tag) {
  const html = fs.readFileSync(path)
  const $ = cheerio.load(html)
  return $(tag).text().trim()
}

function dir(tag) {
  return path.join(__dirname, tag, 'index.html')
}

function sleep(t = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

describe('archives', () => {
  it('no set archives', async function () {
    this.timeout(5000)
    fs.removeSync(path.join(__dirname, 'archives'))
    await new Acyort(config).build()
    assert(fs.existsSync(path.join(__dirname, 'archives')) === false)
  })

  it('set archives', async function () {
    this.timeout(5000)
    config.archives = { per_page: 4 }

    await new Acyort(config).build()

    assert(text(dir('archives'), 'p a') === [
      'js 使用 setTimeout 排序',
      'AcyOrt - 基于 Node.js 博客生成程序',
      'Vue JSON 博客(AcyOrt/Vue/Vuex/Webpack)',
      '不依赖服务端实现 react-router 的 browserHistory'
    ].join(''))

    assert(text(dir('archives/page/2'), '.pagination a') === [
      '/archives/',
      '/archives/page/3/'
    ].join(''))
  })

  it('liveReload', async function () {
    this.timeout(10000)
    config.archives = { per_page: 4 }

    const pageTpl = fs.readFileSync(path.join(__dirname, '/themes/ccc45/layout/page.html'))
    const archivesTpl = fs.readFileSync(path.join(__dirname, '/themes/ccc45/layout/archives.html'))

    const acyort = new Acyort(config)
    await acyort.start()

    await sleep(1000)

    const spy = sinon.spy(acyort.builder.logger, 'success')

    fs.writeFileSync(path.join(__dirname, '/themes/ccc45/layout/page.html'), pageTpl)
    await sleep(1000)

    assert(spy.calledWith('/about/index.html') === true)

    fs.writeFileSync(path.join(__dirname, '/themes/ccc45/layout/archives.html'), archivesTpl)
    await sleep(1000)

    assert(JSON.stringify(spy.args) === JSON.stringify([ [ '/about/index.html' ],
  [ 'archives/index.html' ],
  [ 'archives/page/2/index.html' ],
  [ 'archives/page/3/index.html' ] ]))

    process.exit(0)
  })
})
