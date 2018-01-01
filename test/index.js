const assert = require('power-assert')
const fs = require('fs')
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
config.archives = { per_page: 2 }

new Acyort(config).build()
