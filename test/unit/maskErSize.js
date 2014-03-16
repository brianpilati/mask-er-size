/* jasmine specs for MaskErSize.js go here */

describe('MaskErSize', function() {
  var maskErSize;
  beforeEach(function() {
    maskErSize = new MaskErSize();
  });

  describe('Standard MaskErSize', function() {
    describe('Initialized variables', function() {
      it('should have a canvasWidth variable', function() {
        expect(maskErSize.canvasWidth).toBe(480);
      });

      it('should have a canvasHeight variable', function() {
        expect(maskErSize.canvasHeight).toBe(360);
      });

      it('should have a xScale variable', function() {
        expect(maskErSize.xScale).toBe(1);
      });

      it('should have a yScale variable', function() {
        expect(maskErSize.yScale).toBe(1);
      });

      it('should have a topArray variable', function() {
        expect(maskErSize.__topArray.length).toBe(480);
      });

      it('should have a bottomArray variable', function() {
        expect(maskErSize.__bottomArray.length).toBe(480);
      });

      it('should have a ctx variable', function() {
        expect(maskErSize.__ctx).toBe(undefined);
      });
    });

    describe('Timer', function() {
      it('should have a startTime', function() {
        expect(maskErSize.__startTime).toBe(null);
      });

      it('should have a endTime', function() {
        expect(maskErSize.__endTime).toBe(null);
      });
    });

    describe('Scale', function() {
      it('should have a return the xScale', function() {
        expect(maskErSize.__getXScale()).toBe(1);
      });

      it('should have a return the yScale', function() {
        expect(maskErSize.__getYScale()).toBe(1);
      });

      it('should set the ctx scale', function() {
        var ctx = new ctxMock();
        spyOn(ctx, "scale");
        maskErSize.__setCTXScale(ctx);
        expect(ctx.scale).toHaveBeenCalledWith(1, 1);
      });
    });

    describe('Image Rect', function() {
      describe('Getters', function() {
        it('should have a default image rect top', function() {
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.top).toBe(0);
        });

        it('should have a default image rect bottom', function() {
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.bottom).toBe(360);
        });

        it('should have a default image rect left', function() {
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.left).toBe(0);
        });

        it('should have a default image rect right', function() {
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.right).toBe(480);
        });

        it('should have a default image rect left', function() {
          expect(maskErSize.__getLeft()).toBe(0);
        });

        it('should have a default image rect right', function() {
          expect(maskErSize.__getRight()).toBe(480);
        });

        it('should have a default image rect top', function() {
          expect(maskErSize.__getTop()).toBe(0);
        });

        it('should have a default image rect bottom', function() {
          expect(maskErSize.__getBottom()).toBe(360);
        });

        it('should have a default vertical middle', function() {
          expect(maskErSize.__getVerticalMiddle()).toBe(180);
        });

        it('should have a default horizontal middle', function() {
          expect(maskErSize.__getHorizontalMiddle()).toBe(240);
        });
      });

      describe('Setters', function() {
        it('should set an image rect top attribute', function() {
          maskErSize.__setImageRect('top', 200);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.top).toBe(200);
        });

        it('should set an image rect bottom attribute', function() {
          maskErSize.__setImageRect('bottom', 300);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.bottom).toBe(300);
        });

        it('should set an image rect left attribute', function() {
          maskErSize.__setImageRect('left', 400);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.left).toBe(400);
        });

        it('should set an image rect right attribute', function() {
          maskErSize.__setImageRect('right', 500);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.right).toBe(500);
        });

        it('should not set a wrong image rect attribute', function() {
          maskErSize.__setImageRect('brian', 500);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.brian).toBe(undefined);
        });
      });

      describe('Scale', function() {
        it('should set an image rect top attribute', function() {
          maskErSize.xScale = 2;
          maskErSize.__setImageRect('top', 200);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.top).toBe(200);
        });

        it('should set an image rect bottom attribute', function() {
          maskErSize.xScale = 2;
          maskErSize.yScale = 4;
          maskErSize.__setImageRect('bottom', 200);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.bottom).toBe(50);
        });

        it('should set an image rect left attribute', function() {
          maskErSize.xScale = .5;
          maskErSize.yScale = 3;
          maskErSize.__setImageRect('left', 400);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.left).toBe(800);
        });

        it('should set an image rect right attribute', function() {
          maskErSize.xScale = .25;
          maskErSize.yScale = 3;
          maskErSize.__setImageRect('right', 2000);
          var imageRect = maskErSize.__getImageRect();
          expect(imageRect.right).toBe(8000);
        });
      });
    });

    describe('Create Canvas', function() {
      it('should return a canvas.getContext', function() {
        spyOn(document, "createElement").andReturn(new canvasMock());
        maskErSize.__createCanvas();
        expect(document.createElement).toHaveBeenCalledWith("canvas");
      });
    });

    describe('Create CanvasCGOEffect', function() {
      var element;
      beforeEach(function() {
        setFixtures('<img id="image" src="/img/asteroid.png">');
        element = $('#image')[0];
      });

      it('should return a ctx object', function() {
        var ctx = new ctxMock;
        spyOn(maskErSize, "__createCanvas").andReturn(ctx);
        expect(maskErSize.__createCGOEffect(element)).toEqual(ctx);
        expect(maskErSize.__createCanvas).toHaveBeenCalled();
      });
    });

    describe('Create Initialized Array', function() {
      it('should return an array of canvas width ', function() {
        var newArray = maskErSize.__createInitializedArray();
        expect(newArray.length).toBe(480);
        expect(newArray[240]).toBe(-1);
      });
    });
  });

  describe('User Defined variables', function() {
    var widthError, heightError, xScaleError, yScaleError;
    beforeEach(function() {
      heightError = 'Canvas Height must be between 1 and 500';
      widthError = 'Canvas Width must be between 1 and 500';
      xScaleError = 'X Scale must be between .1 and 10';
      yScaleError = 'Y Scale must be between .1 and 10';
    });

    describe('Error Handling', function() {
      it('should have a canvasWidth constraint', function() {
        expect(function() { new MaskErSize(0,400); }).toThrow(Error(widthError));
      });

      it('should have a canvasWidth constraint', function() {
        expect(function() { new MaskErSize(600,400); }).toThrow(Error(widthError));
      });

      it('should have a canvasWidth constraint', function() {
        expect(function() { new MaskErSize(-1,400); }).toThrow(Error(widthError));
      });

      it('should have a canvasHeight constraint', function() {
        expect(function() { new MaskErSize(400,0); }).toThrow(Error(heightError));
      });

      it('should have a canvasHeight constraint', function() {
        expect(function() { new MaskErSize(400,600); }).toThrow(Error(heightError));
      });

      it('should have a canvasHeight constraint', function() {
        expect(function() { new MaskErSize(400,-1); }).toThrow(Error(heightError));
      });

      it('should have a xScale constraint', function() {
        expect(function() { new MaskErSize(400,400, 0, 1); }).toThrow(Error(xScaleError));
      });

      it('should have a xScale constraint', function() {
        expect(function() { new MaskErSize(400,400, 11, 1); }).toThrow(Error(xScaleError));
      });

      it('should have a xScale constraint', function() {
        expect(function() { new MaskErSize(400,400, .05, 1); }).toThrow(Error(xScaleError));
      });

      it('should have a yScale constraint', function() {
        expect(function() { new MaskErSize(400,400, 1, 0); }).toThrow(Error(yScaleError));
      });

      it('should have a yScale constraint', function() {
        expect(function() { new MaskErSize(400,400, 1, 11); }).toThrow(Error(yScaleError));
      });

      it('should have a yScale constraint', function() {
        expect(function() { new MaskErSize(400,400, 1, .05); }).toThrow(Error(yScaleError));
      });
    });

    describe('MaskErSize Object', function() {
      var customMaskErSize, maskErSizeObj;
      beforeEach(function() {
        customMaskErSize = new MaskErSize(7,11);
        setFixtures('<img id="image" src="/img/asteroid.png">');
        var element = $('#image')[0];
        var ctx = new ctxMock;
        spyOn(customMaskErSize, "__createCGOEffect").andReturn(ctx);
        spyOn(customMaskErSize, "__drawDebugLines");
        maskErSizeObj = customMaskErSize.erIt(element);
      });

      describe('Rect Object', function() {
        it('should have a rect object with a top attribute', function() {
          expect(maskErSizeObj.rect.top).toBe(1);
        });

        it('should have a rect object with a bottom attribute', function() {
          expect(maskErSizeObj.rect.bottom).toBe(8);
        });

        it('should have a rect object with a left attribute', function() {
          expect(maskErSizeObj.rect.left).toBe(2);
        });

        it('should have a rect object with a right attribute', function() {
          expect(maskErSizeObj.rect.right).toBe(5);
        });
      });

      describe('Height and Width', function() {
        it('should have a width attribute', function() {
          expect(maskErSizeObj.width).toBe(4);
        });

        it('should have a height attribute', function() {
          expect(maskErSizeObj.height).toBe(8);
        });
      });

      describe('Timer', function() {
        it('should have an elapsedTime attribute', function() {
          expect(maskErSizeObj.elapsedTime >= 0).toBe(true);
        });
      });

      describe('Coordinates', function() {
        it('should have a default image coordinate leftTop', function() {
          expect(maskErSizeObj.coordinates.leftTop).toEqual({x : 2, y : 1});
        });

        it('should have a default image coordinate leftMiddle', function() {
          expect(maskErSizeObj.coordinates.leftMiddle).toEqual({x : 2, y : 4.5});
        });

        it('should have a default image coordinate leftBottom', function() {
          expect(maskErSizeObj.coordinates.leftBottom).toEqual({x : 2, y : 8});
        });

        it('should have a default image coordinate centerTop', function() {
          expect(maskErSizeObj.coordinates.centerTop).toEqual({x : 3.5, y : 1});
        });

        it('should have a default image coordinate centerMiddle', function() {
          expect(maskErSizeObj.coordinates.center).toEqual({x : 3.5, y : 4.5});
        });

        it('should have a default image coordinate centerBottom', function() {
          expect(maskErSizeObj.coordinates.centerBottom).toEqual({x : 3.5, y : 8});
        });

        it('should have a default image coordinate rightTop', function() {
          expect(maskErSizeObj.coordinates.rightTop).toEqual({x : 5, y : 1});
        });

        it('should have a default image coordinate rightMiddle', function() {
          expect(maskErSizeObj.coordinates.rightMiddle).toEqual({x : 5, y : 4.5});
        });

        it('should have a default image coordinate rightBottom', function() {
          expect(maskErSizeObj.coordinates.rightBottom).toEqual({x : 5, y : 8});
        });
      });
    });
  });
});
