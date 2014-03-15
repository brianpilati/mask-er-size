function DemoUtil() {
  init: {
    this.Attach();
  }

};

DemoUtil.prototype = {
  'attach' : function() {
    this.addImageToCanvas($('#imagesSelect').val(), 'image');
    this.createGCOEffect($('#affectsSelect').val(), $('#imagesSelect').val(), 'composite');
    var ctx = this.createGCOEffect('source-in', $('#imagesSelect').val(), 'maskErSize');
    var maskErSize = new MaskErSize();
    this.updateResults(maskErSize.demoMode(ctx));
    console.log($('#imagesSelect').val());
    maskErSize.erIt($('#' + ($('#imagesSelect').val())));
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

  'addImageToCanvas' : function(imageId, element) {
    var ctx = this.createCanvas(element);
    var imageElement = $('#' +  imageId)[0];
    ctx.scale(1, 1);
    ctx.drawImage(imageElement, 0, 0);

    return ctx;
  },

  'createGCOEffect' : function(effect, imageId, element) {
    var ctx = this.createCanvas(element);
    var imageElement = $('#' +  imageId)[0];

    ctx.fillStyle="blue";
    ctx.fillRect(0,0,480,360);

    ctx.globalCompositeOperation=effect;

    ctx.scale(1, 1);
    ctx.drawImage(imageElement, 1, 1);

    return ctx;
  },

  'createCanvas' : function(element) {
    var canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 360;
    $('#' + element).html(canvas);
    return canvas.getContext("2d");
  },

  'BuildGCOSelector' : function() {
    var domElement = $('#affects');
    var selectElement = $('<select onChange="DemoUtil.prototype.attach()" id="affectsSelect"></select>');
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
    var selectElement = $('<select onChange="DemoUtil.prototype.attach()" id="imagesSelect"></select>');
    domElement.append(selectElement);
    _.each(this.GetImages(), function(image, index) {
      selectElement.append("<option value='image_" + index + "'>" + image + "</option>");
    });
  },

  'DisplayImages' : function() {
    var element = $('#displayImages');
    _.each(this.GetImages(), function(image, index) {
      element.append('<img id="image_' + index + '" class="imageSize" src="/img/' + image + '">');
    });
  },

  'GetImages' : function() {
    var images = new Array();
    images.push("deathStar.png");
    images.push("asteroid.png");
    images.push("costume1.svg");

    return images;
  },

  'Attach' : function() {
    this.BuildGCOSelector();
    this.BuildImageSelector();
    this.DisplayImages();
  }
};
