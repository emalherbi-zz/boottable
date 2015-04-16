var data = [
{
  "ID_USER": 1,
  "NAME": "Stefanie Melendez",
  "PASSWORD": 38,
  "ACTIVE": false
},
{
  "ID_USER": 2,
  "NAME": "Gillespie Short",
  "PASSWORD": 22,
  "ACTIVE": false
},
{
  "ID_USER": 3,
  "NAME": "Henrietta Langley",
  "PASSWORD": 28,
  "ACTIVE": true
},
{
  "ID_USER": 4,
  "NAME": "Marisa Fitzpatrick",
  "PASSWORD": 27,
  "ACTIVE": true
},
{
  "ID_USER": 5,
  "NAME": "Benson Holloway",
  "PASSWORD": 24,
  "ACTIVE": true
},
{
  "ID_USER": 6,
  "NAME": "Hunter Fox",
  "PASSWORD": 37,
  "ACTIVE": true
}
];

var $table = $('#table-users');
var User = {
  init : function() {
    $table.bootTable({ method : 'init', msg : 'No record found!', selected : true });

    $('#btn-start').click(function() {
      $table.bootTable({ method : 'init' });
      $table.bootTable({ method : 'startLoader' })
    });

    $('#btn-end').click(function() {
      $table.bootTable({ method : 'init' });
      $table.bootTable({ method : 'endLoader' })
    });

    $('#btn-get-all').click(function() {
      $('#txt-get-all').html(JSON.stringify($table.getItens()));
    });

    $('#btn-get-item').click(function() {
      var selected = $table.find('tr').hasClass('selected');

      if (!selected) {
        alert('Please select a row!');
        return;
      }

      $('#txt-get-all').html(JSON.stringify($table.getSelectedItem()));
    });

    $('#btn-all').click(function() {
      User.all();
    });
    User.all();
  },
  all : function() {
    var arrHeader = [];
    var arrValues = [];

    $.each(data, function(key, values) {
      var header = {
        "ID_USER" : values.ID_USER
      };
      arrHeader.push(header);

      var values = {
        "ID_USER"  : values.ID_USER,
        "NAME" 		 : values.NAME,
        "PASSWORD" : values.PASSWORD,
        "ACTIVE" 	 : ( values.ACTIVE === true ) ? 'Yes' : 'No',
        "EDIT" 		 : '<div onclick="User.edit(' + values.ID_USER + ')" class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></div>',
        "DELETE" 	 : '<div onclick="User.delete(' + values.ID_USER + ')" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span></div>'
      };
      arrValues.push(values);
    });

    $table.bootTable({ method : 'addall', filter: true }, arrHeader, arrValues);
  },
  edit : function( id ) {
    var params = {
      "ID_USER" : id
    };
    var edt = $table.bootTable({
      method : 'edt'
    }, params);

    $('#txt-get-all').html(JSON.stringify(edt));
  },
  delete : function( id ) {
    if (confirm('Are you sure you want to delete the record?')) {

      var params = {
        "ID_USER" : id
      };
      var del = $table.bootTable({
        method : 'del'
      }, params);
      console.log( del );

    }
  }
};

$(document).ready(function() {
  User.init();
});
