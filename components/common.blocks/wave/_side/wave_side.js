modules.define('wave', function(provide, Wave) {

provide(Wave.declMod({ modName: 'side', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                
            }
        }
    }
}));

});
