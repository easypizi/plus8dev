modules.define('popup',
  ['i-bem-dom', 'BEMHTML'],
  function(provide, bemDom, BEMHTML ) {

provide(bemDom.declBlock(this.name, {
  onSetMod:{
    js: {
      inited: function() {
          this._domEvents('close').on('click', function(){
            this.setMod('visible', '')
          })
      }
    }
  }

}));

});
