# acyort-archives

[![Build Status](https://travis-ci.org/acyortjs/acyort-archives.svg?branch=master)](https://travis-ci.org/acyortjs/acyort-archives)
[![codecov](https://codecov.io/gh/acyortjs/acyort-archives/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/acyort-archives)

Archives for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-archives -S
```

## Usage

```yml
# config.yml

plugins
  - acyort-archives

archives:
  per_page: 5         # or 0
  template: archives  # custome template, default is archives
  path: archives      # custom path, default is archives
  title: archives     # custom title, default is archives
```

```html
<!-- template archives example -->
<div class="archives">
  {% for post in page.posts %}

  {% if !post.id  %}
    <h3 class="year">{{ post }}</h3>
  {% else %}
    <p>
      <span>{{ _time(post.created, 'MM-DD') }}</span>
      <a href="{{ _url(post.url) }}">{{ post.title }}</a>
    </p>
  {% endif %}

  {% endfor %}
</div>

<div class="pagination">
  {% if page.prev %}
  <a rel="prev" href="{{ _url(page.prev) }}">{{ _url(page.prev) }}</a>
  {% endif %}

  <span>{{ page.current }}</span>
  /
  <span>{{ page.total }}</span>

  {% if page.next %}
  <a rel="next" href="{{ _url(page.next) }}">{{ _url(page.next) }}</a>
  {% endif %}
</div>

```
