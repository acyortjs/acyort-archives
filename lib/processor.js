const pagination = require('acyort-pagination')

function processor(data) {
  const { archives, order } = this.config

  if (!archives) {
    return data
  }

  const { _time } = this.helper.methods
  const { posts } = data
  const {
    per_page: perpage,
    path = 'archives',
    title = 'archives',
  } = archives
  const pages = pagination({
    base: path,
    perpage,
    posts,
    title,
  })

  pages.forEach((page) => {
    const result = []
    let year

    page.posts.forEach((post) => {
      const current = _time(post[order], 'YYYY')
      if (year !== current) {
        year = current
        result.push(current)
      }
      result.push(post)
    })

    page.posts = result
  })

  data.archives = pages
  return data
}

module.exports = processor
