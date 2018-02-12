block('select').elem('button')(
  replace()(function() {
    var select = this._select,
    mods = this.mods;

    return {
      block: 'button',
      mix: { block: this.block, elem: this.elem },
      mods: {
        view: mods.view,
        focused: mods.focused,
        inverse: mods.inverse,
        disabled: mods.disabled,
        checked: mods.mode !== 'radio' && !!this._checkedOptions.length,
        size: mods.size,
        theme: mods.theme,
      },
      attrs: {
        role: 'listbox',
        'aria-owns': this._optionIds.join(' '),
        'aria-multiselectable': mods.mode === 'check'? 'true': undefined,
        'aria-labelledby': this._selectTextId
      },
      id: select.id,
      tabIndex: select.tabIndex,
      content: [
          // this._checkedOption.icon ? this._checkedOption.icon : '',
          apply('content'),
          { block: 'icon', mix: { block: 'select', elem: 'arrow' } }
          ]
        };
      }),
  def()(function() {
    return applyNext({ _selectTextId: this.generateId() });
  })
);

block('button').elem('text').match(function() { return this._select; })(
  attrs()(function() {
    return { id: this._selectTextId };
  })
);
