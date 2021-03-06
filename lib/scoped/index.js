module.exports = scoped

var EventEmitter = require('events').EventEmitter

function scoped (state, api, type) {
  var emitter = new EventEmitter()

  var scopedApi = {
    add: require('./add').bind(null, type, api),
    find: require('./find').bind(null, type, api),
    findOrAdd: require('./find-or-add').bind(null, type, api),
    findAll: require('./find-all').bind(null, type, api),
    update: require('./update').bind(null, type, api),
    updateOrAdd: require('./update-or-add').bind(null, type, api),
    updateAll: require('./update-all').bind(null, type, api),
    remove: require('./remove').bind(null, type, api),
    removeAll: require('./remove-all').bind(null, type, api),
    on: function (eventName, handler) {
      emitter.on(type + ':' + eventName, handler)

      return scopedApi
    },
    one: function (eventName, handler) {
      emitter.once(type + ':' + eventName, handler)

      return scopedApi
    },
    off: function (eventName, handler) {
      emitter.removeListener(type + ':' + eventName, handler)

      return scopedApi
    }
  }

  api.on('change', require('../utils/handle-type-change').bind(null, state, emitter, type))

  return scopedApi
}
