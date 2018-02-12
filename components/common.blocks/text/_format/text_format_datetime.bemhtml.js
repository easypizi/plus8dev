block('text').mod('format', 'datetime')(
  js()(false),
  tag()('time'),
  attrs()( function() {
    return {
      datetime: new Date( this.ctx.content ) ? new Date( this.ctx.content ).toISOString() : new Date().toISOString()
    };
  })
);
