let bT = null;

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
      base.clr();
      base.msg();
      base.cursor();
      return true;
    };

    /*
    * removes all table items
    */
    base.clr = function() {
      bT.clr(base.$el.attr('id'));
    };

    /*
    * adds a default message when no records found in table
    */
    base.msg = function() {
      bT.msg(base.$el.attr('id'));
    };

    /*
    * set cursor pointer
    */
    base.cursor = function() {
      bT.cursor(base.$el.attr('id'));
    };

    /*
    * add div loader on page
    */
    base.startLoader = function() {
      var html = '<div class="boottable-load-panel" ><div class="boottable-load-label" ></div></div>';
      var top  = $(window).scrollTop();

      base.clr(); /* clear */

      /* add progress */
      var colspan = base.$el.find('thead').find("tr").find('th').length;
      base.$el.find('tbody').append('<tr><td colspan="'+colspan+'" >' + html + '</td></tr>');

      $(window).scrollTop(top);
      return true;
    };

    /*
    * remove all div loaders
    */
    base.endLoader = function() {
      // do nothing...
      return true;
    };

    var addZerosLeft = function(str, max) {
      str = String( str );
      return ( str.length < max ) ? addZerosLeft("0" + str, max) : str;
    };

    base.getItensCount = function() {
      return addZerosLeft(base.$el.find('tbody tr').not(base.$el.find('.boottable-init')).length, base.options.params);
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
      bT.getColumns(base.$el.attr('id'));
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

    // $('#table').bTGetItensByColumn({'0' : 'true'});
    base.getItensByColumn = function() {
      var rows   = [];
      var params = base.options.params;
      params     = [].concat(params);

      $.each(params, function(kk, obj) {
        var k = Object.keys(obj);
        var v = obj[k];

        rows = base.$el.find('tbody tr').map(function(i) {
          var row   = base.getRows(i);
          var keys  = Object.keys(row[0]);
          var field = keys[k-1];

          if (row[0][field] == v) {
            return row;
          }
        }).get();
      });

      if (rows.length === 0) {
        return false;
      }
      return rows;
    };

    // $('#table').bTGetItensByField({'SELECIONAR' : 'true'});
    base.getItensByField = function() {
      var rows   = [];
      var params = base.options.params;
      params     = [].concat(params);

      $.each(params, function(kk, obj) {
        var k = Object.keys(obj);
        var v = obj[k];

        rows = base.$el.find('tbody tr').map(function(i) {
          var row   = base.getRows(i);
          if (row[0][k] == v) {
            return row;
          }
        }).get();
      });

      if (rows.length === 0) {
        return false;
      }
      return rows;
    };

    base.calculateColumn = function() {
      var vlr = 0;
      base.$el.find("tbody tr > td:nth-child("+base.options.params+")").each(function(i, el) {
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
          var point = v.lastIndexOf(".");
          var comma = v.lastIndexOf(",");
          var cat = v.charAt(point);
          if (comma > point) {
            cat = v.charAt(comma);
          }

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
        if (base.options.params === v) {
          key = (i + 1);
        }
      });
      if (key !== -1) {
        base.options.params = key;
        return base.calculateColumn();
      }

      return 0;
    };

    base.hideColumn = function() {
      var arr = base.options.params;
      arr     = [].concat(arr);
      for (var i=0, len=arr.length; i<len; i++) {
        base.$el.find('thead tr th:nth-child('+arr[i]+')').css('display', 'none');
        base.$el.find('tbody tr td:nth-child('+arr[i]+')').css('display', 'none');
      }
      return true;
    };

    base.hideColumnByField = function() {
      var loopTable = function(columns, field) {
        $.each(columns, function(i, v) {
          if (field === v) {
            var key = (i + 1);
            base.$el.find('thead tr th:nth-child('+key+')').css('display', 'none');
            base.$el.find('tbody tr td:nth-child('+key+')').css('display', 'none');
          }
        });
      };

      var arr = base.options.params;
      arr     = [].concat(arr);
      var columnsField = base.getColumnsField();
      for (var i=0, len=arr.length; i<len; i++) {
        loopTable(columnsField, arr[i]);
      }
      return true;
    };

    base.showColumn = function() {
      var arr = base.options.params;
      arr     = [].concat(arr);
      for (var i=0, len=arr.length; i<len; i++) {
        base.$el.find('thead tr th:nth-child('+arr[i]+')').css('display', 'table-cell');
        base.$el.find('tbody tr td:nth-child('+arr[i]+')').css('display', 'table-cell');
      }
      return true;
    };

    base.showColumnByField = function() {
      var loopTable = function(columns, field) {
        $.each(columns, function(i, v) {
          if (field === v) {
            var key = (i + 1);
            base.$el.find('thead tr th:nth-child('+key+')').css('display', 'table-cell');
            base.$el.find('tbody tr td:nth-child('+key+')').css('display', 'table-cell');
          }
        });
      };

      var arr = base.options.params;
      arr     = [].concat(arr);
      var columnsField = base.getColumnsField();
      for (var i=0, len=arr.length; i<len; i++) {
        loopTable(columnsField, arr[i]);
      }
      return true;
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
      layout += "<div class=\"boottable-filter input-group\" style=\"margin-bottom: 5px;\" > <span class=\"input-group-addon glyphicon glyphicon-search glyphicon-table \"></span>";
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
      console.log('Please. Use method bootTableInit! This method \'clear\' to be deprecated.');
      r = base.clr();
    }
    else if (base.options.method == 'msg') {
      console.log('Please. Use method bootTableInit! This method \'msg\' to be deprecated.');
      r = base.msg();
    }
    else if (base.options.method == 'loader' || base.options.method == 'startloader' || base.options.method == 'startLoader') {
      r = base.startLoader();
    }
    else if (base.options.method == 'endloader' || base.options.method == 'endLoader') {
      console.log('This method \'endloader\' to be deprecated.');
      r = base.endLoader();
    }
    else if (base.options.method == 'fixhead' || base.options.method == 'fixHead') {
      r = base.fixHead();
    }
    else if (base.options.method == 'fixheadfoot' || base.options.method == 'fixHeadFoot') {
      r = base.fixHeadFoot();
    }
    else if (base.options.method == 'edt' || base.options.method == 'edit') {
      console.log('Please. Use method bTGetItensByField or bTGetItensByColumn! This method \'edit\' to be deprecated.');
      r = base.edit();
    }
    else if (base.options.method == 'del' || base.options.method == 'delete' || base.options.method == 'remove') {
      r = base.delete();
    }
    else if (base.options.method == 'add') {
      console.log('Please. Use method bootTableAll or bootTableJson! This method \'add\' to be deprecated.');
      r = base.add();
    }
    else if (base.options.method == 'addall' || base.options.method == 'addAll' || base.options.method == 'all') {
      r = base.addAll();
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
    else if (base.options.method == 'getItensCount' || base.options.method == 'getitenscount') {
      r = base.getItensCount();
    }
    else if (base.options.method == 'hideColumn' || base.options.method == 'hidecolumn') {
      r = base.hideColumn();
    }
    else if (base.options.method == 'hideColumnByField' || base.options.method == 'hidecolumnbyfield') {
      r = base.hideColumnByField();
    }
    else if (base.options.method == 'showColumn' || base.options.method == 'showcolumn') {
      r = base.showColumn();
    }
    else if (base.options.method == 'showColumnByField' || base.options.method == 'showcolumnbyfield') {
      r = base.showColumnByField();
    }
    else if (base.options.method == 'getItensByColumn' || base.options.method == 'getitensbycolumn') {
      r = base.getItensByColumn();
    }
    else if (base.options.method == 'getItensByField' || base.options.method == 'getitensbyfield') {
      r = base.getItensByField();
    }
    else if (base.options.method == 'getItens' || base.options.method == 'getitens') {
      r = base.getItens();
    }
    else if (base.options.method == 'getSelectedItem' || base.options.method == 'getselecteditem') {
      r = base.getSelectedItem();
    }

    // ***************** //

    /* add option selected when click on tr */
    if ( base.options.selected === true ) {
      r = base.sel();
    }

    // ***************** //

    /* add option filter on table */
    if ( base.options.filter === true ) {
      r = base.filter();
    }

    // ***************** //

    return r;
  };

  $.Table.boot.defaultOptions = {
    method   : '',
    params   : '',
    selected : false, /* add option selected when click on tr */
    filter   : false /* add filter on table */
  };

  $.fn.bootTable = function(options, header, values) {
    return this.each(function() {
      $.Table.boot(this, header, values, options);
    });
  };

  $.fn.getBootTable = function() {
    return this.data("Table.boot");
  };

  // add functions here!

  // edit
  // delete

  // OK
  $.fn.bTInit        = function(filter, selected) { return this.bootTableInit(filter, selected); };
  $.fn.bootTableInit = function(filter, selected) {
    if (typeof filter === 'undefined') {
      filter = false;
    }
    if (typeof selected === 'undefined') {
      selected = true;
    }
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'init', 'filter' : filter, 'selected' : selected });
    });
  };

  // OK
  $.fn.bTLoader        = function() { return this.bootTableLoader(); };
  $.fn.bootTableLoader = function() {
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'loader' });
    });
  };

  // OK
  $.fn.bTAddAll        = function(header, values) { return this.bootTableAddAll(header, values); };
  $.fn.bootTableAddAll = function(header, values) {
    if (typeof header === 'undefined') {
      console.log('method \'bootTableAddAll\', header undefined!'); return false;
    }
    if (typeof values === 'undefined') {
      console.log('method \'bootTableAddAll\', values undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, header, values, { 'method' : 'addAll' });
    });
  };

  // OK
  $.fn.bTAddAllJson        = function(values) { return this.bootTableAddAllJson(values); };
  $.fn.bootTableAddAllJson = function(values) {
    if (typeof values === 'undefined') {
      console.log('method \'bootTableAddAllJson\', values undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, values, values, { 'method' : 'addAllJson' });
    });
  };

  // OK
  $.fn.bTCalculateColumn        = function(params) { return this.bootTableCalculateColumn(params); };
  $.fn.bootTableCalculateColumn = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableCalculateColumn\', params undefined!'); return false;
    }
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'calculateColumn', 'params' : params });
    });
    return r;
  };

  // OK
  $.fn.bTCalculateColumnByField        = function(params) { return this.bootTableCalculateColumnByField(params); };
  $.fn.bootTableCalculateColumnByField = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableCalculateColumnByField\', params undefined!'); return false;
    }
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'calculateColumnByField', 'params' : params });
    });
    return r;
  };

  // OK
  $.fn.bTGetSelectedItem        = function() { return this.bootTableGetSelectedItem(); };
  $.fn.bootTableGetSelectedItem = function() {
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getSelectedItem' });
    });
    return r;
  };
  $.fn.getSelectedItem = function() {
    console.log('Please. Use method bootTableGetSelectedItem! This method \'getSelectedItem\' to be deprecated.');

    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getSelectedItem' });
    });
    return r;
  };

  // OK
  $.fn.bTGetItens        = function() { return this.bootTableGetItens(); };
  $.fn.bootTableGetItens = function() {
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getItens' });
    });
    return r;
  };
  $.fn.getItens = function() {
    console.log('Please. Use method bootTableGetItens! This method \'getItens\' to be deprecated.');

    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getItens' });
    });
    return r;
  };

  // OK
  $.fn.bTGetItensByColumn        = function(params) { return this.bootTableGetItensByColumn(params); };
  $.fn.bootTableGetItensByColumn = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableGetItensByColumn\', params undefined!'); return false;
    }
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getItensByColumn', params : params });
    });
    return r;
  };

  // OK
  $.fn.bTGetItensByField        = function(params) { return this.bootTableGetItensByField(params); };
  $.fn.bootTableGetItensByField = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableGetItensByField\', params undefined!'); return false;
    }
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getItensByField', params : params });
    });
    return r;
  };

  // OK
  $.fn.bTGetItensCount        = function(params) { return this.bootTableGetItensCount(params); };
  $.fn.bootTableGetItensCount = function(params) {
    if (typeof params === 'undefined') {
      params = 0;
    }
    var r = false;
    this.each(function() {
      r = $.Table.boot(this, null, null, { 'method' : 'getItensCount', 'params' : params });
    });
    return r;
  };

  // OK
  $.fn.bTHideColumn        = function(params) { return this.bootTableHideColumn(params); };
  $.fn.bootTableHideColumn = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableHideColumn\', params undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'hideColumn', 'params' : params });
    });
  };

  // OK
  $.fn.bTHideColumnByField        = function(params) { return this.bootTableHideColumnByField(params); };
  $.fn.bootTableHideColumnByField = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableHideColumnByField\', params undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'hideColumnByField', 'params' : params });
    });
  };

  // OK
  $.fn.bTShowColumn        = function(params) { return this.bootTableShowColumn(params); };
  $.fn.bootTableShowColumn = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableShowColumn\', params undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'showColumn', 'params' : params });
    });
  };

  // OK
  $.fn.bTShowColumnByField        = function(params) { return this.bootTableShowColumnByField(params); };
  $.fn.bootTableShowColumnByField = function(params) {
    if (typeof params === 'undefined') {
      console.log('method \'bootTableShowColumnByField\', params undefined!'); return false;
    }
    return this.each(function() {
      $.Table.boot(this, null, null, { 'method' : 'showColumnByField', 'params' : params });
    });
  };

  // OK
  $.fn.bTFixHead        = function() { return this.bootTableFixHead(); };
  $.fn.bootTableFixHead = function() {
    return this.each(function() {
      $.Table.boot(this, null, null, { method : 'fixhead' });
    });
  };

  // OK
  $.fn.bTFixHeadFoot        = function() { return this.bootTableFixHeadFoot(); };
  $.fn.bootTableFixHeadFoot = function() {
    return this.each(function() {
      $.Table.boot(this, null, null, { method : 'fixheadfoot' });
    });
  };

})(jQuery);
