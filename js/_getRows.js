bT = ((parent, $) => {

  /* get rows */
  parent.getRows = (id, i) => {
    var columns = parent.getColumnsByField(id);

    var table = $('#' + id + ' tbody tr:nth-child('+(i+1)+')').map(function(i) {
      var row = {};
      $(this).find('td').each(function(i) {
        var v = $(this).find('input').val();
        if ( typeof v === 'undefined' ) {
          v = $(this).find('textarea').val();
          if ( typeof v === 'undefined' ) {
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

}(bT || {}, jQuery));
