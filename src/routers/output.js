var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var IntentRouter = module.exports = (function() {

    IntentRouter.emitter = null;

    function IntentRouter(donna) {
        donna.logger.info("IntentRouter constructor");

        // Initialize Event Emitter
        this.emitter = new EventEmitter();

    }

    IntentRouter.prototype.register = function(intent, handler, cb) {
        this.emitter.on(intent, handler);
        cb();
    };

    IntentRouter.prototype.process = function(intent, context) {
        var deferred = Q.defer();
        this.intentEmitter.emit(intent, this, context, function(err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };

    return IntentRouter;

})();
