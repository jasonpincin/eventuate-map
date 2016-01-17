var test      = require('tape'),
    eventuate = require('eventuate-core'),
    map       = require('..')(eventuate),
    Promise   = require('promise-polyfill')

test('supports async callbacks', function (t) {
    t.plan(1)

    var event = eventuate()
    var times2 = map(event, function (v, done) {
        setImmediate(done, null, v * 2)
    })

    times2.consume(function (v) {
        t.equal(v, 4)
    })

    event.produce(2)
})

test('supports promises', function (t) {
    t.plan(1)

    var event = eventuate()
    var times2 = map(event, function (v) {
        return new Promise(function (resolve) {
            setImmediate(resolve, v * 2)
        })
    })

    times2.consume(function (v) {
        t.equal(v, 4)
    })

    event.produce(2)
})

test('produces error on callback errors', function (t) {
    t.plan(1)

    var event = eventuate()
    var times2 = map(event, function (v, done) {
        setImmediate(done, new Error('boom'))
    })

    times2.consume(function (v) {
        t.fail('should not produce data')
    }, function (err) {
        t.ok(err instanceof Error, 'is an error')
    })

    event.produce(2)
})

test('produces error on promise rejection', function (t) {
    t.plan(1)

    var event = eventuate()
    var times2 = map(event, function (v) {
        return new Promise(function (resolve, reject) {
            setImmediate(reject, new Error('boom'))
        })
    })

    times2.consume(function (v) {
        t.fail('should not produce data')
    }, function (err) {
        t.ok(err instanceof Error, 'is an error')
    })

    event.produce(2)
})
