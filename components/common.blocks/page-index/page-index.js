modules.define('page-index',

['i-bem-dom', 'BEMHTML', 'section', 'link', 'header', 'footer', 'wave'],

function(provide, bemDom, BEMHTML, section, Link, Header, Footer, Wave) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                let cross = this.findChildElem('cross');
                let screenHeight = window.innerHeight;
                let stateChecker = 0;
                let benefits = this.findChildElems('benefits');
                let _this = this;
                let links = this.findChildElem('bottomscreen').findChildBlock(section).findChildElems('quarter');
                let waves = this.findChildBlock(Wave);
                links.map( item => {
                  let currentLink = item.findChildBlock(Link);
                  currentLink._domEvents().on('click', (event)=>{
                    cross.setMod('oversize');
                    if (event.ctrlKey || event.metaKey ) {
                      return
                    }
                    event.preventDefault();
                    cross._domEvents().on('animationend', ()=>{
                      window.location.href = currentLink.params.url;
                    })
                  })
                })

                var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                if (scrolled > 500){
                  waves.setMod('show')
                }



                window.onscroll = function(event) {
                  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                  let downSection = _this.findChildElem('bottomscreen');

                  if (window.innerWidth > 480){
                    if(scrolled > (screenHeight - 50)){
                      // _this.findChildBlock(Header).setMod('white');
                    } else if (scrolled < (screenHeight)) {
                      // _this.findChildBlock(Header).delMod('white')
                      _this.findChildBlock(Footer).delMod('white');
                    } else if (scrolled > screenHeight) {
                      _this.findChildBlock(Footer).setMod('white');
                    }
                  }

                  waves.setMod('show');
                  if(waves.hasMod('show')){
                    _this.findChildElem('slogan').setMod('to-white');
                  }

                  if (scrolled > (screenHeight) && stateChecker === 0){
                    cross.setMod('move', 'in');
                    benefits.map( item => {
                      if(!item.hasMod('hide')){
                        item.setMod('hide')
                      }
                    })

                    if(!downSection.hasMod('fixed')){
                      downSection.setMod('fixed');
                    }

                    cross._domEvents().on('animationend', ()=>{
                      _this.findChildElem('bottomscreen').findChildBlock(section).delMod('hide');
                    })
                    stateChecker = 1;

                  } else if (scrolled < screenHeight && stateChecker === 1){
                    cross.setMod('move', 'out');
                    if(downSection.hasMod('fixed')){
                      downSection.delMod('fixed');
                    }


                    cross._domEvents().on('animationend', ()=>{

                      if(!downSection.hasMod('fixed')){
                        _this.findChildElem('bottomscreen').findChildBlock(section).setMod('hide');
                        benefits.map( item => {
                          if(item.hasMod('hide')){
                            item.delMod('hide')
                          }
                        })
                      }
                    })

                    stateChecker = 0;
                  }
                }


            }
        }
    }
}));

});



        // this._domEvents().on('scroll', (e) => {
        //     window.clearTimeout( isScrolling );
        //     let actualmarker = this.domElem[0].scrollTop;
        //     if (actualmarker - globalmarker < 0 && this.domElem[0].scrollTop > 600 ){
        //       this.toTopBtn.delMod('hide');
        //     }
        //     if (this.domElem[0].scrollTop < 100) {
        //       this.toTopBtn.setMod('hide');
        //     }

        //     if (actualmarker - globalmarker > 0) {
        //       this.toTopBtn.setMod('hide');
        //     }

        //     globalmarker = actualmarker;

        //     if (window.innerWidth > 767){
        //       this._showSideLogo();
        //       this._chooseCategory();
        //       this._chooseSubCategory();
        //     } else {
        //       this._chooseCategory();
        //     }

        //     isScrolling = setTimeout(() => {
        //        this.items.delMod('stopScroll')
        //     }, 66);

        // }, false)
