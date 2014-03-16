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
    var imageMapObject = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var imageMap = imageMapObject.data;

    //var top = bottom = undefined;
    //var right = y = x = 0;
    var top = undefined;
    var right = bottom = y = x = 0;
    var left = this.canvasWidth; 

    var leftSide = this.canvasWidth * 4;
    //var totalPixels = imageMap.length - 1;
    var totalPixels = imageMap.length;
    var topEndPixel = imageMap.length/2;
    var bottomStartPixel = topEndPixel + 4;
    /*
      calculate the top
    */
    //for(var i=0; i< topEndPixel; i+=4) {
    for(var i=0; i< totalPixels; i+=4) {
      if(imageMap[i+3] > 0) { 
        if (top == undefined) top = y;
        if (y > bottom) bottom = y;
        //if (this.__topArray[x] === -1) this.__topArray[x] = y;
        if (x < left)  left = x;
        if (x > right && x!= this.canvasWidth)  right = x;
      }

      if (i % leftSide === 0 && i) {
        y++;
        x=0;
      }
      x++;
    }

/*
    x = this.canvasWidth;
    y = this.canvasHeight;

    for(var i=totalPixels; i > bottomStartPixel; i-=4) {
      if(imageMap[i] > 0) { 
        if (top == undefined) top = y;
        if (bottom == undefined) bottom = y;
        if (this.__bottomArray[x] === -1) this.__bottomArray[x] = y;
        if (x < left) { left = x;}
        if (x > right) { right = x;}
      }

      if (i % leftSide == 3) {
        y--;
        x = this.canvasWidth;
      }
      x--;
    }
    */

    this.__setImageRect('top', top);
    this.__setImageRect('bottom', bottom);
    this.__setImageRect('left', left);
    this.__setImageRect('right', right);

    /*
      imageMapObject.data = imageMap;
      ctx.putImageData(imageMapObject, 0, 0);

      //DrawLine
      this.__drawDebugLines(ctx);
    */

    this.__endTime = new Date();
    return this.__getMaskErSizeObject();
  },

  displayHandles: function() {
    var coords = this.__buildCoordinates();
    this.__ctx.globalCompositeOperation = 'source-over';
    this.__ctx.scale(1,1);
    this.__ctx.strokeStyle="#FF0000";

    this.__ctx.beginPath();
    this.__ctx.arc(coords.leftTop.x,coords.leftTop.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.leftMiddle.x,coords.leftMiddle.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.leftBottom.x,coords.leftBottom.y,2,0,2*Math.PI);
    this.__ctx.stroke();

    this.__ctx.beginPath();
    this.__ctx.arc(coords.centerTop.x,coords.centerTop.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.center.x,coords.center.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.centerBottom.x,coords.centerBottom.y,2,0,2*Math.PI);
    this.__ctx.stroke();

    this.__ctx.beginPath();
    this.__ctx.arc(coords.rightTop.x,coords.rightTop.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.rightMiddle.x,coords.rightMiddle.y,2,0,2*Math.PI);
    this.__ctx.stroke();
    this.__ctx.beginPath();
    this.__ctx.arc(coords.rightBottom.x,coords.rightBottom.y,2,0,2*Math.PI);
    this.__ctx.stroke();
  },

  __createInitializedArray: function() {
    return Array.apply(null, new Array(this.canvasWidth)).map(Number.prototype.valueOf,-1);
  },

  __createCGOEffect : function(imageElement) {
    var maskErSizeElem = $('<div id="mask-er-size"></div>');
    $('body').append(maskErSizeElem);

    this.__ctx = this.__createCanvas();

    this.__ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

    this.__ctx.globalCompositeOperation = 'source-in';

    this.__ctx.scale(this.__getXScale(), this.__getYScale());

    this.__ctx.drawImage(imageElement, 90, 25);

    return this.__ctx;
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
      coordinates : this.__buildCoordinates(),
    }
  },

  __getElapsedTime: function() {
    return this.__endTime - this.__startTime;
  },

  __getWidth: function() {
    return this.__getRight() - this.__getLeft() + 1;
  },

  __getHeight: function() {
    return this.__getBottom() - this.__getTop() + 1;
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
    if (key in this.imageRect) {
      if (key === 'top' || key === 'bottom') {
       this.imageRect[key] = value / this.__getYScale();
      } else {
       this.imageRect[key] = value / this.__getXScale();
      }
    }
  },

  __getLeft: function() { return this.__getImageRect().left; },

  __getRight: function() { return this.__getImageRect().right; },

  __getTop: function() { return this.__getImageRect().top; },

  __getBottom: function() { return this.__getImageRect().bottom; },

  __getVerticalMiddle: function() { return ((this.__getBottom() + this.__getTop()) / 2); },

  __getHorizontalMiddle: function() { return ((this.__getRight() + this.__getLeft()) / 2); },

  __getImageRect: function() {
    return this.imageRect;
  },

  __buildCoordinates: function() {
    var verticalMiddle = this.__getVerticalMiddle();
    var horizontalMiddle = this.__getHorizontalMiddle();
    return {
      leftTop : {x : this.__getLeft(), y : this.__getTop()},
      leftMiddle : {x : this.__getLeft(), y : verticalMiddle },
      leftBottom : {x : this.__getLeft(), y : this.__getBottom()},

      centerTop : {x : horizontalMiddle, y : this.__getTop()},
      center: {x : horizontalMiddle, y : verticalMiddle},
      centerBottom : {x : horizontalMiddle, y : this.__getBottom()},

      rightTop : {x : this.__getRight(), y : this.__getTop()},
      rightMiddle : {x : this.__getRight(), y : verticalMiddle },
      rightBottom : {x : this.__getRight(), y : this.__getBottom()},
    }
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
    this.__topArray = this.__createInitializedArray();
    this.__bottomArray  = this.__createInitializedArray();
    this.__ctx = undefined;
    this.imageRect = {
      top : 0,
      bottom : this.canvasHeight,
      left : 0,
      right : this.canvasWidth,
    }
  }
};
