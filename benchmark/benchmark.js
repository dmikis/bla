// The number of requests being sent to the server.
var REQUESTS_NUMBER = 20;

window.onload = function () {
    setHtml('requests-number', REQUESTS_NUMBER);
    runBenchmark(false, function (batchTime) {
        setHtml('batch', batchTime);
        runBenchmark(true, function (noBatchTime) {
            setHtml('no-batch', noBatchTime);
        });
    });
};

/**
 * @param {Boolean} disableBatch
 * @param {Function} fn Callback function is invoked with the benchmark duration time.
 */
function runBenchmark(disableBatch, fn) {
    var api = new bla.Api('/api/', {disableBatch: disableBatch});
    var startTime = new Date();
    var counter = 0;
    var i = REQUESTS_NUMBER;
    while (i) {
        api.exec('ping')
            .then(function () {
                if (++counter === REQUESTS_NUMBER) {
                    fn(new Date() - startTime);
                }
            })
            .done();
        i--;
    }
}

/**
 * @param {String} elementId
 * @param {String} value
 */
function setHtml(elementId, value) {
    document.getElementById(elementId).innerHTML = value;
}
