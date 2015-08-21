bT = ((parent, $) => {

  /* get selected item */
  parent.getSelectedItem = ($el) => {
    var i = $el.find("tbody tr.selected").index();

    var r = false;
    r = parent.getRows(i);
    return r[0];
  };

}(bT || {}, jQuery));
