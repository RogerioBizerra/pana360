var EventHandler = (function(){
    var EventHandler = function(context){
        this.context = context;
        this.events = {};
    };

    EventHandler.prototype.on = function(name, fn){
        if (!this.events[name]) {
            this.events[name] = [fn];
        } else {
            this.events[name].push(fn);
        }
    };

    EventHandler.prototype.trigger = function(name, params){
        if (this.events[name]) {
            for (var i = 0; i < this.events[name].length; i++) {
                this.events[name][i].apply(this.context, [params || null]);
            }
        }
    };

    return {
        init: function (O) {
            O.on = function (name, fn) {
                if (!this._event) { this._event = new EventHandler(this); }

                this._event.on(name, fn);
            };

            O.trigger = function (name, params, retroative) {
                if (!this._event) { this._event = new EventHandler(this); }

                this._event.trigger(name, params);

                if (retroative && this.parent){
                    this.parent.trigger(name, params);
                }
            };
        }
    };
})();

var Player = (function($, EventHandler, window, document, undefined) {
    function Player (el, videoID) {
        var _this       = this;

        _this.$el       = $(el);
        _this.videoID   = videoID;

        Object.defineProperty(_this, 'duration', {
            get: function () {

                    return _this.player.duration;

            }
        });


            var $player = $('<video class="video" src="videos/'+videoID+'.mp4" preload="metadata" controls>');
            $player.appendTo(el);

            _this.player = $player.get(0);

            _this.player.addEventListener('loadedmetadata', function(){
                window.makeVideoPlayableInline(_this.player);
            });

            _this.player.addEventListener('play', function(){
                _this.trigger('playing');
            });

            _this.player.addEventListener('pause', function(){
                _this.trigger('paused');
            });

            _this.player.addEventListener('buffering', function(){
                _this.trigger('waiting');
            });

            _this.player.addEventListener('ended', function(){
                _this.trigger('ended');
            });

    }

    Player.prototype.play = function () {

            this.player.play();

    };

    Player.prototype.pause = function () {

            this.player.pause();

    };

    Player.prototype.seek = function (n) {

            this.player.currentTime = n;

    };

    Player.load = function(cb) {

            cb();

    };

    EventHandler.init(Player.prototype);

    return Player;
})(jQuery, EventHandler, window, document, undefined);
