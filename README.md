# Hugo Journal Theme

This is a theme for turning markdown into a journalish interface
a la the current style of docs websites in 2018.

# Setup

1. Add `JSON` to your `config.toml` to support search
```
...
[outputs]
  home = ["HTML", "RSS", "JSON"]
```
(based on [eddiewebb's](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae) gist)
2. Add the theme's `content/search.md` to your content folder in `content/search.md` (Hugo does not auto copy this.)
