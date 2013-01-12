(function($){
	/* Plugin that gives a field of dpeth to multiple elements */
	/* @Constructor Fieldofdepth */
	var Fieldofdepth = function(els, options){
		if (!(this instanceof Fieldofdepth)) {
  			return new Fieldofdepth(els, options);
		}
		var style = $('<div/>')[0].style;
		this.els = els;
		this.options = (options) ? options : {};
		this.dataset = [];
		this.filter = 
			('webkitFilter' in style) ? 'webkitFilter' 
			:('mozFilter' in style) ? 'mozFilter'
			:('msFilter' in style) ? 'msFilter'
			:('oFilter' in style) ? 'oFilter'
			: null;
		this.vendor = '';
		this.createField();
		return this;
	};

	Fieldofdepth.prototype.reverse = function(){
		this.els.reverse();
	};
	
	Fieldofdepth.prototype.generateCSS = function(i, callback){
		var obj = {};
		obj[this.filter] = 'blur(' + (this.dataset[i].depth * i) + 'px)';
		callback(obj);
	};

	Fieldofdepth.prototype.createField = function(){
		var that = this;
		if(that.options.reverse){
			that.els = $(that.els.get().reverse());
		}
		if(that.filter){
			that.els.each(function(i){
				var ele = $(this);
				that.dataset.push({
					'depth' : i * (typeof that.options.strength === 'number') ? that.options.strength : 1
				});
				that.generateCSS(i, function(css){
					ele.css(css);
				})
			})
		}
	};

	$.fn.depth = function(options){
		Fieldofdepth(this, options);
	};
}(jQuery))