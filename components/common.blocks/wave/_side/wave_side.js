modules.define('wave',

['i-bem-dom', 'BEMHTML', 'jquery', 'image', 'loader_type_js'],

function(provide, bemDom, BEMHTML, $, image, loader, Wave) {

provide(Wave.declMod({ modName: 'side', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                let _this = this;

                loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute.js', function(){
                  loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-svg.js', function(){
                    loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-attr.js', function(){

                        // let gradient1 = KUTE.to('#first-color', {attr: {'stop-color':"red"}}).start();
                        // let gradient2 = KUTE.to('#second-color', {attr: {'stop-color'="blue"}}).start();

                        var fillTheWaveOne = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#second' },
                        {
                            duration: 5000,
                            repeat: 999,
                            yoyo: true,
                            easing: 'linear',
                            easing: 'easingCubicInOut',
                            morphPrecision: 1,
                            morphIndex: 8
                        })

                        var fillTheWaveTwo = KUTE.fromTo('#forth',
                        { path: '#forth' },
                        { path: '#third' },
                        {
                            duration: 6000,
                            repeat: 999,
                            yoyo: true,
                            easing: 'linear',
                            easing: 'easingCubicInOut',
                            morphPrecision: 1,
                            morphIndex: 17
                        })

                        fillTheWaveOne.start()
                        fillTheWaveTwo.start()
                    })
                  })
                })

            }
        }
    }
}));

});
