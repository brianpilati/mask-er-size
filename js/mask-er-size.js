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

    var top = undefined;
    var right = bottom = y = x = 0;
    var left = this.canvasWidth; 

    var leftSide = this.canvasWidth * 4;
    var totalPixels = imageMap.length;
    for(var i=0; i< totalPixels; i+=4) {
      if(imageMap[i+3] > 0) { 
        if (top == undefined) top = y;
        if (y > bottom) bottom = y;
        if (x < left)  left = x;
        if (x > right && x!= this.canvasWidth)  right = x;
      }

      if (i % leftSide === 0 && i) {
        y++;
        x=0;
      }
      x++;
    }

    this.__setImageRect('top', top);
    this.__setImageRect('bottom', bottom);
    this.__setImageRect('left', left);
    this.__setImageRect('right', right);

    this.__endTime = new Date();
    return this.__getMaskErSizeObject();
  },

  __displayHandle: function(coord) {
    this.__ctx.beginPath();
    this.__ctx.arc(coord.x,coord.y,2,0,2*Math.PI);
    this.__ctx.fillText(coord.x + "," + coord.y, coord.x - 10, coord.y - 5);
    this.__ctx.stroke();
  },

  displayHandles: function() {
    var coords = this.__buildCoordinates();
    this.__ctx.globalCompositeOperation = 'source-over';
    this.__ctx.scale(1,1);
    this.__ctx.strokeStyle="#FF0000";

    var self = this;
    _.each(coords, function(coordObj) {
      self.__displayHandle(coordObj);
    });
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

  initializeVariables: function() {
    this.__startTime = null;
    this.__endTime = null;
    this.__ctx = undefined;
    this.imageRect = {
      top : 0,
      bottom : this.canvasHeight,
      left : 0,
      right : this.canvasWidth,
    }
  }
};
