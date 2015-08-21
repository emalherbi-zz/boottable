bT = ((parent, $) => {

  /* get itens by column */
  parent.getItensByColumn = ($el, params) => {
    var rows   = [];
    params     = [].concat(params);

    $.each(params, function(kk, obj) {
      var k = Object.keys(obj);
      var v = obj[k];

      rows = $el.find('tbody tr').map(function(i) {
        var row   = parent.getRows(i);
        var keys  = Object.keys(row[0]);
        var field = keys[k-1];

        if (row[0][field] === v) {
          return row;
        }
      }).get();
    });

    if (rows.length === 0) {
      return false;
    }
    return rows;
  };

}(bT || {}, jQuery));
