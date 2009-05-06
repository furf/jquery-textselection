(function($) {


  $.fn.extend({

    /**
     *
     */
    getSelectionRange: function() {
	    return Selection.getSelectionRange(this[0]);
  	},


    /**
     *
     */
  	getSelectionStart: function() {
  	  return Selection.getSelectionStart(this[0]);
  	},


    /**
     *
     */
  	getSelectionEnd: function() {
  	  return Selection.getSelectionEnd(this[0]);
  	},


    /**
     *
     */
  	getSelectedText: function() {
	    return Selection.getSelectedText(this[0]);
  	},


    /**
     *
     */
  	setSelectionRange: function(start, end) {
      return this.each(function() {
        Selection.setSelectionRange(this, start, end);
      });
  	},


    /**
     *
     */
  	insertText: function(text, start, end, selectText) {
      return this.each(function() {
        Selection.insertText(this, text, start, end, selectText);
      });
  	},


    /**
     *
     */
  	replaceSelectedText: function(text, selectText) {
      return this.each(function() {
        Selection.replaceSelectedText(this, text, selectText);
      });
  	},


    /**
     *
     */
  	wrapSelectedText: function(beforeText, afterText, selectText) {
      return this.each(function() {
        Selection.wrapSelectedText(this, beforeText, afterText, selectText);
      });
  	}
  	
  });


})(jQuery);