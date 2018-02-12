modules.define('button', function(provide, Button) {

provide(Button.declMod({ modName: 'comeback', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                
            }
        }
    }
}));

});
