;(function(window, document, undefined, Animator){
    Animator.add('chars', function($el, duration) {
        var tl = new TimelineLite,
            st = new SplitText($el, {type: 'words,chars'}),
            chars = st.chars;

        return tl.staggerFrom(chars, duration, {opacity: 0, scale: 0, y: 50, rotationX: 90, transformOrigin: '0% 50% -50', ease: Quint.easeOut}, 0.01, '+=0');
    });

    Animator.add('fade', function($el, duration) {
        return TweenLite.from($el, duration, {opacity: 0, ease: Linear.easeNone});
    });

    Animator.add('fade-top', function($el, duration) {
        return TweenLite.from($el, duration, {opacity: 0, y: 60, ease: Quint.easeOut});
    });

    Animator.add('fade-right', function($el, duration) {
        return TweenLite.from($el, duration, {opacity: 0, x: -60, ease: Quint.easeOut});
    });

    Animator.add('fade-bottom', function($el, duration) {
        return TweenLite.from($el, duration, {opacity: 0, y: -60, ease: Quint.easeOut});
    });

    Animator.add('fade-left', function($el, duration) {
        return TweenLite.from($el, duration, {opacity: 0, x: 60, ease: Quint.easeOut});
    });
})(window, document, undefined, Animator);
