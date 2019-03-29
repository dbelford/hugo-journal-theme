# Hugo Journal Theme

This is a theme for turning markdown into a journalish interface
a la the current style of docs websites in 2018. [See it in action](https://journal.dbelford.com).

# Usage

1. `hugo server` to develop locally
2. `hugo` to build site to `public`

## Setup Search Support

1. In your `config.toml`, add the key `JSON` to the `outputs/home` array
```
...
[outputs]
  home = ["HTML", "RSS", "JSON"]
```
2. Add the **theme's** `content/search.md` to **your** content folder in `content/search.md` (Hugo does not auto copy this.)
3. Now hugo will build a `search.json` file that `fuse.js` uses as the search index


# Organization

This generally follows Hugo patterns (but I'm not familiar with Hugo, so some things may be off).

1. Markdown goes into the `content` folder of the project's root directory
2. Static assets go into the `static` folder of the projects root directory
3. `Hugo` will render files in `content` and serve `static` from site root, so all urls in markdown
   need to be relative to themselves, or absolute paths without `content` or `static` in the url.
   - E.g. an image in `static/journal/img/2019/mountains.jpg` 
     - the image will be at `/journal/img/2019/mountains.jpg` 
   - E.g. markdown in `content/journal/site-seeing.md` 
     - the html will be at `/journal/site-seeing/`
     - the image will be at `../../img/2019/mountains.jpg` or same absolute location above
   - Use relative images and links in your markdown for more portability (incase you change folder names)

See the `exampleSite` folder for details. Run it with `hugo server --disableFastRender --ignoreCache --noHTTPCache`
from the theme folder.

# Editing Theme

From theme folder run

`hugo server --disableFastRender --ignoreCache --noHTTPCache`

# Notes

- Search roughly based on [eddiewebb's](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae) gist

# Todo

- [ ] Consider adding `shortcodes` support or deleting broken `shortcodes`
- [ ] Look for way to have hugo treat `main.md` as `_index.md`