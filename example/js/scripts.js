var User = {	
	init : function() {
		User.save();
		User.all();
	},
	all : function() {
		$('#table-users').bootTable({
			method : 'clr'
		});	
		var params = { 
			'method' : 'all'			
		};
		$.post('?m=controller&c=UserController', params, function( data ) {
			$.each( data, function( key, values ) {
		        var header = { 
		            "ID_USER" : values.ID_USER
		        };
		        var values = {
		            "ID_USER" 	: values.ID_USER, 
		            "NAME" 		: values.NAME,
		            "PASSWORD" 	: values.PASSWORD,
		            "ACTIVE" 	: ( values.ACTIVE == '1' ) ? 'Yes' : 'No',
		            "EDIT" 		: '<div onclick="User.edit(' + values.ID_USER + ')" ><span class="glyphicon glyphicon-pencil"></span></div>',
		            "DELETE" 	: '<div onclick="User.delete(' + values.ID_USER + ')" ><span class="glyphicon glyphicon-trash"></span></div>'
		        };
		        
		        $('#table-users').bootTable({
		    	 	method : 'add'
		    	}, header, values);			        
		    });  			
		}, 'json');
	},
	edit : function( id ) {
		/* FIRST WAY NOT SEARCH THE INFORMATION IN THE DATABASE */
		var params = { 
   			"ID_USER" : id
   		};
   		var edt = $('#table-users').bootTable({
   			method : 'edt'
   		}, params);	
		
   		$('#txt-user-code'		 ).val( edt.ID_USER  );
   		$('#txt-user-name'		 ).val( edt.NAME 	 );
   		$('#txt-user-password'	 ).val( edt.PASSWORD );
   		$('#txt-user-repassword' ).val( edt.PASSWORD );
		
   		/* THE SECOND WAY SEARCH THE INFORMATION IN THE DATABASE */
//		var params = { 
//			'method' : 'edit',
//			'code' : id			
//		};	
//		$.post('?m=controller&c=UserController', params, function( data ) {
//			$.each( data, function( key, values ) {
//
//				$('#txt-user-code'		 ).val( values.ID_USER  );
//		   		$('#txt-user-name'		 ).val( values.NAME		);
//		   		$('#txt-user-password'	 ).val( values.PASSWORD );
//		   		$('#txt-user-repassword' ).val( values.PASSWORD );
//			});
//		}, 'json');
	},
	delete : function( id ) {
	    bootbox.dialog({
	    	message : "Want to Delete the Record?",
	    	title : "Warning",
	    	buttons : {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
			    		var params = { 
			    			"ID_USER" : id
			    		};
			    		var del = $('#table-users').bootTable({
			    			method : 'del'
			    		}, params);	
			    		
			    		if ( del == true ) {
		    				var params = { 
								'method' : 'delete',
								'code' : id			
							};						
							$.post('?m=controller&c=UserController', params, function( data ) {
								if ( data == true ) {
									User.all();
								}
							}, 'json');
			    		}
					}
				},
				main: {
					label: "No",
					className: "btn-primary"
				}
	    	}
	    }); 
	},
	save : function() {
		$("#form-user").find('input,select,textarea').not('[type=submit]').jqBootstrapValidation({
		    preventSubmit: true,
		    submitError: function($form, event, errors) {
		    },
		    submitSuccess: function($form, event) {
				var params = { 
					'method' : 'save',
					'form'   : $form.serialize()		
				};
			
				$.post('?m=controller&c=UserController', params, function( data ) {
					User.all();
					$('#btn-reset').click();
				}, 'json');
			
		    	event.preventDefault();		
		    },
		    filter: function() {
		        return $(this).is(":visible");
		    }
		});		
	}
};

$(document).ready(function() {
    User.init();
});