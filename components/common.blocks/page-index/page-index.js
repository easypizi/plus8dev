modules.define('page-index',

['i-bem-dom', 'BEMHTML', 'section', 'link', 'header', 'footer', 'wave', 'screen'],

function(provide, bemDom, BEMHTML, section, Link, Header, Footer, Wave, Screen) {

provide(bemDom.declBlock(this.name, {

    beforeSetMod: {
        js: {
            inited: function() {
              this.cross = this.findChildElem('cross');
              this.midscreen = this.findChildElem('midscreen').findMixedBlock(Screen);
              this.benefits = this.findChildElems('benefits');

              if(this.findChildElem('cross').hasMod('downsize', 'show')){
                  window.location.hash = 'bottom';
                  this.findChildBlock(Header).setMod('white');
                  this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
                  this._showLinks()
                  localStorage.setItem('stateChecker', 1);
              } else {
                window.scrollTo(0,0);
                this._hideLinks();
                localStorage.setItem('stateChecker', 0);
              }


            }
        }
    },

    onSetMod: {
        js: {
            inited: function() {
                let _this = this;
                this.cross = this.findChildElem('cross');
                let screenHeight = window.innerHeight;
                this.benefits = this.findChildElems('benefits');
                this.links = this.findChildElem('wrapper').findMixedBlock(section).findChildElems('quarter');
                this.stateChecker = '0';
                let globalmarker = window.pageYOffset || document.documentElement.scrollTop;
                this.midscreen = _this.findChildElem('midscreen').findMixedBlock(Screen);
                this.debouncer = '0';

                console.log();

                if(localStorage.getItem('stateChecker')){
                  this.stateChecker = localStorage.getItem('stateChecker');
                }

                this.links.map( item => {
                  let currentLink = item.findChildBlock(Link);
                  currentLink._domEvents().on('click', (event)=>{
                    this.cross.delMod('downsize', 'show');
                    this.cross.setMod('oversize');
                    if (event.ctrlKey || event.metaKey ) {
                      return
                    }
                    event.preventDefault();
                    this.cross._domEvents().on('animationend', ()=>{
                      window.location.href = currentLink.params.url;
                    })
                  })
                })

                // let waves = this.findChildBlock(Wave);
                // if (scrolled > 500){
                //   waves.setMod('show')
                // }

                this._events().on('show', () => {
                  if (this.debouncer === '1'){
                    console.log('yo');
                    this._showLinks();
                  }
                })

                this._events().on('hide', () => {
                  if (this.debouncer === '1'){
                    this._hideLinks();
                  }
                })


                window.onscroll = function(event) {

                  var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                  // Изменение стилей Хэдера
                  if (window.innerWidth > 480){
                    if(scrolled > (screenHeight - 50)){
                      _this.findChildBlock(Header).setMod('white');
                    } else if (scrolled < (screenHeight)) {
                      _this.findChildBlock(Header).delMod('white')
                      history.pushState(null, null, '/');
                    }
                  }


                  // waves.setMod('show');
                  // if(waves.hasMod('show')){
                  //   _this.findChildElem('slogan').setMod('to-white');
                  // }

                  if ( scrolled - globalmarker > 0 && scrolled > screenHeight && _this.stateChecker === '0' ){
                      _this.debouncer = '1';
                      _this._emit('show');
                  } else if (scrolled - globalmarker < 0 && scrolled < (screenHeight) && _this.stateChecker === '1') {
                      _this.debouncer = '1';
                    _this._emit('hide');
                  }
                    globalmarker = scrolled;

                }
            }
        }
    },

    _showLinks: function() {

      this.cross.setMod('move', 'in');
      this.benefits.map( item => {
        if(!item.hasMod('hide')){
          item.setMod('hide')
        }
      })

      if(!this.midscreen.hasMod('movable', 'show')){
        this.midscreen.setMod('movable', 'show');
      }

      this._domEvents().on('animationend', () => {
        this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
        this.stateChecker = '1';
      })
        this.debouncer = '0';
    },

    _hideLinks: function() {
      if (this.cross.hasMod('downsize', 'show')){
        this.cross.delMod('downsize', 'show')
      }
      this.cross.setMod('move', 'out');
      if(this.midscreen.hasMod('movable', 'show')){
        this.midscreen.delMod('movable', 'show');
      }
      this._domEvents().on('animationend', ()=>{
        if(!this.midscreen.hasMod('movable', 'show')){
          this.findChildElem('wrapper').findMixedBlock(section).setMod('hide');
          this.benefits.map( item => {
            if(item.hasMod('hide')){
              item.delMod('hide')
            }
          })
        }
        this.stateChecker = '0'
      })
        this.debouncer = '0';
    }
}));

});

