function MaskErSize(canvasWidth, canvasHeight) {
  init: {
    this.validateUserInput(canvasWidth, canvasHeight);
    this.canvasWidth = canvasWidth || 480;
    this.canvasHeight = canvasHeight || 360;

    this.initializeVariables();
  }
};


/*
http://www.w3schools.com/tags/canvas_globalcompositeoperation.asp
*/
MaskErSize.prototype = {
  gcoTransform : function(ctx) {
    var aDataObj = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var aData = aDataObj.data;
    var topY = undefined;
    var rightX = 0;
    var leftX = this.canvasWidth; 
    var bottomY = 0; 
    var y = 0;
    var x = 0;
      var leftSide = (this.canvasWidth*4);
      var rightSide = (this.canvasWidth*4)-4;
      for(var i=0; i< aData.length; i+=4) {
        if(aData[i+3] > 0) { 
          if (topY == undefined) {
            this.__setImageRect('top', y);
            topY = y;
          }

          if ( x < this.__getLeft() ) this.__setImageRect('left', x);

          if (x>rightX) {
            this.__setImageRect('right', x);
            rightX = x;
          }

          if (y>bottomY) {
            this.__setImageRect('bottom', y);
            bottomY = y;
          }


          aData[i] = 0;
          aData[i+1] = 0;
          aData[i+2] = 0;
          aData[i+3] = 255;



        } else {
          aData[i] = 255;
          aData[i+1] = 255;
          aData[i+2] = 255;
          aData[i+3] = aData[i+3];
        }

        if (i % leftSide === 0) {
          y++;
          x=0;
        }

        x++;

      }

      aDataObj.data = aData;
      ctx.putImageData(aDataObj, 0, 0);

      //DrawLine
      ctx.globalCompositeOperation='destination-over';
      ctx.scale(1,1);
      ctx.moveTo(0,this.getImageRect().top);
      ctx.lineTo(this.canvasWidth,this.getImageRect().top);
      ctx.stroke();

      ctx.moveTo(0,this.getImageRect().bottom);
      ctx.lineTo(this.canvasWidth, this.getImageRect().bottom);
      ctx.stroke();


      ctx.moveTo(this.getImageRect().right,0);
      ctx.lineTo(this.getImageRect().right,this.canvasHeight);
      ctx.stroke();

      ctx.moveTo(this.getImageRect().left,0);
      ctx.lineTo(this.getImageRect().left,this.canvasHeight);
      ctx.stroke();
  },

  __setImageRect: function(key, value) {
    if (key in this.imageRect) this.imageRect[key] = value;
  },

  __getLeft: function() { return this.getImageRect().left},

  getImageRect: function() {
    return this.imageRect;
  },

  validateUserInput: function(canvasWidth, canvasHeight) {
    if (canvasWidth && canvasWidth < 1) {
      throw new Error("Canvas Width must be larger than 0");
    }

    if (canvasHeight && canvasHeight < 1) {
      throw new Error("Canvas Height must be larger than 0");
    }

    if (canvasHeight && canvasHeight > 500) {
      throw new Error("Canvas Height can be no larger than 500");
    }

    if (canvasWidth && canvasWidth > 500) {
      throw new Error("Canvas Width can be no larger than 500");
    }
  },

  initializeVariables: function() {
    this.imageRect = {
      top : 0,
      bottom : this.canvasHeight,
      left : 0,
      right : this.canvasWidth,
    };
  }
};
