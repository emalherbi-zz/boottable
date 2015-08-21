bT = ((parent, $) => {

  /* add item */
  parent.add = ($el, header, values) => {
    var arr = [];
    $.each(header, function(i, v) {
      arr.push( i + "='" + v + "'" );
    });
    var join = arr.join(" ");

    var tr = "";
    tr += "<tr " + join + " >";

    $.each(values, function(i, v) {
      tr += "<td>" + v + "</td>";
    });
    tr += "</tr>";

    $el.append( tr );
    $el.show('fast');

    return true;
  };

}(bT || {}, jQuery));
