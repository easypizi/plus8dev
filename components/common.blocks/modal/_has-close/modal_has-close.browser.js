modules.define('modal',
  [ 'BEMHTML', 'i-bem-dom' ],
  function(provide, BEMHTML, bemDom, Modal){

  provide(Modal.declMod({ modName: 'has-close', modVal: true }, {
    onSetMod: {
      js: {
        inited: function() {
          this.__base.apply( this, arguments );
        }
      },
      visible: function() {
        this._elem('header') && bemDom.append(
          this._elem('header').domElem,
          BEMHTML.apply({
            block: 'icon',
            mods: {
              symbol: 'times',
              size: 'l',
              theme: 'fbs-cabinet'
            },
            mix: [
              { block: 'media', elem: 'addon' },
              { block: 'modal', elem: 'close' }
            ]
          })
        );

        this._elem('close') && this._domEvents( this._elem('close').domElem ).on('click', function() {
          this.delMod('visible');
        });
      }
    }
  }));
});
