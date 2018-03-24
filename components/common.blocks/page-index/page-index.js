modules.define('page-index',

['i-bem-dom', 'BEMHTML', 'section', 'link', 'header', 'footer', 'wave', 'screen', 'page'],

function(provide, bemDom, BEMHTML, section, Link, Header, Footer, Wave, Screen, Page) {

provide(bemDom.declBlock(this.name, {

    beforeSetMod: {
        js: {
            inited: function() {
              this.cross = this.findChildElem('cross');
              this.midscreen = this.findChildElem('midscreen').findMixedBlock(Screen);
              this.mainWaves = this.findChildBlock({block: Wave, mods: { main: true }});
              this.benefits = this.findChildElems('benefits');
              this._hiddenbg = this.findChildElem('hiddenbg');
              this.mainbox = this.findChildElem('topscreen').findChildBlock(section);

              if(this.findChildElem('cross').hasMod('downsize', 'show')){

                  this.mainWaves.setMod('fullscreen');
                  this.mainWaves.setMod('hidesecond');
                  this.mainWaves._emit('startFullscreen');
                  this.mainWaves.setMod('stop')
                  this.mainbox.setMod('hidden');
                  if (window.innerWidth > 480){
                    this.findChildBlock(Header).setMod('white');
                  }

                  this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
                  this.findChildElem('topscreen').findChildBlock(section).delMod('hidden');

                  this._hiddenbg.delMod('hide')
                  this._hiddenbg.setMod('bgview')


                  window.location.hash = 'bottom';
                  this.isAnimate = true;
                  this._showLinks()
                  localStorage.setItem('stateChecker', 1);
                  localStorage.setItem('firstTime', 'no')

              } else {
                window.scrollTo(0,0);
                history.pushState(null, null, '/');
                this._hideLinks();
                localStorage.setItem('stateChecker', 0);
                localStorage.setItem('firstTime', 'yes')
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
                this.isAnimate = false;
                this.mainbox = this.findChildElem('topscreen').findChildBlock(section);

                console.log(this.mainbox);


                if(localStorage.getItem('stateChecker')){
                  this.stateChecker = localStorage.getItem('stateChecker');
                }

                if(localStorage.getItem('firstTime')){
                  this.firstTime = localStorage.getItem('firstTime') === 'no' ? false : true;
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

                _this.mainWaves._events().on('goon', () => {
                    this.isAnimate = false;
                })

                _this.mainWaves._events().on('goOut', () => {
                    this.isAnimate = false;
                    this.mainbox.delMod('hidden');
                })



                window.onscroll = function(event) {
                  var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                    if (scrolled > 240 && scrolled - globalmarker > 0 && _this.firstTime === true && _this.isAnimate !== true ){
                        _this.mainWaves.setMod('fullscreen');
                        _this.mainWaves.setMod('hidesecond');
                        _this.mainWaves._emit('startFullscreen');
                        _this.mainbox.setMod('hidden');
                        _this.isAnimate = true;
                        _this.firstTime = false;
                    } else if (_this.firstTime === false && scrolled - globalmarker < 0 && _this.isAnimate !== true && scrolled < 500) {
                        _this._hiddenbg.setMod('hide')
                        _this.mainWaves._emit('stopFullscreen');
                        _this.isAnimate = true;
                        _this.firstTime = true;
                        setTimeout(()=>{
                          _this.mainWaves.delMod('fullscreen');
                          _this.mainWaves.delMod('hidesecond')
                        }, 200)
                    }

                  if (scrolled < screenHeight && window.location.hash !== '') {
                    history.pushState(null, null, '/');
                  }

                  // Изменение стилей Хэдера
                  if (window.innerWidth > 480){
                    if(scrolled > (screenHeight - 50)){
                      _this.findChildBlock(Header).setMod('white');
                    } else if (scrolled < screenHeight) {
                      _this.findChildBlock(Header).delMod('white')
                    }
                  }

                  if ( scrolled - globalmarker > 0 && scrolled > screenHeight && _this.stateChecker === '0' ){
                      _this.debouncer = '1';
                      _this._emit('show');
                      _this._hiddenbg.delMod('hide')
                      _this._hiddenbg.setMod('bgview')
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

