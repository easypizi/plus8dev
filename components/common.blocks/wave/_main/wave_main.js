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
                    loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-attr.js', function(){

                        // let gradient1 = KUTE.to('#first-color', {attr: {'stop-color':"red"}}).start();
                        // let gradient2 = KUTE.to('#second-color', {attr: {'stop-color'="blue"}}).start();

                        _this.delMod('stop')


                        var fillTheWaveOne = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#second' },
                        {
                            duration: 8500,
                            repeat: 999,
                            yoyo: true,
                            easing: 'easingSinusoidalInOut',
                            morphPrecision: 1,
                            morphIndex: 40
                        })

                        var fillTheWaveTwo = KUTE.fromTo('#third',
                        { path: '#third' },
                        { path: '#forth' },
                        {
                            duration: 6300,
                            repeat: 999,
                            yoyo: true,
                            easing: 'easingSinusoidalInOut',
                            morphPrecision: 1,
                            morphIndex: 40
                        })

                        fillTheWaveOne.start()
                        fillTheWaveTwo.start()


                        var goOn = function(){
                          _this._emit('goon');
                        }

                        var toFullScreen = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#fullscreen' },
                        {
                            duration: 1500,
                            easing: 'easingSinusoidalIn',
                            morphPrecision: 1,
                            morphIndex: 1,
                            complete: goOn
                        })

                        var fromFullScreen = KUTE.fromTo('#first',
                        { path: '#fullscreen' },
                        { path: '#first' },
                        {
                            duration: 1500,
                            easing: 'easingSinusoidalIn',
                            morphPrecision: 1,
                            morphIndex: 1,
                            complete: goOn
                        })

                        _this._events().on('startFullscreen', () => {

                          console.log('Старт');

                          fillTheWaveOne.stop()
                          fillTheWaveTwo.stop()
                          toFullScreen.start()
                        })

                        _this._events().on('stopFullscreen', () => {

                          console.log('Стоп');

                          fromFullScreen.start()
                          setTimeout(()=>{
                            fillTheWaveOne.start()
                            fillTheWaveTwo.start()
                          }, 2500)
                        })
                    })
                  })
                })

            }
        }
    }
}));

});
