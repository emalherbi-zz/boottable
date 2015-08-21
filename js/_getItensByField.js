bT = ((parent, $) => {

  /* get itens by field */
  parent.getItensByField = ($el, params) => {
    var rows   = [];
    params     = [].concat(params);

    $.each(params, function(kk, obj) {
      var k = Object.keys(obj);
      var v = obj[k];

      rows = $el.find('tbody tr').map(function(i) {
        var row   = parent.getRows(i);
        if (row[0][k] === v) {
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
