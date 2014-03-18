function DemoUtil(isFiddleJs) {
  init: {
    this.__isFiddleJs = isFiddleJs || false;
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
    this.updateResults(maskErSize.erIt(image));
    maskErSize.displayHandles();
  },

  'updateResults' : function(results) {
    var resultsElem = $('#results');
    resultsElem.html('');

    (function display(results, keyValue) {
      _.each(results, function(value, key) {
        var displayKey = (keyValue) ? keyValue + key + ' -> ' : key + ' -> ';
        if(_.isObject(value)) {
          display(value, displayKey);
        } else {
          resultsElem.append('<div class="result">' + displayKey + value + '</div>');
        }
      });
    })(results);

  },

  'addImageToCanvas': function(imageId, element) {
    var ctx = this.createCanvas(element);
    ctx.scale(1, 1);
    ctx.fillStyle="red";
    ctx.fillRect(0,0,480,360);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    var images = this.GetImages();
    var img = new Image();
    img.crossOrigin = '';
    img.src = images[imageId].imageSrc;
    img.class = "imageSize";
    ctx.drawImage(img, 90, 25);
    ctx.rect(90,25,img.height,img.width);
    ctx.stroke();
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
    img.crossOrigin = '';
    img.src = images[imageId].imageSrc;
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
    var selectElement = $('<select id="xScaleSelect"></select>');
    domElement.append(selectElement);
    var scales = [1, 2, 3, 1/9, 1/4, 1/3, 1/2, 2/3, 3/4];
    _.each(scales, function(scale) {
      selectElement.append("<option value='" + scale + "'>" + scale + "</option>");
    });
  },

  'BuildYScaleSelector' : function() {
    var domElement = $('#yScale');
    var selectElement = $('<select id="yScaleSelect"></select>');
    domElement.append(selectElement);
    var scales = [1, 2, 3, 1/9, 1/4, 1/3, 1/2, 2/3, 3/4];
    _.each(scales, function(scale) {
      selectElement.append("<option value='" + scale + "'>" + scale + "</option>");
    });
  },

  'BuildGCOSelector' : function() {
    var domElement = $('#affects');
    var selectElement = $('<select id="affectsSelect"></select>');
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
    var selectElement = $('<select id="imagesSelect"></select>');
    domElement.append(selectElement);
    _.each(this.GetImages(), function(imageObj) {
      selectElement.append("<option value='" + imageObj.index + "'>" + imageObj.imageName + "</option>");
    });
  },

  'DisplayImages' : function() {
    var element = $('#displayImages');
    _.each(this.GetImages(), function(imageObj) {
      element.append('<img id="' + imageObj.index + '" class="imageSize" src="' + imageObj.imageSrc + '">');
    });
  },

  'GetImages' : function() {
    var images = new Array();
    var i = 0;

    if (this.__isFiddleJs) {
      var hostName = "https://googledrive.com/host/";
      images.push({index: i++ , imageName : "Jpeg", imageSrc : hostName + "0BzV0qQebBQxqYXBLSFdhaTA0eTQ"}); 
      images.push({index: i++ , imageName : "Gif Transparency", imageSrc : hostName + "0BzV0qQebBQxqTjdzTHp2amlRTDQ"});
      images.push({index: i++ , imageName : "Gif no Transparency", imageSrc : hostName + "0BzV0qQebBQxqaXhUcWdSNWxCQ1E"});
      images.push({index: i++ , imageName : "SVG Transparency", imageSrc : hostName + "0BzV0qQebBQxqVXh2NUxXNWpCZzA"});
      images.push({index: i++ , imageName : "SVG No Transparency", imageSrc : hostName + "0BzV0qQebBQxqUTBWd09GVnA1em8"});
      images.push({index: i++ , imageName : "PNG Transparency", imageSrc : hostName + "0BzV0qQebBQxqNkt0cHpEbkZ2eTQ"});
      images.push({index: i++ , imageName : "PNG No Transparency", imageSrc : hostName + "0BzV0qQebBQxqV3pVUUJxMFVZOFk"});
    } else {
      images.push({index: i++ , imageName : "Jpeg", imageSrc : "/img/batman_jpg.jpg"});
      images.push({index: i++ , imageName : "Gif Transparency", imageSrc : "/img/batman_gif_transparency.gif"});
      images.push({index: i++ , imageName : "Gif no Transparency", imageSrc : "/img/batman_gif_no_transparency.gif"});
      images.push({index: i++ , imageName : "SVG Transparency", imageSrc : "/img/batman_svg_transparency.svg"});
      images.push({index: i++ , imageName : "SVG No Transparency", imageSrc : "/img/batman_svg_no_transparency.svg"});
      images.push({index: i++ , imageName : "PNG Transparency", imageSrc : "/img/batman_png_transparency.png"});
      images.push({index: i++ , imageName : "PNG No Transparency", imageSrc : "/img/batman_png_no_transparency.png"});

    }
    return images;
  },

  Delegate: function() {
    var self = this;
    $(document).delegate("#xScaleSelect, #yScaleSelect, #imagesSelect", "change", function() {
      self.calculate();
    });
  },

  'Attach' : function() {
    this.BuildGCOSelector();
    this.BuildImageSelector();
    this.BuildXScaleSelector();
    this.BuildYScaleSelector();
    this.DisplayImages();
    this.Delegate();
  }
};
