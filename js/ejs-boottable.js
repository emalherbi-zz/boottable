/*!
 * bootTable vs 0.0.4 by emalherbi.com
 */

/* IE8 trim function not exist */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
/* IE not working object keys */
if (!Object.keys) {
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

/* plugin bootTable */
(function($){
	if(!$.Table){
		$.Table = new Object();
	};

	$.Table.boot = function(el, header, values, options) {
		var base = this;

		base.$el = $(el);
		base.el = el;

		base.$el.data("Table.boot", base);

    /* initialize plugin */
		base.initialize = function() {
			if( typeof( header ) === "undefined" || header === null ) header = '';
			if( typeof( values ) === "undefined" || values === null ) values = '';

			base.header = header;
			base.values = values;

			base.options = $.extend({},$.Table.boot.defaultOptions, options);

      return true;
		};

    /*
    * init table
    */
    base.init = function() {
      base.clr(); /* clear table */
      base.msg(); /* adds a default message when no records found in table */

      base.$el.css('cursor', 'pointer'); /* set cursor pointer */

      /* add bootTable loader */
      if ( $('.bootTableLoader').length == 0 ) {
        var style = $('<style>.bootTableLoader { background-repeat: no-repeat; bottom: 0; height: 0; left: 0; margin: 0 auto; padding: 3px; position: absolute; right: 0; text-align: center; width: 100px; }</style>');
        $('html > head').append(style);
      }

      /* add bootTable selected */
      // if ( $('#' + base.$el.attr('id') + ' tbody tr.selected').length == 0 ) {
      //  var style = $('<style>' + '#' + base.$el.attr('id') + ' tbody tr.selected { background: #d9ebf5 !important; }</style>');
      //  $('html > head').append(style);
      // }

      return true;
    }

    /*
    * removes all table items
    */
		base.clr = function() {
			$('#'+base.$el.attr('id')+' tbody tr').remove();

			return true;
		}

    /*
    * adds a default message when no records found in table
    */
    base.msg = function() {
      var colspan = base.$el.find('thead').find("tr").find('th').length;
      base.$el.append('<tr><td colspan="'+colspan+'" >'+base.options.msg+'</td></tr>');

      return true;
    }

    /*
    * add div loader on page
    */
    base.startLoader = function() {
      var div = '<div class=\'bootTableLoader\' style=\'background-image: url("data:image/gif;base64,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"); display:block;\' ></div>';
      base.$el.before( div );
    }

    /*
    * remove all div loaders
    */
    base.endLoader = function() {
      base.$el.parent().find('.bootTableLoader').remove();
    }

    /*
    * add itens
    *
    * Please. If necessary insert a large amount of records in the table, use the method addall.
    */
		base.add = function() {
			var arr = [];
			$.each(base.header, function(i, v) {
				arr.push( i + "='" + v + "'" );
			});
			var join = arr.join(" ");

			var tr = "";
			tr += "<tr " + join + " >";

			$.each(base.values, function(i, v) {
				tr += "<td>" + v + "</td>";
			});
			tr += "</tr>";

			base.$el.append( tr );
			base.$el.show('fast');

			return true;
		};

		base.addall = function() {
			var itens = '';

      base.clr(); /* first clear table */
      if ( base.header.length == 0 ) { /* if not found a record, a message is automatically added */
        base.msg(); /* added a message */
      }
      else {
  			$.each(base.header, function(key, header) {
  				var arr = [];
  				$.each(header, function(i, v) {
  					arr.push( i + "='" + v + "'" );
  				});
  				var join = arr.join(" ");

  				var tr = "";
  				tr += "<tr " + join + " >";

  				var values = base.values[key];
  				$.each(values, function(i, v) {
  					tr += "<td>" + v + "</td>";
  				});

  				tr += "</tr>";
  				itens += tr;
  			});
  			base.$el.append( itens );
      }

			base.$el.show('fast');
			return true;
		};

		base.edt = function() {
			var r = false;

			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody').find('tr').each(function(i, el) {
				var id = $(el).attr( key.toString().toLowerCase() );

				if ( id == value ) {
					var columns = $('#'+base.$el.attr('id')+' thead tr th').map(function() {
					    return $(this).attr('field');
					});
					var table = $('#'+base.$el.attr('id')+' tbody tr:nth-child('+(i+1)+')').map(function(i) {
						var row = {};
						$(this).find('td').each(function(i) {
							var v = $(this).find('input').val();
							if ( typeof v == 'undefined' ) {
							  v = $(this).find('textarea').val();
					    	if ( typeof v == 'undefined' ) {
					    		v = $(this).find('label').text();
					    		if ( !v.trim() ) {
						   			v = $(this).text();
									}
						   	}
							}

							row[ columns[i] ] = v;
						});
						return row;
					}).get();

					r = table;
				}
			});

			return r[0];
		};

		base.del = function(){
			var r = false;

			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody').find('tr').each(function(i, el) {
				var id = $(el).attr( key.toString().toLowerCase() );

				if ( id == value ) {
					$(el).attr('delete', 'true');
					$(el).hide('slow');

					r = true;
				}
			});

			return r;
		};

		base.sel = function() {
      var style = $('<style>' + '#' + base.$el.attr('id') + ' tbody tr.selected { background: #d0efff !important; }</style>');
      $('html > head').append(style);

      $('#' + base.$el.attr('id')).delegate( "tbody tr", "click", function(event) {
        $(event.currentTarget).parent().children().removeClass('selected');
        $(event.currentTarget).addClass('selected');

        /* clear base el, fix bug if have 2 or more tables */
        base.$el = $(event.delegateTarget);
        base.el = event.delegateTarget;

        $(event.delegateTarget).trigger( "BOOTTABLE_EVENT_CLICK_ROW", [ base.getSelectedItem() ] );
      });

      $('#' + base.$el.attr('id')).off('keydown').on('keydown', function(e) {
        var index = Number($(e.delegateTarget).find('tbody').find('tr.selected').index());
        var row   = index + 1;

        if ( e.ctrlKey === true && e.keyCode === 40 ) { /* DOWN */
          $(e.delegateTarget).find('tbody').find('tr.selected').removeClass('selected');

          if ( Number( $(e.delegateTarget).find('tbody').find('tr:nth-child(' + ( row + 1) + ')').length ) === 0 ) {
            $(e.delegateTarget).find('tbody').find('tr:nth-child(' + (1) + ')').addClass('selected');
          } else {
            $(e.delegateTarget).find('tbody').find('tr:nth-child(' + ( row + 1) + ')').addClass('selected');
          }

          $(e.delegateTarget).trigger( "BOOTTABLE_EVENT_DOWN_ROW", [ base.getSelectedItem() ] );
        }
        if ( e.ctrlKey === true && e.keyCode === 38 ) { /* UP */
          $(e.delegateTarget).find('tbody').find('tr.selected').removeClass('selected');

          if ( Number( $(e.delegateTarget).find('tbody').find('tr:nth-child(' + ( row - 1) + ')').length ) === 0 ) {
            $(e.delegateTarget).find('tbody').find('tr:nth-child(' + (1) + ')').addClass('selected');
          } else {
            $(e.delegateTarget).find('tbody').find('tr:nth-child(' + ( row - 1) + ')').addClass('selected');
          }

          $(e.delegateTarget).trigger( "BOOTTABLE_EVENT_UP_ROW", [ base.getSelectedItem() ] );
        }
        if ( e.ctrlKey === true && e.keyCode === 13 ) { /* ENTER */

          /* clear base el, fix bug if have 2 or more tables */
          base.$el = $(e.delegateTarget);
          base.el = e.delegateTarget;

          $(e.delegateTarget).trigger( "BOOTTABLE_EVENT_ENTER_ROW", [ base.getSelectedItem() ] );
        }
      });

			return true;
		};

		base.getSelectedItem = function() {
			var r = false;

			base.$el.find('tbody').find('tr.selected').each(function(i, el) {
				var tr = $(el);

				var thead = tr.parent().parent().find('thead');
				var columns = thead.find('tr').find('th').map(function() {
					return $(this).attr('field');
				});
				var table = tr.map(function(i) {
					var row = {};
					$(this).find('td').each(function(i) {
						var v = $(this).find('input').val();
						if ( typeof v == 'undefined' ) {
							v = $(this).find('textarea').val();
							if ( typeof v == 'undefined' ) {
								v = $(this).find('label').text();
								if ( !v.trim() ) {
									v = $(this).text();
								}
							}
						}
						row[ columns[i] ] = v;
					});
					return row;
				}).get();
				r = table;
			});
			return r[0];
		};

    base.getItens = function() {
      var r = false;

      var columns = base.$el.find('thead').find('tr').find('th').map(function() {
        return $(this).attr('field');
      });
      var table = base.$el.find('tbody').find('tr').map(function(i) {
        var row = {};
        $(this).find('td').each(function(i) {
          var v = $(this).find('input').val();
          if ( typeof v == 'undefined' ) {
            v = $(this).find('textarea').val();
            if ( typeof v == 'undefined' ) {
              v = $(this).find('label').text();
              if ( !v.trim() ) {
                v = $(this).text();
              }
            }
          }
          row[ columns[i] ] = v;
        });
        return row;
      }).get();

      r = table;
      return r;
    };

    base.filter = function() {
      var str = "";
      str += "<div class=\"input-group\" style=\"margin-bottom: 5px;\" > <span class=\"input-group-addon glyphicon glyphicon-search \"></span>";
      str += "<input id=\"filter-" + base.$el.attr('id') + "\" type=\"text\" class=\"form-control\" placeholder=\"" + base.options.filterPlaceholder + "\" >";
      str += "</div>";

      if ( $('#filter-' + base.$el.attr('id') ).length === 0 ) {
        var that = this;

        base.$el.find('tbody').addClass( "searchable" );
        base.$el.parent().prepend( str );
        $('#filter-' + base.$el.attr('id') ).keyup(function () {
          var rex = new RegExp($(this).val(), 'i');
          $('#' + base.$el.attr('id') + ' .searchable tr').hide();

          $('#' + base.$el.attr('id') + ' .searchable tr').filter(function () {
            return rex.test($(this).text());
          }).show();
        });
      }

      return true;
    };

		base.initialize();

		var r = null;
		if ( base.options.method == 'init' ) {
      r = base.init();
    }
    else if ( base.options.method == 'clr' ) {
			r = base.clr();
		}
		else if ( base.options.method == 'msg' ) {
      r = base.msg();
    }
    else if ( base.options.method == 'startLoader' ) {
      r = base.startLoader();
    }
    else if ( base.options.method == 'endLoader' ) {
      r = base.endLoader();
    }
    else if ( base.options.method == 'add' ) {
			r = base.add();
		}
		else if ( base.options.method == 'addall' ) {
			r = base.addall();
		}
		else if ( base.options.method == 'edt' ) {
			r = base.edt();
		}
		else if ( base.options.method == 'del' ) {
			r = base.del();
		}

    // ***************** //

    /* add option selected when click on tr */
		if ( base.options.selected == true ) {
			r = base.sel();
		}
    /* get item selected */
		if ( base.options.getSelectedItem == true ) {
			r = base.getSelectedItem();
		}
    /* get itens */
    if ( base.options.getItens == true ) {
      r = base.getItens();
    }

    // ***************** //

    if ( base.options.filter == true ) {
      r = base.filter();
    }

		// ***************** //

    return r;
	};

	$.Table.boot.defaultOptions = {
		method : '', /* call method plugin */
    msg : 'No record found!', /* adds a default message when no records found in table */

    selected : false, /* add option selected when click on tr */
		getSelectedItem : false, /* get item selected */

    getItens : false, /* get item selected */

    /* Add Filter on Table */
    filter : false, /* IF True add Filter on Table */
    filterPlaceholder : 'Search here...' /* placeholder from input */
	};

	$.fn.bootTable = function(options, header, values){
		var r = null;

		this.each(function() {
			r = $.Table.boot(this, header, values, options);
		});

		return r;
	};

	$.fn.getBootTable = function(){
		this.data("Table.boot");
	};

	$.fn.getSelectedItem = function(){
		var r = null;

		this.each(function() {
			r = $.Table.boot(this, null, null, { getSelectedItem : true });
		});

		return r;
	};

  $.fn.getItens = function(){
    var r = null;

    this.each(function() {
      r = $.Table.boot(this, null, null, { getItens : true });
    });

    return r;
  };

})(jQuery);
