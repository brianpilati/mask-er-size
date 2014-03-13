/* jasmine specs for MaskErSize.js go here */

describe('MaskErSize', function() {

  describe('Standard MaskErSize', function() {
      var maskErSize;
    beforeEach(function() {
      maskErSize = new MaskErSize();
    });

    describe('Initialized variables', function() {
      it('should have a canvasWidth variable', function() {
        expect(maskErSize.canvasWidth).toBe(480);
      });

      it('should have a canvasHeight variable', function() {
        expect(maskErSize.canvasHeight).toBe(360);
      });
    });

    describe('Image Rect', function() {
      it('should have a default image rect top', function() {
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.top).toBe(0);
      });

      it('should have a default image rect bottom', function() {
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.bottom).toBe(360);
      });

      it('should have a default image rect left', function() {
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.left).toBe(0);
      });

      it('should have a default image rect left', function() {
        expect(maskErSize.__getLeft()).toBe(0);
      });

      it('should have a default image rect right', function() {
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.right).toBe(480);
      });

      it('should set an image rect top attribute', function() {
        maskErSize.__setImageRect('top', 200);
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.top).toBe(200);
      });

      it('should set an image rect bottom attribute', function() {
        maskErSize.__setImageRect('bottom', 300);
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.bottom).toBe(300);
      });

      it('should set an image rect left attribute', function() {
        maskErSize.__setImageRect('left', 400);
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.left).toBe(400);
      });

      it('should set an image rect right attribute', function() {
        maskErSize.__setImageRect('right', 500);
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.right).toBe(500);
      });

      it('should not set a wrong image rect attribute', function() {
        maskErSize.__setImageRect('brian', 500);
        var imageRect = maskErSize.getImageRect();
        expect(imageRect.brian).toBe(undefined);
      });
    });
  });

  describe('User Defined variables', function() {
    it('should have a canvasWidth constraint', function() {
      expect(function() { new MaskErSize(600,400); }).toThrow(Error("Canvas Width can be no larger than 500"));
    });

    it('should have a canvasWidth constraint', function() {
      expect(function() { new MaskErSize(-1,400); }).toThrow(Error("Canvas Width must be larger than 0"));
    });

    it('should have a canvasHeight constraint', function() {
      expect(function() { new MaskErSize(400,600); }).toThrow(Error("Canvas Height can be no larger than 500"));
    });

    it('should have a canvasHeight constraint', function() {
      expect(function() { new MaskErSize(400,-1); }).toThrow(Error("Canvas Height must be larger than 0"));
    });

  });
});
