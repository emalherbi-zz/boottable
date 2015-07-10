var data = [
{
  "ID_USER": 1,
  "NAME": "Stefanie Melendez",
  "MONEY": 10.89,
  "ACTIVE": false
},
{
  "ID_USER": 2,
  "NAME": "Gillespie Short",
  "MONEY": 22.52,
  "ACTIVE": false
},
{
  "ID_USER": 3,
  "NAME": "Henrietta Langley",
  "MONEY": 28.11,
  "ACTIVE": true
},
{
  "ID_USER": 4,
  "NAME": "Marisa Fitzpatrick",
  "MONEY": 27.44,
  "ACTIVE": true
},
{
  "ID_USER": 5,
  "NAME": "Benson Holloway",
  "MONEY": 24.96,
  "ACTIVE": true
},
{
  "ID_USER": 6,
  "NAME": "Hunter Fox",
  "MONEY": 37.12,
  "ACTIVE": true
}
];

var Table = {
  onclick : function() {
    $('#btn-init-code').click(function() {
      $('#modal #modal-code').html( $('#code-init').html() );
      $('#modal').modal('show');
    });
    $('#btn-start-code').click(function() {
      $('#modal #modal-code').html( $('#code-start').html() );
      $('#modal').modal('show');
    });
    $('#btn-filter-code').click(function() {
      $('#modal #modal-code').html( $('#code-filter').html() );
      $('#modal').modal('show');
    });
    $('#btn-add-all-json-code').click(function() {
      $('#modal #modal-code').html( $('#code-add-all-json').html() );
      $('#modal').modal('show');
    });
    $('#btn-add-all-code').click(function() {
      $('#modal #modal-code').html( $('#code-add-all').html() );
      $('#modal').modal('show');
    });
    $('#btn-get-all-itens-code').click(function() {
      $('#modal #modal-code').html( $('#code-get-all-itens').html() );
      $('#modal').modal('show');
    });
    $('#btn-get-selected-item-code').click(function() {
      $('#modal #modal-code').html( $('#code-get-selected-item').html() );
      $('#modal').modal('show');
    });
    $('#btn-fix-head-code').click(function() {
      $('#modal #modal-code').html( $('#code-fix-head').html() );
      $('#modal').modal('show');
    });
    $('#btn-fix-head-foot-code').click(function() {
      $('#modal #modal-code').html( $('#code-fix-head-foot').html() );
      $('#modal').modal('show');
    });
    $('#btn-calculate-column-code').click(function() {
      $('#modal #modal-code').html( $('#code-calculate-column').html() );
      $('#modal').modal('show');
    });
    $('#btn-calculate-column-by-field-code').click(function() {
      $('#modal #modal-code').html( $('#code-calculate-column-by-field').html() );
      $('#modal').modal('show');
    });
    $('#btn-get-itens-count-code').click(function() {
      $('#modal #modal-code').html( $('#code-get-itens-count').html() );
      $('#modal').modal('show');
    });
    $('#btn-and-more-code').click(function() {
      $('#modal #modal-code').html( $('#code-and-more').html() );
      $('#modal').modal('show');
    });
  },
  init : function() {
    var dataJson = JSON.stringify(data);
    Table.onclick();

    /* TABLE INIT */
    $('#table-init').bootTable({ method : 'init' });

    /* TABLE START LOADER */
    $('#table-start').bootTable({ method : 'init' });
    $('#table-start').bootTable({ method : 'startloader' });

    /* TABLE FILTER */
    $('#table-filter').bootTable({ method : 'init' });
    $('#table-filter').bootTable({ filter : true });
    $('#table-filter').bTAddAllJson(dataJson);

    /* TABLE ADD ALL JSON */
    $('#table-add-all-json').bootTable({ method : 'init' });
    $('#table-add-all-json').bTAddAllJson(dataJson);

    /* TABLE USERS ADD ALL */
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
        "MONEY"    : values.MONEY,
        "ACTIVE" 	 : ( values.ACTIVE === true ) ? 'Yes' : 'No'
      };
      arrValues.push(values);
    });
    $('#table-add-all').bootTable({ method : 'init' });
    $('#table-add-all').bootTable({ method : 'addall' }, arrHeader, arrValues);

    /* TABLE GET ALL ITENS */
    $('#table-get-all-itens').bootTable({ method : 'init' });
    $('#table-get-all-itens').bTAddAllJson(dataJson);

    $('#btn-get-all-itens').click(function() {
      $('#modal #modal-code').html(JSON.stringify($('#table-get-all-itens').getItens()));
      $('#modal').modal('show');
    });

    /* TABLE GET SELECTED ITEM */
    $('#table-get-selected-item').bootTable({ method : 'init', selected : true });
    $('#table-get-selected-item').bTAddAllJson(dataJson);

    $('#btn-get-selected-item').click(function() {
      var selected = $('#table-get-selected-item').find('tr').hasClass('selected');

      if (!selected) {
        alert('Please select a row!');
        return;
      }

      $('#modal #modal-code').html(JSON.stringify($('#table-get-selected-item').getSelectedItem()));
      $('#modal').modal('show');
    });

    /* TABLE FIX HEAD */
    $('#table-fix-head').bootTable({ method : 'init' });
    $('#table-fix-head').bTAddAllJson(dataJson);
    $('#table-fix-head').bootTable({ method : 'fixHead' });

    /* TABLE FIX HEAD AND FOOT */
    $('#table-fix-head-foot').bootTable({ method : 'init' });
    $('#table-fix-head-foot').bTAddAllJson(dataJson);
    $('#table-fix-head-foot').bootTable({ method : 'fixHeadFoot' });

    /* TABLE CALCULATE COLUMN */
    $('#table-calculate-column').bootTable({ method : 'init' });
    $('#table-calculate-column').bTAddAllJson(dataJson);
    $('#btn-calculate-column').click(function() {
      $('#modal #modal-code').html( $('#table-calculate-column').calculateColumn(3) );
      $('#modal').modal('show');
    });

    /* TABLE CALCULATE COLUMN BY FIELD */
    $('#table-calculate-column-by-field').bootTable({ method : 'init' });
    $('#table-calculate-column-by-field').bTAddAllJson(dataJson);
    $('#btn-calculate-column-by-field').click(function() {
      $('#modal #modal-code').html( $('#table-calculate-column-by-field').calculateColumn('MONEY') );
      $('#modal').modal('show');
    });

    /* TABLE GET ITENS COUNT */
    $('#table-get-itens-count').bootTable({ method : 'init' });
    $('#table-get-itens-count').bTAddAllJson(dataJson);
    $('#btn-get-itens-count').click(function() {
      $('#modal #modal-code').html( $('#table-get-itens-count').getItensCount('5') );
      $('#modal').modal('show');
    });

    /* AND MORE */
    $('#table-users').bootTable({ method : 'init', selected : true });

    $('#table-users').on('BOOTTABLE_EVENT_CLICK_ROW', function(e, params) {
      $('#txt-event-click-row').html(JSON.stringify(params));
    });
    $('#table-users').on('BOOTTABLE_EVENT_ENTER_ROW', function(e, params) {
      $('#txt-event-enter-row').html(JSON.stringify(params));
    });
    $('#table-users').on('BOOTTABLE_EVENT_DOWN_ROW', function(e, params) {
      $('#txt-event-down-up-row').html(JSON.stringify(params));
    });
    $('#table-users').on('BOOTTABLE_EVENT_UP_ROW', function(e, params) {
      $('#txt-event-down-up-row').html(JSON.stringify(params));
    });

    $('#btn-all').click(function() {
      Table.all();
    });

    Table.all();
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
        "MONEY"    : values.MONEY,
        "ACTIVE" 	 : ( values.ACTIVE === true ) ? 'Yes' : 'No',
        "EDIT" 		 : '<div onclick="Table.edit(' + values.ID_USER + ')" class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></div>',
        "DELETE" 	 : '<div onclick="Table.delete(' + values.ID_USER + ')" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span></div>'
      };
      arrValues.push(values);
    });

    $('#table-users').bootTable({ method : 'addall' }, arrHeader, arrValues);
  },
  edit : function( id ) {
    var params = {
      "ID_USER" : id
    };
    var edt = $('#table-users').bootTable({
      method : 'edt'
    }, params);

    $('#txt-get-all').html(JSON.stringify(edt));
  },
  delete : function( id ) {
    if (confirm('Are you sure you want to delete the record?')) {

      var params = {
        "ID_USER" : id
      };
      var del = $('#table-users').bootTable({
        method : 'del'
      }, params);
      if (del) {
        $('#txt-get-all').html( 'Record Delete!' );
      }
    }
  }
};

$(document).ready(function() {
  Table.init();
});
