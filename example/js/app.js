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
    $table.bootTable({ method : 'init', msg : 'No record found!', selected : true, selectedBackground : '#d0efff', filter: true });

    $('#btn-start').click(function() {
      $table.bootTable({ method : 'startLoader' })
    });

    $('#btn-end').click(function() {
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

    $table.on('BOOTTABLE_EVENT_CLICK_ROW', function(e, params) {
      $('#txt-event-click-row').html(JSON.stringify(params));
    });

    $table.on('BOOTTABLE_EVENT_ENTER_ROW', function(e, params) {
      $('#txt-event-enter-row').html(JSON.stringify(params));
    });

    $table.on('BOOTTABLE_EVENT_DOWN_ROW', function(e, params) {
      $('#txt-event-down-up-row').html(JSON.stringify(params));
    });

    $table.on('BOOTTABLE_EVENT_UP_ROW', function(e, params) {
      $('#txt-event-down-up-row').html(JSON.stringify(params));
    });

    $('#btn-all').click(function() {
      User.all();
    });
    User.all();

    // $table.bootTableJson(data);
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

    $table.bootTable({ method : 'addall' }, arrHeader, arrValues);
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
      if (del) {
        $('#txt-get-all').html( 'Record Delete!' );
      }

    }
  }
};

$(document).ready(function() {
  User.init();
});
