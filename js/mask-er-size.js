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
  erIt: function(imageElement) {
    ctx = this.__createCGOEffect(imageElement);
    this.__startTime = new Date();
    var aDataObj = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var aData = aDataObj.data;
    /*
    var top = undefined;
    var right = 0;
    var left = this.canvasWidth; 
    var bottom = 0; 
    var y = 0;
    var x = 0;
    var leftSide = (this.canvasWidth*4);
    for(var i=0; i< aData.length; i+=4) {
      if(aData[i+3] > 0) { 
        if (top == undefined) { top = y;}
        if ( y > bottom ) bottom = y;
        if ( x < left ) left = x;
        if ( x > right ) right = x;

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

    this.__setImageRect('top', top);
    this.__setImageRect('bottom', bottom);
    this.__setImageRect('left', left);
    this.__setImageRect('right', right);

    aDataObj.data = aData;
    ctx.putImageData(aDataObj, 0, 0);

    //DrawLine
    this.__drawDebugLines(ctx);

    */
    this.__endTime = new Date();
    return this.__getMaskErSizeObject();
  },

  __createCGOEffect : function(imageElement) {
    var maskErSizeElem = $('<div id="mask-er-size"></div>');
    $('body').append(maskErSizeElem);

    var ctx = this.__createCanvas();

    ctx.fillStyle="blue";
    ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

    ctx.globalCompositeOperation = 'source-in';

    ctx.scale(this.__getXScale(), this.__getYScale());
    ctx.drawImage(imageElement[0], 1, 1);

    return ctx;
  },

  __createCanvas : function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    $('#mask-er-size').html(canvas);
    return canvas.getContext("2d");
  },

  __getMaskErSizeObject: function() {
    return {
      rect: this.__getImageRect(),
      width: this.__getWidth(),
      height: this.__getHeight(),
      elapsedTime : this.__getElapsedTime(),
    }
  },

  __getElapsedTime: function() {
    return this.__endTime - this.__startTime;
  },

  __getWidth: function() {
    return this.__getRight() - this.__getLeft();
  },

  __getHeight: function() {
    return this.__getBottom() - this.__getTop();
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
    ctx.moveTo(0,this.__getImageRect().top);
    ctx.lineTo(this.canvasWidth,this.__getImageRect().top);
    ctx.stroke();
  },

  __drawBottomDebugLine: function(ctx) {
    ctx.moveTo(0,this.__getImageRect().bottom);
    ctx.lineTo(this.canvasWidth, this.__getImageRect().bottom);
    ctx.stroke();
  },

  __drawLeftDebugLine: function(ctx) {
    ctx.moveTo(this.__getImageRect().left,0);
    ctx.lineTo(this.__getImageRect().left,this.canvasHeight);
    ctx.stroke();
  },

  __drawRightDebugLine: function(ctx) {
    ctx.moveTo(this.__getImageRect().right,0);
    ctx.lineTo(this.__getImageRect().right,this.canvasHeight);
    ctx.stroke();
  },

  __setImageRect: function(key, value) {
    if (key in this.imageRect) this.imageRect[key] = value;
  },

  __getLeft: function() { return this.__getImageRect().left; },

  __getRight: function() { return this.__getImageRect().right; },

  __getTop: function() { return this.__getImageRect().top; },

  __getBottom: function() { return this.__getImageRect().bottom; },

  __getImageRect: function() {
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

  demoMode: function(ctx) {
    this.__startTime = new Date();
    var aDataObj = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var aData = aDataObj.data;
    var top = undefined;
    var right = 0;
    var left = this.canvasWidth; 
    var bottom = 0; 
    var y = 0;
    var x = 0;
    var leftSide = (this.canvasWidth*4);
    for(var i=0; i< aData.length; i+=4) {
      if(aData[i+3] > 0) { 
        if (top == undefined) { top = y;}
        if ( y > bottom ) bottom = y;
        if ( x < left ) left = x;
        if ( x > right ) right = x;

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

    this.__setImageRect('top', top);
    this.__setImageRect('bottom', bottom);
    this.__setImageRect('left', left);
    this.__setImageRect('right', right);

    aDataObj.data = aData;
    ctx.putImageData(aDataObj, 0, 0);

    //DrawLine
    this.__drawDebugLines(ctx);

    this.__endTime = new Date();
    return this.__getMaskErSizeObject();
  },

  initializeVariables: function() {
    this.__startTime = null;
    this.__endTime = null;
    this.imageRect = {
      top : 0,
      bottom : this.canvasHeight,
      left : 0,
      right : this.canvasWidth,
    };
  }
};
