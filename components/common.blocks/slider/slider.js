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

               // Будем превентить функцию по скроллу и запускать после.
               this._domEvents().on('scroll', (event)=> {

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
    }
}));

});
