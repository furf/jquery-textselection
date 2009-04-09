(function($) {


  var Selection = (function() {

  	var hasRange = (typeof document.selection !== 'undefined' && typeof document.selection.createRange !== 'undefined');
    
    return {

      /**
       * 
       */
      getSelectionRange: function(el) {

    	  var start, end;

    	  el.focus();

    	  // Mozilla / Safari
    	  if (typeof el.selectionStart !== 'undefined') {                  

    	    start = el.selectionStart;
    	    end   = el.selectionEnd;

    	  // IE
    	  } else if (hasRange) {

    	    var range = document.selection.createRange();
    	    var rangeLength = range.text.length;

    	    if(range.parentElement() != el) {
    	      throw('Unable to get selection range.');
    	    }

    	    // Textarea
    	    if (el.type === 'textarea') {

    	      var duplicate_range = range.duplicate();
    	      duplicate_range.moveToElementText(el);
    	      duplicate_range.setEndPoint('EndToEnd', range);

    	      start = duplicate_range.text.length - rangeLength;

    	    // Text Input
    	    } else {

    	      var text_range = el.createTextRange();
    	      text_range.setEndPoint("EndToStart", range);

    	      start = text_range.text.length;
    	    }

    	    end = start + rangeLength;

    	  // Unsupported type
    	  } else {
    	    throw('Unable to get selection range.');
    	  }      

    	  return {
    	    start: start,
    	    end:   end
    	  };
      },


      /**
       * 
       */
    	getSelectionStart: function(el) {
        return this.getSelectionRange(el).start;
      },


      /**
       * 
       */
      getSelectionEnd: function(el) {
        return this.getSelectionRange(el).end;
      },


      /**
       * 
       */
      setSelectionRange: function(el, start, end) {

    	  el.focus();

    	  if (typeof end === 'undefined') {
    	    end = start;
    	  }

    	  // Mozilla / Safari
    	  if (typeof el.selectionStart !== 'undefined') {

    	    el.setSelectionRange(start, end);

    	  // IE
    	  } else if (hasRange) {

          var value = el.value;
    	    var range = el.createTextRange();
    	    end   -= start + value.slice(start + 1, end).split("\n").length - 1;
    	    start -= value.slice(0, start).split("\n").length - 1;
    	    range.move('character', start);
    	    range.moveEnd('character', end);
    	    range.select();

    	  // Unsupported
    	  } else {      
    	    throw('Unable to set selection range.');
    	  }      
      },


      /**
       * 
       */
      getSelectedText: function(el) {
    	  var selection = this.getSelectionRange(el);
    	  return el.value.substring(selection.start, selection.end);
      },


      /**
       * 
       */
      insertText: function(el, text, start, end, selectText) {

        end = end || start;

    		var textLength = text.length;

        var beforeText = el.value.substring(0, start);
        var afterText  = el.value.substr(end);

    	  el.value = beforeText + text + afterText;

    		var selectionEnd  = start + textLength;

    	  if (selectText == true) {
    	    this.setSelectionRange(el, start, selectionEnd);
    	  } else {
    	    this.setSelectionRange(el, selectionEnd);
    	  }
      },


      /**
       * 
       */
      replaceSelectedText: function(el, text, selectText) {
    	  var selection = this.getSelectionRange(el);
    		this.insertText(el, text, selection.start, selection.end, selectText);
      },


      /**
       * 
       */
      wrapSelectedText: function(el, beforeText, afterText, selectText) {
    	  var text = beforeText + getSelectedText(el) + afterText;
    		this.replaceSelectedText(el, text, selectText);
      }

    };
  })();








  /**
   * 
   */
	$.fn.getSelectionRange = function() {
	  if (this.size() === 1) {
	    return Selection.getSelectionRange(this.get(0));
	  } else {
	    return this.map(function() {
    	  return Selection.getSelectionRange(this);
	    });
	  }
	};


  /**
   * 
   */
	$.fn.getSelectionStart = function() {
	  if (this.size() === 1) {
  	  return Selection.getSelectionStart(this.get(0));
	  } else {
	    return this.map(function() {
    	  return Selection.getSelectionStart(this);
	    });
	  }
	};


  /**
   * 
   */
	$.fn.getSelectionEnd = function() {
	  if (this.size() === 1) {
  	  return Selection.getSelectionEnd(this.get(0));
	  } else {
	    return this.map(function() {
    	  return Selection.getSelectionEnd(this);
	    });
	  }
	};
	

  /**
   * 
   */
	$.fn.getSelectedText = function() {
	  if (this.size() === 1) {
	    return Selection.getSelectedText(this.get(0));
	  } else {
  	  return this.map(function() {
        return Selection.getSelectedText(this);
  	  });
	  }
	};


  /**
   * 
   */
	$.fn.setSelectionRange = function(start, end) {
    return this.each(function() {
      Selection.setSelectionRange(this, start, end);
    });
	};


  /**
   * 
   */
	$.fn.insertText = function(text, start, end, selectText) {
    return this.each(function() {
      Selection.insertText(this, text, start, end, selectText);
    });
	};


  /**
   * 
   */
	$.fn.replaceSelectedText = function(text, selectText) {
    return this.each(function() {
      Selection.replaceSelectedText(this, text, selectText);
    });
	};


  /**
   * 
   */
	$.fn.wrapSelectedText = function(beforeText, afterText, selectText) {
    return this.each(function() {
      Selection.wrapSelectedText(this, beforeText, afterText, selectText);
    });
	};


})(jQuery);