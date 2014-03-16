function DemoUtil() {
  init: {
    this.Attach();
  }

};

DemoUtil.prototype = {
  'calculate' : function() {
    var image = this.addImageToCanvas($('#imagesSelect').val(), 'image');
    //this.createGCOEffect($('#affectsSelect').val(), $('#imagesSelect').val(), 'composite');
    //var ctx = this.createGCOEffect('source-in', $('#imagesSelect').val(), 'maskErSize');
    var xScale = $('#xScaleSelect').val();
    var yScale = $('#yScaleSelect').val();
    var maskErSize = new MaskErSize(480, 360, xScale, yScale);
    //this.updateResults(maskErSize.demoMode(ctx));
    //maskErSize.erIt($('#imagesSelect').val());
    //maskErSize.displayHandles();
    maskErSize.erIt(image);
    maskErSize.displayHandles();
  },

  'updateResults' : function(results) {
    var resultsElem = $('#results');
    resultsElem.html('');

    resultsObj = {
      'Elasped Time' : results.elapsedTime + ' ms',
      'Top' : results.rect.top,
      'Bottom' : results.rect.bottom,
      'Left' : results.rect.left,
      'Right' : results.rect.right,
      'Height' : results.height,
      'Width' : results.width,
    };

    _.each(resultsObj, function(value, key) {
      resultsElem.append('<div class="result">' + key + ': ' + value + '</div>');

    });
  },

  'addImageToCanvas': function(imageId, element) {
    var ctx = this.createCanvas(element);
    ctx.scale(1, 1);
    var images = this.GetImages();
    var img = new Image();
    img.src = "/img/" + images[imageId].imageName;
    img.class = "imageSize";
    ctx.drawImage(img, 0, 0);
    return img;
  },

/*
  'addImageToCanvas' : function(imageId, element) {
    var ctx = this.createCanvas(element);
    var imageElement = $('#' +  imageId)[0];
    console.log(imageElement);
    ctx.scale(1, 1);
    ctx.drawImage(imageElement, 0, 0);

    return ctx;
  },
  */

  'createGCOEffect' : function(effect, imageId, element) {
    var ctx = this.createCanvas(element);
    //var imageElement = $('#' +  imageId)[0];

    ctx.fillStyle="blue";
    ctx.fillRect(0,0,480,360);

    ctx.globalCompositeOperation=effect;

    ctx.scale(1, 1);

    var images = this.GetImages();
    var img = new Image();
    img.src = "/img/" + images[imageId].imageName;
    ctx.drawImage(img, 1, 1);

    return ctx;
  },

  'createCanvas' : function(element) {
    var canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 360;
    $('#' + element).html(canvas);
    return canvas.getContext("2d");
  },

  'BuildXScaleSelector' : function() {
    var domElement = $('#xScale');
    var selectElement = $('<select onChange="DemoUtil.prototype.calculate()" id="xScaleSelect"></select>');
    domElement.append(selectElement);
    var scales = [1, 2, 3, 1/9, 1/4, 1/3, 1/2, 2/3, 3/4];
    _.each(scales, function(scale) {
      selectElement.append("<option value='" + scale + "'>" + scale + "</option>");
    });
  },

  'BuildYScaleSelector' : function() {
    var domElement = $('#yScale');
    var selectElement = $('<select onChange="DemoUtil.prototype.calculate()" id="yScaleSelect"></select>');
    domElement.append(selectElement);
    var scales = [1, 2, 3, 1/9, 1/4, 1/3, 1/2, 2/3, 3/4];
    _.each(scales, function(scale) {
      selectElement.append("<option value='" + scale + "'>" + scale + "</option>");
    });
  },

  'BuildGCOSelector' : function() {
    var domElement = $('#affects');
    var selectElement = $('<select onChange="DemoUtil.prototype.calculate()" id="affectsSelect"></select>');
    domElement.append(selectElement);
    _.each(this.GetGlobalCompositeOperations(), function(gco) {
      selectElement.append("<option value='" + gco + "'>" + gco + "</option>");
    });
  },

  'GetGlobalCompositeOperations' : function() {
    var gco = new Array();
    gco.push("source-atop");
    gco.push("source-in");
    gco.push("source-out");
    gco.push("source-over");
    gco.push("destination-atop");
    gco.push("destination-in");
    gco.push("destination-out");
    gco.push("destination-over");
    gco.push("lighter");
    gco.push("copy");
    gco.push("xor");
    return gco;
  },

  'BuildImageSelector' : function() {
    var domElement = $('#images');
    var selectElement = $('<select onChange="DemoUtil.prototype.calculate()" id="imagesSelect"></select>');
    domElement.append(selectElement);
    _.each(this.GetImages(), function(imageObj) {
      selectElement.append("<option value='" + imageObj.index + "'>" + imageObj.imageName + "</option>");
    });
  },

  'DisplayImages' : function() {
    var element = $('#displayImages');
    _.each(this.GetImages(), function(imageObj) {
      element.append('<img id="' + imageObj.index + '" class="imageSize" src="/img/' + imageObj.imageName + '">');
    });
  },

  'GetImages' : function() {
    var images = new Array();
    var i = 0;
    images.push({index: i++ , imageName : "batman_jpg.jpg"});
    images.push({index: i++ , imageName : "batman_gif_transparency.gif"});
    images.push({index: i++ , imageName : "batman_gif_no_transparency.gif"});
    images.push({index: i++ , imageName : "batman_svg_transparency.svg"});
    images.push({index: i++ , imageName : "batman_svg_no_transparency.svg"});
    images.push({index: i++ , imageName : "batman_png_transparency.png"});
    images.push({index: i++ , imageName : "batman_png_no_transparency.png"});
    return images;
  },

  'Attach' : function() {
    this.BuildGCOSelector();
    this.BuildImageSelector();
    this.BuildXScaleSelector();
    this.BuildYScaleSelector();
    this.DisplayImages();
  }
};
