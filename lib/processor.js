const path = require('path')
const pagination = require('acyort-pagination')

function processor(data) {
  const { archives, order } = this.config

  if (archives) {
    return data
  }

  const { _time } = this.helper.methods
  const { posts } = data
  const { per_page: perpage } = archives
  const base = 'archives'
  const pages = pagination({
    base,
    perpage,
    posts,
    title: 'archives',
  })

  pages.forEach((page) => {
    const result = []
    let year

    page.posts.forEach((post) => {
      const current = _time(post[order], 'YYYY')
      if (year !== current) {
        year = current
        result.push({ type: 'time', data: current })
      }
      result.push({ type: 'post', data: post })
    })

    page.posts = result
  })

  data.archives = pages
  return data
}

module.exports = processor
