(function() {
  var _viewportWidth, _viewportHeight, _viewportAspect;
  
  var _instances = [];
  
  var _resize = function() {
    _viewportWidth = window.innerWidth;
    _viewportHeight = window.innerHeight;
    _viewportAspect = _viewportWidth * 1.0 / _viewportHeight;
    _instances.forEach(function(instance) {
      instance.queueRelayout();
    });
  }
  
  window.addEventListener('resize', _resize);
  _resize();
  
  var _frameLocks = {}
  _frameLock = function(name, method) {
    if (_frameLocks[name]) {
      cancelAnimationFrame(_frameLocks[name]);
      _frameLocks[name] = null;
      _frameLock(name, method);
    } else {
      _frameLocks[name] = requestAnimationFrame(function() {
        method();
        _frameLocks[name] = null;
      });
    }
  }
  
  Polymer('dapper-deck', {
    /**
     * The base width for the presentation's content. Defaults to 1280.
     * 
     * @attribute contentWidth
     * @type integer
     */
    contentWidth: 1280,
    /**
     * The base height for the presentation's content. Defaults to 720.
     * 
     * @attribute contentHeight
     * @type integer
     */
    contentHeight: 720,
    /**
     * The theme you'd like to use. This can be a path to a `.css` file or
     * one of the built-in themes.
     * 
     * @attribute theme
     * type string
     */
    theme: 'default',
    
    created: function() {
      _instances.push(this);
    },
    ready: function() {
      this.queueRelayout();
    },
    attached: function() {
      if (!this.querySelector('dapper-slide[active]') && this.childNodes[0]) {
        this.querySelector('dapper-slide').setAttribute('active', 'true');
      }
    },
    observe: {
      contentWidth: 'queueRelayout',
      contentHeight: 'queueRelayout'
    },
    queueRelayout: function() {
      _frameLock('relayout', this.relayout.bind(this));
    },
    relayout: function() {
      this.$.slides.style.width = this.contentWidth.toString() + "px";
      this.$.slides.style.height = this.contentHeight.toString() + "px";
      
      var contentAspect = this.contentWidth * 1.0 / this.contentHeight;
      
      var scale = (_viewportAspect > contentAspect) ?
        _viewportHeight * 1.0 / this.contentHeight :
        _viewportWidth * 1.0 / this.contentWidth;
      
      this.$.container.style.width = (this.contentWidth * scale).toString() + "px";
      this.$.container.style.height = (this.contentHeight * scale).toString() + "px";
      this.$.slides.style.webkitTransform = "translate(-50%, -50%) scale(" + scale + ") translate(50%, 50%)";
    },
    nextSlide: function() {
      var max = this.querySelectorAll('dapper-slide').length - 1;
      
      if (this.$.slides.selected < max) {
        console.log("Next one!");
        this.$.slides.selected += 1;
      } else {
        console.log("Back to the beginning");
        this.$.slides.selected = 0;
      }
    },
    themeChanged: function() {
      if (this.theme.indexOf('.css') >= 0) {
        this.themeFile = this.theme;
      } else {
        this.themeFile = "../themes/" + this.theme + ".css";
      }
    }
  });  
})();