(function($) {


	var hasRange = (typeof document.selection !== 'undefined' && typeof document.selection.createRange !== 'undefined');


  /**
   * 
   */
	$.fn.getSelectionRange = function() {
	  if (this.size() === 1) {
	    return $.fn.getSelectionRange._.apply(this.get(0));
	  } else {
	    return this.map(function() {
    	  return $.fn.getSelectionRange._.apply(this);
	    });
	  }
	};


  /**
   * 
   */
  $.fn.getSelectionRange._ = function() {

	  var start, end;

	  this.focus();

	  // Mozilla / Safari
	  if (typeof this.selectionStart !== 'undefined') {                  

	    start = this.selectionStart;
	    end   = this.selectionEnd;

	  // IE
	  } else if (hasRange) {

	    var range = document.selection.createRange();
	    var rangeLength = range.text.length;

	    if(range.parentElement() != el) {
	      throw('Unable to get selection range.');
	    }

	    // Textarea
	    if (this.type === 'textarea') {

	      var duplicate_range = range.duplicate();
	      duplicate_range.moveToElementText(el);
	      duplicate_range.setEndPoint('EndToEnd', range);

	      start = duplicate_range.text.length - rangeLength;

	    // Text Input
	    } else {

	      var text_range = this.createTextRange();
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
  };


  /**
   * 
   */
	$.fn.getSelectionStart = function() {
	  if (this.size() === 1) {
  	  return $.fn.getSelectionStart._.apply(this);
	  } else {
	    return this.map(function() {
    	  return $.fn.getSelectionStart._.apply($(this));
	    });
	  }
	};


  /**
   * 
   */
	$.fn.getSelectionStart._ = function() {
    return this.getSelectionRange().start;
  };


  /**
   * 
   */
	$.fn.getSelectionEnd = function() {
	  if (this.size() === 1) {
  	  return $.fn.getSelectionEnd._.apply(this);
	  } else {
	    return this.map(function() {
    	  return $.fn.getSelectionEnd._.apply($(this));
	    });
	  }
	};


  /**
   * 
   */
	$.fn.getSelectionEnd._ = function() {
    return this.getSelectionRange().end;
  };


  /**
   * 
   */
	$.fn.setSelectionRange = function(start, end) {
    return this.each(function() {

  	  this.focus();

  	  if (typeof end === 'undefined') {
  	    end = start;
  	  }

  	  // Mozilla / Safari
  	  if (typeof this.selectionStart !== 'undefined') {

  	    this.setSelectionRange(start, end);

  	  // IE
  	  } else if (hasRange) {

        var value = this.value;
  	    var range = this.createTextRange();
  	    end   -= start + value.slice(start + 1, end).split("\n").length - 1;
  	    start -= value.slice(0, start).split("\n").length - 1;
  	    range.move('character', start);
  	    range.moveEnd('character', end);
  	    range.select();

  	  // Unsupported
  	  } else {      
  	    throw('Unable to set selection range.');
  	  }      
  	  
    });
	};


  /**
   * 
   */
	$.fn.getSelectedText = function() {
	  if (this.size() === 1) {
	    return $.fn.getSelectedText._.apply(this);
	  } else {
  	  return this.map(function() {
        return $.fn.getSelectedText._.apply($(this));
  	  });
	  }
	};
	$.fn.getSelectedText._ = function() {
	  var selection = this.getSelectionRange();
	  return this.val().substring(selection.start, selection.end);
	};


  /**
   * 
   */
	$.fn.insertText = function(text, start, end, selectText) {

	  end = end || start;
    
    return this.each(function() {
      
      var $this = $(this);
  	  var value = this.value; // DO NOT USE this.val()
  		var textLength = text.length;

      var beforeText = value.substring(0, start);
      var afterText  = value.substr(end);

  	  $this.val(beforeText + text + afterText);

  		var selectionEnd  = start + textLength;

  	  if (selectText == true) {
  	    $this.setSelectionRange(start, selectionEnd);
  	  } else {
  	    $this.setSelectionRange(selectionEnd);
  	  }
    });
	};


  /**
   * 
   */
	$.fn.replaceSelectedText = function(text, selectText) {
    return this.each(function() {
      var $this = $(this);
  	  var selection = $this.getSelectionRange();
  		$this.insertText(text, selection.start, selection.end, selectText);
    });
	};


  /**
   * 
   */
	$.fn.wrapSelectedText = function(beforeText, afterText, selectText) {
    return this.each(function() {
      var $this = $(this);
  	  var selection = $this.getSelectionRange();
  	  var text = $this.getSelectedText();
  		$this.insertText(beforeText + text + afterText, selection.start, selection.end, selectText);
    });
	};


})(jQuery);