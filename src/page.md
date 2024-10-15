---
pagination:
    data: sanity.page
    size: 1
    alias: data
permalink: "/{{ data.slug.current }}/"
layout: layouts/inner_default.liquid
eleventyComputed:
    eleventyNavigation:
        key: "{{ data.title }}"
        parent: "Research"
    navOptions:
        includeSelf: true
---
