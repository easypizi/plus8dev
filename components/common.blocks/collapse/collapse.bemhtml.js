block('collapse')(
  tag()('details'),
  attrs()(function() {
    var attrs = applyNext() || {}; // атрибуты из предыдущих шаблонов или BEMJSON-а
    return this.extend(attrs, { open: this.mods.open });
  }),
  elem('header')(
    tag()('summary')
  )
)
