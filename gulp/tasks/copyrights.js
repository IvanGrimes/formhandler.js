const package = require('../../package.json'),
  date = {
    day: new Date().getDate(),
    month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
    year: new Date().getFullYear(),
  };

module.exports = `${`
/**
 * FormHandler ${package.version}
 * ${package.description}
 * ${package.homepage}
 *
 * Copyright ${date.year} ${package.author}
 *
 * Released under the ${package.license} License
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim()}\n`;
