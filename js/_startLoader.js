bT = ((parent, $) => {

  /* add div loader on page */
  parent.startLoader = ($el) => {
    var html = '<div class="boottable-load-panel" ><div class="boottable-load-label" ></div></div>';
    var top  = $(window).scrollTop();

    parent.clr($el.attr('id')); /* clear */

    /* add progress */
    var colspan = $el.find('thead').find("tr").find('th').length;
    $el.find('tbody').append('<tr><td colspan="' + colspan + '" >' + html + '</td></tr>');

    $(window).scrollTop(top);
    return true;
  };

}(bT || {}, jQuery));
