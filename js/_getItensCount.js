bT = ((parent, $) => {

  /* get itens count from table, add zeros left */
  let addZerosLeft = (str, max) => {
    str = String( str );
    return ( str.length < max ) ? addZerosLeft("0" + str, max) : str;
  };

  parent.getItensCount = (str, max) => {
    return addZerosLeft(str, max);
  };

}(bT || {}, jQuery));
