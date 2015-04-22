/*!
 * bootTable vs 0.0.4 by emalherbi.com
 */

/* IE8 trim function not exist */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
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
		$.Table = {};
	}

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
      return true;
    };

    /*
    * removes all table items
    */
		base.clr = function() {
			$('#'+base.$el.attr('id')+' tbody tr').remove();
			return true;
		};

    /*
    * adds a default message when no records found in table
    */
    base.msg = function() {
      var colspan = $('#'+base.$el.attr('id')+' thead tr th').length;
      base.$el.append('<tr><td colspan="'+colspan+'" >'+base.options.msg+'</td></tr>');
      return true;
    };

    /*
    * add div loader on page
    */
    base.startLoader = function() {
      base.clr(); /* clear */

      /* remove all body */
      var colspan = base.$el.find('thead').find("tr").find('th').length;
      base.$el.append('<tr><td colspan="'+colspan+'" ></td></tr>');

      /* add progress */
      var html = ' <img src=\'data:image/gif;base64,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\' alt="Progress" >';
      base.$el.find('tbody tr td').html( html );
      return true;
    };

    /*
    * remove all div loaders
    */
    base.endLoader = function() {
      base.clr(); /* clear */
      base.msg(); /* adds a default message when no records found in table */
      return true;
    };

    /*
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

		base.addAll = function() {
			var itens = '';

      base.clr(); /* clear */
      if (base.header.length === 0) { /* if not found a record, a message is automatically add */
        base.msg(); /* add a message */
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

    base.getColumns = function() {
      return $('#'+base.$el.attr('id')+' thead tr th').map(function() {
          return $(this).attr('field');
      });
    };

    base.getRows = function(i) {
      var columns = base.getColumns();
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
          if (typeof columns[i] !== 'undefined') {
            row[ columns[i] ] = v;
          }
        });
        return row;
      }).get();
      return table;
    };

    base.getSelectedItem = function() {
      var r = false;
      var i = base.$el.find('tbody tr.selected').index();
      r = base.getRows(i);
      return r[0];
    };

    base.getItens = function() {
      var rows = base.$el.find('tbody tr').map(function(i) {
        return base.getRows(i);
      }).get();
      return rows;
    };

		base.edit = function() {
			var r = false;

			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody tr').each(function(i, el) {
				var id = $(el).attr( key.toString().toLowerCase() );

				if ( id == value ) {
					r = base.getRows(i);
				}
			});

			return r[0];
		};

		base.delete = function() {
			var r = false;

			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody tr').each(function(i, el) {
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
      var style = $('<style>' + '#' + base.$el.attr('id') + ' tbody tr.selected { background: ' + base.options.selectedBackground + ' !important; }</style>');
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
        var index = Number($(e.delegateTarget).find('tbody tr.selected').index());
        var row   = index + 1;

        /* clear base el, fix bug if have two or more tables */
        base.$el = $(e.delegateTarget);
        base.el = e.delegateTarget;

        /* key down */
        if (e.altKey === true && e.keyCode === 40) {
          $(e.delegateTarget).find('tbody tr.selected').removeClass('selected');

          if (Number($(e.delegateTarget).find('tbody tr:nth-child(' + (row+1) + ')').length) === 0) {
            $(e.delegateTarget).find('tbody tr:nth-child(' + (1) + ')').addClass('selected');
          } else {
            $(e.delegateTarget).find('tbody tr:nth-child(' + ( row + 1) + ')').addClass('selected');
          }

          $(e.delegateTarget).trigger("BOOTTABLE_EVENT_DOWN_ROW", [base.getSelectedItem()]);
        }

        /* key up */
        if ( e.altKey === true && e.keyCode === 38 ) {
          $(e.delegateTarget).find('tbody tr.selected').removeClass('selected');

          if (Number($(e.delegateTarget).find('tbody tr:nth-child(' + (row-1) + ')').length) === 0) {
            $(e.delegateTarget).find('tbody tr:nth-child(' + (1) + ')').addClass('selected');
          } else {
            $(e.delegateTarget).find('tbody tr:nth-child(' + ( row - 1) + ')').addClass('selected');
          }

          $(e.delegateTarget).trigger("BOOTTABLE_EVENT_UP_ROW", [base.getSelectedItem()]);
        }

        /* key enter */
        if (e.altKey === true && e.keyCode === 13) {
          $(e.delegateTarget).trigger("BOOTTABLE_EVENT_ENTER_ROW", [base.getSelectedItem()]);
        }
      });

			return true;
		};

    base.filter = function() {
      var layout = "";
      layout += "<div class=\"input-group\" style=\"margin-bottom: 5px;\" > <span class=\"input-group-addon glyphicon glyphicon-search \"></span>";
      layout += "<input id=\"filter-" + base.$el.attr('id') + "\" type=\"text\" class=\"form-control\" placeholder=\"" + base.options.filterPlaceholder + "\" >";
      layout += "</div>";

      if ($('#filter-' + base.$el.attr('id')).length === 0) {
        base.$el.find('tbody').addClass("searchable");
        base.$el.parent().prepend(layout);
        $('#filter-' + base.$el.attr('id')).keyup(function() {
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
		if (base.options.method == 'init') {
      r = base.init();
    }
    else if (base.options.method == 'clr' || base.options.method == 'clear') {
			r = base.clr();
		}
		else if (base.options.method == 'msg') {
      r = base.msg();
    }
    else if (base.options.method == 'startloader' || base.options.method == 'startLoader') {
      r = base.startLoader();
    }
    else if (base.options.method == 'endloader' || base.options.method == 'endLoader') {
      r = base.endLoader();
    }
    else if (base.options.method == 'add') {
			r = base.add();
		}
		else if (base.options.method == 'addall' || base.options.method == 'addAll' || base.options.method == 'all') {
			r = base.addAll();
		}
		else if (base.options.method == 'edt' || base.options.method == 'edit') {
			r = base.edit();
		}
		else if (base.options.method == 'del' || base.options.method == 'delete' || base.options.method == 'remove') {
			r = base.delete();
		}
    else if (base.options.method == 'addAllJson' || base.options.method == 'allJson' || base.options.method == 'json') {
      r = base.addAll();
    }

    // ***************** //

    /* add option selected when click on tr */
		if ( base.options.selected === true ) {
			r = base.sel();
		}
    /* get item selected */
		if ( base.options.getSelectedItem === true ) {
			r = base.getSelectedItem();
		}
    /* get itens */
    if ( base.options.getItens === true ) {
      r = base.getItens();
    }

    // ***************** //

    if ( base.options.filter === true ) {
      r = base.filter();
    }

		// ***************** //

    return r;
	};

	$.Table.boot.defaultOptions = {
		method : '', /* call method plugin */
    msg : 'No record found!', /* adds a default message when no records found in table */

    selected : false, /* add option selected when click on tr */
    filter : false, /* add filter on table */

    selectedBackground : '#d0efff',
    filterPlaceholder : 'Search here...', /* placeholder from input */

    getSelectedItem : false, /* get item selected */
    getItens : false /* get item selected */
	};

	$.fn.bootTable = function(options, header, values) {
		var r = null;

		this.each(function() {
			r = $.Table.boot(this, header, values, options);
		});

		return r;
	};

  $.fn.bootTableJson = function(values) {
    var r = null;

    this.each(function() {
      r = $.Table.boot(this, values, values, { method : 'addAllJson' });
    });

    return r;
  };

	$.fn.getBootTable = function() {
		return this.data("Table.boot");
	};

	$.fn.getSelectedItem = function() {
		var r = null;

		this.each(function() {
			r = $.Table.boot(this, null, null, { getSelectedItem : true });
		});

		return r;
	};

  $.fn.getItens = function() {
    var r = null;

    this.each(function() {
      r = $.Table.boot(this, null, null, { getItens : true });
    });

    return r;
  };

})(jQuery);
