function MaskErSize(canvasWidth, canvasHeight, xScale, yScale) {
  init: {
    this.validateUserInput(canvasWidth, canvasHeight, xScale, yScale);
    this.canvasWidth = canvasWidth || 480;
    this.canvasHeight = canvasHeight || 360;
    this.xScale = xScale || 1;
    this.yScale = yScale || 1;

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
          if (topY == undefined) { this.__setImageRect('top', y); topY = y;}

          if ( y > this.__getBottom() ) this.__setImageRect('bottom', y);

          if ( x < this.__getLeft() ) this.__setImageRect('left', x);

          if ( x > this.__getRight() ) this.__setImageRect('right', x);


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
      this.__drawDebugLines(ctx);
  },

  __setCTXScale: function(ctx) {
    ctx.scale(this.__getXScale(), this.__getYScale());
  },

  __getXScale: function() {
    return this.xScale;
  },

  __getYScale: function() {
    return this.yScale;
  },

  __drawDebugLines: function(ctx) {
    ctx.globalCompositeOperation='destination-over';
    this.__setCTXScale(ctx);

    this.__drawTopDebugLine(ctx);
    this.__drawBottomDebugLine(ctx);
    this.__drawLeftDebugLine(ctx);
    this.__drawRightDebugLine(ctx);
  },

  __drawTopDebugLine: function(ctx) {
    ctx.moveTo(0,this.getImageRect().top);
    ctx.lineTo(this.canvasWidth,this.getImageRect().top);
    ctx.stroke();
  },

  __drawBottomDebugLine: function(ctx) {
    ctx.moveTo(0,this.getImageRect().bottom);
    ctx.lineTo(this.canvasWidth, this.getImageRect().bottom);
    ctx.stroke();
  },

  __drawLeftDebugLine: function(ctx) {
    ctx.moveTo(this.getImageRect().left,0);
    ctx.lineTo(this.getImageRect().left,this.canvasHeight);
    ctx.stroke();
  },

  __drawRightDebugLine: function(ctx) {
    ctx.moveTo(this.getImageRect().right,0);
    ctx.lineTo(this.getImageRect().right,this.canvasHeight);
    ctx.stroke();
  },

  __setImageRect: function(key, value) {
    if (key in this.imageRect) this.imageRect[key] = value;
  },

  __getLeft: function() { return this.getImageRect().left},

  __getRight: function() { return this.getImageRect().right},

  __getTop: function() { return this.getImageRect().top},

  __getBottom: function() { return this.getImageRect().bottom},

  getImageRect: function() {
    return this.imageRect;
  },

  validateUserInput: function(canvasWidth, canvasHeight, xScale, yScale) {
    if ((canvasWidth || canvasWidth === 0)  && (canvasWidth > 500 || canvasWidth < 1)) {
      throw new Error("Canvas Width must be between 1 and 500");
    }

    if ((canvasHeight || canvasHeight === 0) && (canvasHeight > 500 || canvasHeight < 1)) {
      throw new Error("Canvas Height must be between 1 and 500");
    }

    if ((xScale || xScale === 0) && (xScale > 10 || xScale < .1)) {
      throw new Error("X Scale must be between .1 and 10");
    }

    if ((yScale || yScale === 0) && (yScale > 10 || yScale < .1)) {
      throw new Error("Y Scale must be between .1 and 10");
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
