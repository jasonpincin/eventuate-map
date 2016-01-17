var isPromise = require('is-promise')

module.exports = producerFactory

function producerFactory (options, map) {
    return function each (value) {
        var self = this

        if (map.length === 2) map(value, cb)
        else {
            var result = map(value)
            if (isPromise(result)) result.then(mapResult, error)
            else mapResult(result)
        }

        function mapResult (mappedValue) {
            self.produce(mappedValue).finish()
        }

        function error (err) {
            self.produceError(err).finish()
        }

        function cb (err, mappedValue) {
            if (err) error(err)
            else mapResult(mappedValue)
        }
    }
}
