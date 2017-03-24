const layout = require('./layout');
const element = require('./element');
const group = require('./group');

element.belongsTo(layout);
layout.hasMany(element);

layout.belongsTo(group);
group.hasMany(layout)

module.exports = {
  element: element,
  layout: layout,
  group: group,
}