modules.define('slider', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {

               let _this = this;
               this.integer = 0;
               this.direction = 'right';
               this.scrollArea = this.domElem[0].scrollWidth - this.domElem[0].offsetWidth;
               this._goSlideLeft();
               this.autoPilot = true;

               this._domEvents().on('mouseenter', () => {
                  _this.autoPilot = false
               })

               this._domEvents().on('mouseleave', () => {
                  _this.autoPilot = true;
                  if(_this.integer > _this.scrollArea/2){
                   _this._goSlideRight();
                  } else if (_this.integer < _this.scrollArea/2){
                   _this._goSlideLeft();
                  }
               })

               // Будем превентить функцию по скроллу и запускать после.
               this._domEvents().on('scroll', () => {
                  if (_this.autoPilot === false) {
                    _this.integer = _this.domElem.scrollLeft();
                    clearInterval(_this.timerMinus);
                    clearInterval(_this.timerPlus);
                  }
               })
            }
        }
    },

    _goSlideLeft: function() {
      let _this = this;
      this.timerPlus = setInterval( function(){
        _this.domElem.scrollLeft(_this.integer);
        _this.integer++;
        _this._checkDirection(_this.scrollArea);
      }, 10)
    },

    _goSlideRight: function() {
      let _this = this;
      this.timerMinus = setInterval( function(){
        _this.domElem.scrollLeft(_this.integer);
        _this.integer--;
        _this._checkDirection(_this.scrollArea);
      }, 10)
    },

    _checkDirection: function(length){
      if(this.integer === length){
       this.direction = 'left';
       clearInterval(this.timerPlus);
       this._goSlideRight();
      } else if (this.integer === 0){
       this.direction = 'right';
       clearInterval(this.timerMinus);
       this._goSlideLeft();
      }
    },

}));

});
