modules.define('wave',

['i-bem-dom', 'BEMHTML', 'jquery', 'image', 'loader_type_js'],

function(provide, bemDom, BEMHTML, $, image, loader, Wave) {

provide(Wave.declMod({ modName: 'position', modVal: 'first' }, {
    onSetMod: {
        js: {
            inited: function() {
                let _this = this;

                loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute.js', function(){
                  loader('https://cdn.jsdelivr.net/npm/kute.js@1.6.5/kute-svg.js',

                    function() {

                      let div = document.getElementById('firststate');

                      // console.log(div);

                      var tween = KUTE.fromTo(div,
                        { path: '#firststate' },
                        // { reverseFirstPath: true})
                        { path: '#secondstate' },
                        { // options
                         easing: 'easingCubicInOut',
                         // yoyo: true,
                         // repeat: 1,
                         duration: 2500,
                         morphIndex: 127
                        }
                        )

                      // tween.start();
                  })
                })

            }
        }
    }
}));

});

