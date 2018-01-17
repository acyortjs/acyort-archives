const assert = require('power-assert')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const path = require('path')
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

describe('archives', () => {
  it('no set archives', async function () {
    this.timeout = 5000
    fs.removeSync(path.join(__dirname, 'archives'))
    await new Acyort(config).build()
    assert(fs.existsSync(path.join(__dirname, 'archives')) === false)
  })

  it('set archives', async function () {
    this.timeout = 5000
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
})
