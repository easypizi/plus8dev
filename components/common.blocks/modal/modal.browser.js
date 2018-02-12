modules.define( 'modal',
  [ 'i-bem-dom', 'page' ],
  function( provide, bemDom, Page ) {

  provide( bemDom.declBlock( this.name, {
    onSetMod: {
      visible: function() {
        var page = this.findParentBlock( Page );
        page.setMod( 'hide-scroll', this.hasMod( 'visible' ) );
      }
    },

    setHeader : function(content) {
      bemDom.update(this._elem('header').domElem, content);
      return this;
    }
  }));
});
