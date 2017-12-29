const path = require('path')

function getPath(page = 1) {
  if (page === 1) {
    return path.join('/', 'archives', 'index.html')
  }
  return path.join('/', 'archives', page.toString(), 'index.html')
}

function getPostIds(posts) {
  return posts.map(post => post.id)
}

function getPrev(root, page) {
  if (page === 1) {
    return ''
  }
  if (page === 2) {
    return path.join(root, 'archives', '/')
  }
  return path.join(root, 'archives', (page - 1).toString(), '/')
}

function getNext(root, page) {
  return path.join(root, 'archives', (page + 1).toString(), '/')
}

function processor(data) {
  const { archives, root } = this.config

  if (!archive) {
    return data
  }

  const posts = getPostIds(data.posts)
  const perpage = archives.per_page
  const pagination = []
  const total = perpage === 0 ? 1 : Math.ceil(posts.length / perpage)

  let page = 1

  if (perpage === 0 || posts.length <= perpage) {
    return [{
      name,
      prev: '',
      next: '',
      posts,
      path: getPath(),
      current: 1,
      total: 1,
    }]
  }

  for (let i = 0; i < posts.length; i += perpage) {
    pagination.push({
      name,
      prev: this.getPrev(root, page),
      next: this.getNext(root, page),
      posts: posts.slice(i, i + perpage),
      path: getPath(page),
      current: page,
      total,
    })

    if (page === total) {
      pagination[page - 1].next = ''
    }

    page += 1

    data.paginations.archives = pagination
  }
}

module.exports = processor
