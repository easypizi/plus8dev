modules.define('select',

function( provide, Select) {

provide(Select.declMod({ modName: 'type', modVal: 'topping' }, {

  _updateButton : function() {
        var checkedItems = this._getCheckedItems();
        this._emit('modChoose');
        let sum = 0;
        this._button
            .toggleMod('checked', true, '', !!checkedItems.size())
            .setText(
                checkedItems.size() === 1 ?
                    '1 топпинг': // one checked
                    checkedItems.reduce(
                      function(res, item) {
                        sum += item.params.checkedText;
                        return checkedItems.size() + ' топпинга'
                      }, '' + ' Добавить топпинг ')  || this.params.text );
    },

}));

});
