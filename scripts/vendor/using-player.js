var Players = {};

Player.load(function(){
    $('[data-video-id]').each(function(){
        var videoID = $(this).attr('data-video-id');

        Players[videoID] = new Player(this, videoID);

        Players[videoID].on('playing', function(){
            var $player = this.$el;
        });

        Players[videoID].on('paused', function(){
            var $player = this.$el;
        });

        Players[videoID].on('ended', function(){
            this.trigger('paused');
        });
    });

    $('[data-video-play]').on('click', function(){
        var videoID = $(this).attr('data-video-play');

        for (var i in Players) {
            Players[i].pause();
        }

        Players[videoID].play();
    });
});
