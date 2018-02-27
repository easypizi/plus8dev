modules.define('wave', function(provide, Wave) {

provide(Wave.declMod({ modName: 'morphing', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                
            }
        }
    }
}));

});
