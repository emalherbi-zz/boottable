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
      base.$el.append('<tr class="boottable-init" ><td colspan="'+colspan+'" ></td></tr>');
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
      var html = '<div class="boottable-load-panel" ><div class="boottable-load-label" ></div></div>';
      base.$el.find('tbody tr td').html( html );
      return true;
    };

    /*
    * remove all div loaders
    */
    base.endLoader = function() {
      // do nothing...
      return true;
    };

    /*
    * This method to be deprecated.
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

    base.addAll = function() {
      var itens = '';

      base.clr(); /* clear */
      if (base.header.length === 0) { /* if not found a record, a message is automatically add */
        base.msg(); /* add a message */
      }
      else {
        var columns = base.getColumns();
        var columnsField = base.getColumnsField();
        $.each(base.header, function(key, header) {
          var arr = [];
          $.each(header, function(i, v) {
            arr.push( i + "='" + v + "'" );
          });
          var join = arr.join(" ");

          var tr = "";
          tr += "<tr " + join + " >";

          var values = base.values[key], y = 0;
          if (base.options.method == 'addAllJson' || base.options.method == 'allJson' || base.options.method == 'json') {
            $.each(columnsField, function(ii, vv) {
              tr += "<td data-label='" + columns[y] + "' >" + values[vv] + "</td>";
              y++;
            });
          }
          else {
            $.each(values, function(i, v) {
              tr += "<td data-label='" + columns[y] + "' >" + v + "</td>";
              y++;
            });
          }

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
        return $(this).text();
      });
    };

    base.getColumnsField = function() {
      return $('#'+base.$el.attr('id')+' thead tr th').map(function() {
        return $(this).attr('field');
      });
    };

    base.getRows = function(i) {
      var columns = base.getColumnsField();
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

    base.calculateColumn = function() {
      var vlr = 0;
      base.$el.find("tbody tr > td:nth-child("+base.options.column+")").each(function(i, el) {
        var v = null;
        if ($(el).find('input').length > 0) {
          v = $(el).find('input').val();
        } else {
          if ($(el).find('span').length > 0) {
            v = $(el).find('span').text();
          } else {
            v = el.innerHTML;
          }
        }
        v = v.replace("$", "").replace("R$", "");

        if (isNaN(v)) { // is NaN
          var pos = v.lastIndexOf(".");
          var cat = v.charAt(pos);

          if (cat === '.') {
            vlr += Number(v.replace(/,/g, ""));
          } else {
            vlr += Number(v.replace(/\./g, "").replace(",", "."));
          }
        } else {
          vlr += Number(v);
        }
      });
      return vlr;
    };

    base.calculateColumnByField = function() {
      var columnsField = base.getColumnsField();

      var key = -1;
      $.each(columnsField, function(i, v) {
        if (base.options.columnByField === v) {
          key = (i + 1);
        }
      });
      if (key !== -1) {
        base.options.column = key;
        return base.calculateColumn();
      }

      return 0;
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
      layout += "<div class=\"boottable-filter input-group\" style=\"margin-bottom: 5px;\" > <span class=\"input-group-addon glyphicon glyphicon-search \"></span>";
      layout += "<input id=\"filter-" + base.$el.attr('id') + "\" type=\"text\" class=\"boottable-filter-placeholder form-control\" placeholder=\" \" >";
      layout += "</div>";

      if ($('#filter-' + base.$el.attr('id')).length === 0) {
        base.$el.find('tbody').addClass("searchable");
        base.$el.parent().prepend(layout);
        $('#filter-' + base.$el.attr('id')).keyup(function(e) {
          var $el = $(e.delegateTarget);
          var id  = $el.attr('id').replace('filter-', '');

          var rex = new RegExp($(this).val(), 'i');
          $('#' + id + ' .searchable tr').hide();
          $('#' + id + ' .searchable tr').filter(function () {
            return rex.test($(this).text());
          }).show();
        });
      }

      return true;
    };

    base.fixHeadFoot = function() {
      var $fixed = null;
      var $el = base.$el;

      function initHeadFoot() {
        $el.wrap('<div class="boottable-container" />');

        $fixed = $el.clone();
        $fixed.attr('id', $fixed.attr('id') + '-fixed');
        $fixed.find("tbody").remove().end().addClass("boottable-fixed").insertBefore($el);

        resizeFixedHeadFoot();
      }

      function resizeFixedHeadFoot() {
        $fixed.find("th").each(function(index) {
          $(this).css("width", $el.find("th").eq(index).outerWidth() + "px");
        });
      }

      function scrollFixedHeadFoot() {
        var offset = $(this).scrollTop(),
          tableOffsetTop = $el.offset().top,
          tableOffsetBottom = tableOffsetTop + $el.height() - $el.find("thead").height();

        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
          $el.find("tfoot").css('display', 'table-footer-group');
          $fixed.hide();
        } else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $fixed.is(":hidden")) {
          $el.find("tfoot").css('display', 'none');
          $fixed.show();
        }
      }

      $(window).resize(resizeFixedHeadFoot);
      $(window).scroll(scrollFixedHeadFoot);

      initHeadFoot();
    };

    base.fixHead = function() {
      var $fixed = null;
      var $el = base.$el;

      function initHead() {
        $el.wrap('<div class="boottable-container" />');

        $fixed = $el.clone();
        $fixed.attr('id', $fixed.attr('id') + '-fixed');
        $fixed.find("tbody").remove().end().find("tfoot").remove().end().addClass("boottable-fixed").insertBefore($el);

        resizeFixedHead();
      }

      function resizeFixedHead() {
        $fixed.find("th").each(function(index) {
          $(this).css("width", $el.find("th").eq(index).outerWidth() + "px");
        });
      }

      function scrollFixedHead() {
        var offset = $(this).scrollTop(),
          tableOffsetTop = $el.offset().top,
          tableOffsetBottom = tableOffsetTop + $el.height() - $el.find("thead").height();

        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
          $fixed.hide();
        } else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $fixed.is(":hidden")) {
          $fixed.show();
        }
      }

      $(window).resize(resizeFixedHead);
      $(window).scroll(scrollFixedHead);

      initHead();
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
    else if (base.options.method == 'loader' || base.options.method == 'startloader' || base.options.method == 'startLoader') {
      r = base.startLoader();
    }
    else if (base.options.method == 'endloader' || base.options.method == 'endLoader') {
      r = base.endLoader();
    }
    else if (base.options.method == 'fixhead' || base.options.method == 'fixHead') {
      r = base.fixHead();
    }
    else if (base.options.method == 'fixheadfoot' || base.options.method == 'fixHeadFoot') {
      r = base.fixHeadFoot();
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
      base.header = jQuery.parseJSON(base.header);
      base.values = jQuery.parseJSON(base.values);

      r = base.addAll();
    }
    else if (base.options.method == 'calculateColumn' || base.options.method == 'calculatecolumn') {
      r = base.calculateColumn();
    }
    else if (base.options.method == 'calculateColumnByField' || base.options.method == 'calculatecolumnbyfield') {
      r = base.calculateColumnByField();
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

    selected : false, /* add option selected when click on tr */
    filter : false, /* add filter on table */

    column: 0,
    columnByField: '',

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

  $.fn.calculateColumn = function(column) {
    var r = null;

    this.each(function() {
      r = $.Table.boot(this, null, null, { method : 'calculateColumn', column : column });
    });

    return r;
  };

  $.fn.calculateColumnByField = function(columnByField) {
    var r = null;

    this.each(function() {
      r = $.Table.boot(this, null, null, { method : 'calculateColumnByField', columnByField : columnByField });
    });

    return r;
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
