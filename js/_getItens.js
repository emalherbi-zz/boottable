bT = ((parent, $) => {

  /* get Itens */
  parent.getItens = ($el) => {
    return $el.find('tbody tr').map(function(i) {
      return parent.getRows(i);
    }).get();
  };

}(bT || {}, jQuery));
