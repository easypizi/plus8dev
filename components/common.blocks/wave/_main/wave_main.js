modules.define('wave',

['i-bem-dom', 'BEMHTML', 'jquery', 'image', 'loader_type_js'],

function(provide, bemDom, BEMHTML, $, image, loader, Wave) {

provide(Wave.declMod({ modName: 'main', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                let _this = this;

                loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute.js', function(){
                  loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-svg.js', function(){


                        var fillTheWaveOne = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#second' },
                        {
                            duration: 8500,
                            repeat: 999,
                            yoyo: true,
                            easing: 'easingSinusoidalInOut',
                            morphPrecision: 2,
                            morphIndex: 1
                        })

                        var fillTheWaveTwo = KUTE.fromTo('#third',
                        { path: '#third' },
                        { path: '#forth' },
                        {
                            duration: 6300,
                            repeat: 999,
                            yoyo: true,
                            easing: 'easingSinusoidalInOut',
                            morphPrecision: 2,
                            morphIndex: 1
                        })

                        fillTheWaveOne.start()
                        fillTheWaveTwo.start()

                        setTimeout( () => {
                          _this.setMod('show')
                        }, 1500)


                        var goOn = function(){
                          _this._emit('goon');
                        }

                        var goOut = function(){
                          _this._emit('goOut');
                        }

                        var toFullScreen = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#fullscreen' },
                        {
                            duration: 1500,
                            easing: 'easingSinusoidalIn',
                            morphPrecision: 20,
                            morphIndex: 1,
                            complete: goOn
                        })

                        var fromFullScreen = KUTE.fromTo('#first',
                        { path: '#fullscreen' },
                        { path: '#first' },
                        {
                            duration: 1500,
                            easing: 'easingSinusoidalIn',
                            morphPrecision: 20,
                            morphIndex: 1,
                            complete: goOut
                        })

                        _this._events().on('startFullscreen', () => {

                          fillTheWaveOne.stop()
                          toFullScreen.start()
                        })

                        _this._events().on('stopFullscreen', () => {

                          fromFullScreen.start()
                          setTimeout(()=>{
                            fillTheWaveOne.start()
                          }, 2500)
                        })
                  })
                })

            }
        }
    }
}));

});
