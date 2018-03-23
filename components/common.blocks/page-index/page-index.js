modules.define('page-index',

['i-bem-dom', 'BEMHTML', 'section', 'link', 'header', 'footer', 'wave', 'screen', 'page'],

function(provide, bemDom, BEMHTML, section, Link, Header, Footer, Wave, Screen, Page) {

provide(bemDom.declBlock(this.name, {

    beforeSetMod: {
        js: {
            inited: function() {

              this.cross = this.findChildElem('cross');
              this.midscreen = this.findChildElem('midscreen').findMixedBlock(Screen);
              this.benefits = this.findChildElems('benefits');
              if(this.findChildElem('cross').hasMod('downsize', 'show')){
                  if (window.innerWidth > 480){
                    this.findChildBlock(Header).setMod('white');
                  }
                  window.location.hash = 'bottom';
                  this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
                  this._showLinks()
                  localStorage.setItem('stateChecker', 1);
              } else {
                window.scrollTo(0,0);
                history.pushState(null, null, '/');
                this._hideLinks();
                localStorage.setItem('stateChecker', 0);
              }
            }
        }
    },

    onSetMod: {
        js: {
            inited: function() {

                // Делаем маркер для обозначения первого раза.
                let _this = this;
                this.firstTime = true;
                this.wavesContainer = this.findChildBlock(Screen).findChildElem('wave-container');
                this.mainWaves = this.findChildBlock({block: Wave, mods: { main: true }});
                this.body = this.findParentBlock(Page);
                this._hiddenbg = this.findChildElem('hiddenbg');
                this.cross = this.findChildElem('cross');
                let screenHeight = window.innerHeight;
                this.benefits = this.findChildElems('benefits');
                this.links = this.findChildElem('wrapper').findMixedBlock(section).findChildElems('quarter');
                this.stateChecker = '0';
                let globalmarker = window.pageYOffset || document.documentElement.scrollTop;
                this.midscreen = _this.findChildElem('midscreen').findMixedBlock(Screen);
                this.debouncer = '0';

                this.mainWaves._events().on('startWave', () => {
                  this.mainWaves.delMod('stop')
                })

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

                this._events().on('show', () => {
                  if (this.debouncer === '1'){
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

                  // Раскрытие экрана на всю.
                  if (_this.firstTime){
                    console.log('yo');
                       _this.mainWaves._emit('stopFullscreen');
                    _this.firstTime = false;
                    // _this.mainWaves.setMod('hidesecond');
                    // _this.mainWaves.setMod('fullscreen');
                  } else {

                  }


                    if (scrolled - globalmarker < 0 ){
                       _this.mainWaves._emit('startFullscreen');
                        console.log(_this.firstTime);
                        console.log('/////////');
                        _this.firstTime = true;
                    } else if (_this.firstTime = true & scrolled - globalmarker > 0) {
                        _this.mainWaves._emit('stopFullscreen');
                        console.log(_this.firstTime);
                        console.log('+++++++++');
                        // _this.firstTime = false;
                    }

                    _this.mainWaves._events().on('goon', () => {
                    })





                  if (scrolled < screenHeight && window.location.hash !== '') {
                    history.pushState(null, null, '/');
                  }

                  // Изменение стилей Хэдера
                  if (window.innerWidth > 480){
                    if(scrolled > (screenHeight - 50)){
                      _this.findChildBlock(Header).setMod('white');
                      _this._hiddenbg.delMod('hide')
                    } else if (scrolled < screenHeight) {
                      _this.findChildBlock(Header).delMod('white')
                      _this._hiddenbg.setMod('hide')
                    }
                  }


                  // mainWaves.setMod('show');
                  // if(mainWaves.hasMod('show')){
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

