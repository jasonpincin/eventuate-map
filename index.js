var chainable       = require('eventuate-chainable'),
    producerFactory = require('./lib/producer-factory')

module.exports = eventuateMapFactory
function eventuateMapFactory (Super) {
    var EventuateMap = chainable(Super, producerFactory)

    function eventuateMap (upstream, options, map) {
        return new EventuateMap(upstream, options, map)
    }
    eventuateMap.constructor = EventuateMap
    return eventuateMap
}
