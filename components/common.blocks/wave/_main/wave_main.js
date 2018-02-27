modules.define('wave', function(provide, Wave) {

provide(Wave.declMod({ modName: 'main', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                
            }
        }
    }
}));

});
