modules.define('page-index',

['i-bem-dom', 'BEMHTML', 'section', 'link', 'header', 'footer', 'wave'],

function(provide, bemDom, BEMHTML, section, Link, Header, Footer, Wave) {

provide(bemDom.declBlock(this.name, {

    beforeSetMod: {
        js: {
            inited: function() {
              if(this.findChildElem('cross').hasMod('downsize', 'show')){
                  window.location.hash = 'bottom';
                  // this.findChildElem('cross').delMod('move-in');
                  this.findChildBlock(Header).setMod('white');
                   let downSection = this.findChildElem('bottomscreen');
                  downSection.setMod('fixed')
                  this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
                  let benefits = this.findChildElems('benefits');
                  benefits.map( item => {
                    if(!item.hasMod('hide')){
                      item.setMod('hide')
                    }
                  })
                  localStorage.setItem('stateChecker', 1);
              } else {
                window.scrollTo(0,0);
                localStorage.setItem('stateChecker', 0);
              }


            }
        }
    },

    onSetMod: {
        js: {
            inited: function() {

                let cross = this.findChildElem('cross');
                let screenHeight = window.innerHeight;

                let stateChecker = '0';
                if(localStorage.getItem('stateChecker')){
                  stateChecker = localStorage.getItem('stateChecker');
                }


                let benefits = this.findChildElems('benefits');
                let _this = this;
                let links = this.findChildElem('wrapper').findMixedBlock(section).findChildElems('quarter');
                // let waves = this.findChildBlock(Wave);


                links.map( item => {
                  let currentLink = item.findChildBlock(Link);
                  currentLink._domEvents().on('click', (event)=>{
                    cross.delMod('downsize', 'show');
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

                // if (scrolled > 500){
                //   waves.setMod('show')
                // }


                window.onscroll = function(event) {
                  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                  let downSection = _this.findChildElem('bottomscreen');



                  if (window.innerWidth > 480){
                    if(scrolled > (screenHeight - 50)){
                      _this.findChildBlock(Header).setMod('white');
                    } else if (scrolled < (screenHeight)) {
                      _this.findChildBlock(Header).delMod('white')
                      // _this.findChildBlock(Footer).delMod('white');
                    } else if (scrolled > screenHeight) {
                      // _this.findChildBlock(Footer).setMod('white');
                    }
                  }

                  // waves.setMod('show');
                  // if(waves.hasMod('show')){
                  //   _this.findChildElem('slogan').setMod('to-white');
                  // }

                  console.log('///////////');
                  console.log(stateChecker);
                  console.log('///////////');

                   if (scrolled < (screenHeight * 2) && scrolled > (screenHeight) && stateChecker === '0'){
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
                      history.pushState(null, null, '/')
                      _this.findChildElem('wrapper').findMixedBlock(section).delMod('hide');
                    })
                  } else if ( scrolled < screenHeight && stateChecker === '1' ){
                    cross.delMod('downsize', 'show')
                    cross.setMod('move', 'out');
                    if(downSection.hasMod('fixed')){
                      downSection.delMod('fixed');
                    }
                    cross._domEvents().on('animationend', ()=>{
                    history.pushState(null, null, '/')
                      if(!downSection.hasMod('fixed')){
                        _this.findChildElem('wrapper').findMixedBlock(section).setMod('hide');
                        benefits.map( item => {
                          if(item.hasMod('hide')){
                            item.delMod('hide')
                          }
                        })
                      }
                    })
                    stateChecker = '0'
                  } else if ( scrolled > ((screenHeight * 2) - 200) && stateChecker === '0') {
                    stateChecker = '1';
                  }
                }


            }
        }
    }
}));

});

