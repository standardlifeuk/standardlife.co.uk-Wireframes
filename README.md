standardlife.co.uk Wireframes
=============================

To run this app you will need to install these first:
- [Node](http://nodejs.org/)
- [NPM](https://www.npmjs.org/)
- [Gulp](http://gulpjs.com/)

Once you have them installed, navigate to the project's root directory in a terminal window and run:

```bash
$ gulp watch
```

This will start up a local webserver at http://localhost:9000 and watch for changes. 

Gulp will: 
- Compile the [Assemble](http://assemble.io/) templates to HTML
- Compile the [Sass](http://sass-lang.com/) to CSS
- Check the Javascript syntax using [JSHint](http://www.jshint.com/), concatenate scripts and minify *[this needs work]*
- Optimize images
- Automatically reload any browsers with the site running whenever changes are made
- Use [BrowserSync](http://www.browsersync.io/) to sync any browsers with the site running so if you perform and action (like clicking a link) in one browser, that action will be performed in all browsers
- Some other good stuff that needs documented

To output your project for deployment/distribution, run: 

```bash
$ gulp
```

This will compile everything you need into the `dist` directory.