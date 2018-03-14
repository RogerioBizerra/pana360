;var Animator = (function(window, document, undefined, $){
    var Animator = {
        _animations: {},
        _wait: 0,

        add: function(type, method){
            this._animations[type] = method;
        },
        onScroll: function($el) {
            var _this = this;

            $('[data-ani-type]:not([data-animated])').each(function(i){
                var $this   = $(this),
                    type    = $this.attr('data-ani-type'),
                    p       = $this.attr('data-ani-show') || 60,
                    delay   = $this.attr('data-ani-delay') || .2,
                    time    = $this.attr('data-ani-time') || .5,
                    props   = $this.attr('data-ani-props') || '{}';

                props = JSON.parse(props);

                if (p.toString().indexOf('%') !== -1) {
                    p = parseFloat(p.replace('%', ''));
                    p = $this.height() * p;
                }

                delay = parseFloat(delay);

                if (typeof _this._animations[type] === 'undefined') {
                    throw new Error('Animator does not have a "'+type+'" animation configured.');
                } else {
                    if ($this.parents('.slick-slide').length === 0 || $this.parents('.slick-slide').is('.slick-active')) {
                        if ($this.isOnScreen(p)) {
                            $this.attr('data-animated', 'waiting');
                            _this._wait += delay;

                            setTimeout(function() {
                                _this._animations[type]($this, time, props);
                                _this._wait -= delay;

                                $this.attr('data-animated', 'true');
                            }, _this._wait * 1000);
                        }
                    }
                }
            });
        }
    };

    return Animator;
})(window, document, undefined, jQuery);
