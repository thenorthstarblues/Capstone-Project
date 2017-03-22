const layout = require('./layout');
const element = require('./element');

element.belongsTo(layout);  //belongsToMany?
layout.hasMany(element);

module.exports = {
  element: element,
  layout: layout
}