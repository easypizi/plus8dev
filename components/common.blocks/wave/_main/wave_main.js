modules.define('wave',

['i-bem-dom', 'BEMHTML', 'jquery', 'image', 'loader_type_js'],

function(provide, bemDom, BEMHTML, $, image, loader, Wave) {

provide(Wave.declMod({ modName: 'main', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                let _this = this;


                // console.log('yo');
                loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute.js', function(){
                  loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-svg.js', function(){
                    loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-attr.js', function(){

                        // let gradient1 = KUTE.to('#first-color', {attr: {'stop-color':"red"}}).start();
                        // let gradient2 = KUTE.to('#second-color', {attr: {'stop-color'="blue"}}).start();

                        var fillTheWaveOne = KUTE.fromTo('#first',
                        { path: '#first' },
                        { path: '#second' },
                        {
                            duration: 10000,
                            repeat: 100000000,
                            yoyo: true,
                            easing: 'linear',
                            easing: 'easingCubicInOut',
                            morphPrecision: 1,
                            morphIndex: 20
                        })

                        // var fillTheWaveTwo = KUTE.fromTo('#third',
                        // { path: '#third' },
                        // { path: '#forth' },
                        // {
                        //     duration: 7000,
                        //     repeat: 100000000,
                        //     yoyo: true,
                        //     easing: 'linear',
                        //     easing: 'easingCubicInOut',
                        //     morphPrecision: 1,
                        //     morphIndex: 20
                        // })

                        fillTheWaveOne.start()
                        // fillTheWaveTwo.start()
                    })
                  })
                })

            }
        }
    }
}));

});
