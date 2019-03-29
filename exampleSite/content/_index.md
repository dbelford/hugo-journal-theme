# Journal

This is a **hugo theme** to render folders of markdown. A a cross between a blog and a "docs" website. 

Think of it like an Evernote or Bear notes. This journal should be a quick way
to take folders of markdown and render them into a webpage.

As long as you honor the basic file structure, there should be zero configuration
necessary.

# Organization

The `content` folder of the site should contain separate journals of markdown. I.e.:

- Journal of Personal Notes
- Journal of Project A Notes
- Journal of Project B Notes
- Journal of Family Notes

Within any journal there should be collections of notes

- Journal of Personal Notes/
- Journal of Project A Notes/
    - Car Parts Purchases/
        - 2019 Purchases.md
        - 2018 Purchases.md
        - 2013 Purchases.md
    - Rebuild Notes/
        - 2002 Diagrams.md
        - BMW Owners Manual.md
        - Progress.md
    - Other Builders/
        - John's Rebuild.md
        - Gary's Rebuild.md
        - Successes.md
- Journal of Project B Notes/
- Journal of Family Notes/

Within any file, the markdown headers will be parsed and
used as a table of contents.

This structure allows you to
make very long notes in a single file, or spread them out
across many files. As long as any family of notes maintains
a similar hierarchy, you should be able to put multiple 
journals in the root content folders, and then have an
easy site to navigate them all in.

## Folder Pages

Any folder can contain an `_index.md` to create a landing
page for that folder.

## Non-Markdown

Because this is based on Hugo, all static assets (ones that Hugo
won't process) go into a separate folder called static. In that
folder you should probably honor the basic journal structure of
putting all assets related to the journal in a folder named for
the project. Then you can `rsync` the markdown and the
assets (audio, images, pdfs) into the right place while just using
hugo's development environment to serve them.

# Future Plans

Hopefully be able to edit in place via a server. Wonder if there's
a `golang` option that supports this out of the box?
