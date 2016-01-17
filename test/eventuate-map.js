var test        = require('tape'),
    eventuate   = require('eventuate-core'),
    map         = require('..')(eventuate)

test('should be a function', function (t) {
    t.equal(typeof map, 'function')
    t.end()
})

test('eventuate map', function (t) {
    t.plan(2)

    var event = eventuate()
    var multiplyTen = map(event, function (v) { return v * 10 })

    var eventCount = 0
    event(function () {
        eventCount++
    })

    var multiplyTenCount = 0
    var mappedValues = []
    multiplyTen.consume(function (v) {
        mappedValues.push(v)
        multiplyTenCount++
        if (multiplyTenCount === 2) {
            t.deepEqual(mappedValues, [20, 10], 'should give multiplication of 10 in order')
        }
    })

    t.true(multiplyTen.hasConsumer, 'registers consumers()')

    event.produce(2)
    event.produce(1)
})
