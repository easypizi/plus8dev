modules.define('text',
  ['i-bem-dom', 'BEMHTML', 'jquery', 'moment'],
  function(provide, bemDom, BEMHTML, $, moment) {

provide(bemDom.declBlock(this.name, {

  onSetMod: {
    js: {
      inited : function () {
        this.__timestamp = parseInt( this.domElem.text(), 10 );
        this.__format = this.params.format;

        bemDom.update( this.domElem, moment( this.__timestamp ).format( this.__format ) );
      }
    }
  }

}));

});
