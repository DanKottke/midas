midas [![Build Status](https://travis-ci.org/Innovation-Toolkit/midas.png?branch=master)](https://travis-ci.org/Innovation-Toolkit/midas) [![Dependency Status](https://gemnasium.com/Innovation-Toolkit/midas.png)](https://gemnasium.com/Innovation-Toolkit/midas)
=====

Innovation platform providing collaboration and crowdsourcing tools, developed in Node.js.

## Installation

Clone the git repository.

     git clone https://github.com/Innovation-Toolkit/midas.git

Copy the main settings files and edit them.

     cd config
     cp local.ex.js local.js

Copy the module settings files and edit.

     cd config/settings
     cp auth.ex.js auth.js
     cp sources.ex.js sources.js

Lift sails from the main directory.

     sails lift

### Forked Libraries

This project uses forked repositories and libaries, which you will
need to `npm link` in order for everything to function properly.

- [sails-postgresql](https://github.com/Innovation-Toolkit/sails-postgresql). Forked to provide soft deletes and support binary objects.  `git clone https://github.com/Innovation-Toolkit/sails-postgresql.git`

## Development

This project follows the [git flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model of product development.

### Backbone

- [Midas Backbone Best Practices](https://github.com/Innovation-Toolkit/midas/wiki/Backbone-Best-Practices).
- [Modal Component Usage](https://github.com/Innovation-Toolkit/midas/wiki/Modal-Component)
- [Models and Collections](https://github.com/Innovation-Toolkit/midas/wiki/Model-&-Collections)

### Git Hooks

When working in the development environment, be sure to install the project specific git hooks.

     tools/git_hooks/create-sym-links

### Code Style

Generally try to follow the [Google Javascript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).  Spaces should be used instead of tabs, and the tab width should be set to 2 spaces.  No spaces at the end of lines.

### Commit Messages

Treat commit messages as an email message that describes what you changed and why.

The first line of the commit log must be treated as as an email
subject line.  It must be strictly no greater than 50 characters long.
The subject must stand on its own and not only make external
references such as to relevant bug numbers.

The second line must be blank.

The third line begins the body of the commit message (one or more
paragraphs) describing the details of the commit.  Paragraphs are each
separated by a blank line.  Paragraphs must be word wrapped to be no
longer than 76 characters.

The last part of the commit log should contain all "external
references", such as which issues were fixed.

## License

This project constitutes an original work of the United States Government.

You may use this project under the MIT License.
