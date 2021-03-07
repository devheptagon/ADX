const slugify = require('slugify');

function slug(str) {
  if (str !== undefined && str !== null) {
    const result = slugify(str.replace("_", "-"), {
      replacement: '-',
      remove: /[*+~.()'"!/?:@]/g,
      lower: true,
      strict: true,
      locale: 'en'
    })
    return result
  }
}

module.exports = slug