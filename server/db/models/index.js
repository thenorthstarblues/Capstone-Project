const layout = require('./layout');
const element = require('./element');

element.belongsTo(layout);
layout.hasMany(element);

module.exports = {
  element: element,
  layout: layout
}