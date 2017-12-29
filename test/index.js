const assert = require('power-assert')
const fs = require('fs')
const path = require('path')
const Acyort = require('acyort')
const { defaults } = require('acyort-config')

const config = defaults

config.base = __dirname
config.cache =  true
config.url = 'http://acyort.com'
config.scripts = ['archives.js']
config.scripts_dir = '/'
config.archives = {}

new Acyort(config).build()
