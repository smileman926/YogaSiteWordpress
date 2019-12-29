/**
 * OptimizePress3 worker object.
 *
 * To prevent unresponsive page we need to split up heavy
 * function into a number of much smaller self-contained
 * functions.
 *
 * For example, rendering properties at load time for each
 * element is kind an expensive method, so we use AsyncWorker
 * object to handle this. We are not rendering everything at
 * once, but sending chunk by chunk to worker (at "workerready"
 * event). When worker is finished the "op3ready" event will
 * be triggred.
 *
 * For more info read https://github.com/fffilo/async-worker-js
 *
 * Dependencies:
 *     - async-worker.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    // initialize
    var that = new window.AsyncWorker();

    // settings
    //that.jobsPerFrameRequest = 1;
    //that.workOnInactive = true;

    // op3 event trigger
    [ "start", "stop", "break", "job", "framerequest", "complete" ].forEach(function(eventName) {
        that.addEventListener(eventName, function(e) {
            OP3.transmit("worker" + e.eventName, e);
        });
    });

    /**
     * Load designer event handler:
     * link (designer)
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleLoadDesigner = function(e, o) {
        e.origin.Worker = that;
    }

    /**
     * Load ajax init event handler:
     * prepare worker
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleLoadAjaxInit = function(e, o) {
        setTimeout(function() {
            OP3.transmit("workerready");
        });
    }

    /**
     * Worker ready event handler:
     * start worker
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleWorkerReady = function(e, o) {
        OP3.unbind("workerready", _handleWorkerReady);

        var message = "Rendering OptimizePress";
        var start = OP3.Loadinfo.stop()*1 || 0;
        var status = 0;
        var stop = 1;

        OP3.Loadinfo.$ui.parent.get(0).ownerDocument.defaultView.focus();

        OP3.Loadinfo.message(message);
        OP3.Loadinfo.start(start);
        OP3.Loadinfo.stop(stop);
        OP3.Loadinfo.status(status);

        setTimeout(function() {
            //console.time("OP3.Worker.init");
            that.start();
        });
    }

    /**
     * Worker framerequest event handler:
     * refresh progress bar
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleWorkerFrameRequest = function(e, o) {
        if (o.data && o.data.op3 && typeof o.data.op3.message !== "undefined")
            OP3.Loadinfo.message(o.data.op3.message);

        OP3.Loadinfo.status(o.jobsComplete / o.jobsCount);
    }

    /**
     * Worker complete event handler:
     * clear init worker and transmit
     * document ready
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleWorkerComplete = function(e, o) {
        OP3.unbind("workerframerequest", _handleWorkerFrameRequest);
        OP3.unbind("workercomplete", _handleWorkerComplete);

        setTimeout(function() {
            OP3.transmit("ready");

            OP3.Loadinfo.clean();
            OP3.Loadinfo.$ui.parent.removeClass("op3-loadinfo-init");

            delete OP3.Worker.data.op3;
        });
        //console.timeEnd("OP3.Worker.init");
    }

    // globalize
    window.OP3.Worker = that;

    // bind events
    OP3.bind("load::designer", _handleLoadDesigner);
    OP3.bind("loadajaxinit", _handleLoadAjaxInit);
    OP3.bind("workerready", _handleWorkerReady);
    OP3.bind("workerframerequest", _handleWorkerFrameRequest);
    OP3.bind("workercomplete", _handleWorkerComplete);

})(jQuery, window, document);
