/*!
 * bootTable v0.0.1 by emalherbi.com
 */
(function($){
	if(!$.Table){
		$.Table = new Object();
	};
	
	$.Table.boot = function(el, header, values, options) {
		var base = this;
		
		base.$el = $(el);
		base.el = el;
		
		base.$el.data("Table.boot", base);
		
		base.init = function() {
			if( typeof( header ) === "undefined" || header === null ) header = '';
			if( typeof( values ) === "undefined" || values === null ) values = '';
			
			base.header = header;
			base.values = values;
			
			base.options = $.extend({},$.Table.boot.defaultOptions, options);
		};
		
		base.clr = function() {
			$('#'+base.$el.attr('id')+' tbody').remove();
			
			return true;
		}		
		
		base.add = function() {
			var arr = [];
			$.each(base.header, function(i, v) {                    
				arr.push( i + "='" + v + "'" );
			});
			var join = arr.join(" ");
			
			var tr = "";
			tr += "<tr " + join + " >";
			
			$.each(base.values, function(i, v) {  
				tr += "<td>" + v + "</td>";
			});
			tr += "</tr>";    

			base.$el.append( tr );
			base.$el.show('slow'); 

			return true;				
		};
		
		base.edt = function() {
			var r = false;
			
			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody').find('tr').each(function(i, el) {
				var id = $(el).attr( key.toString().toLowerCase() );

				if ( id == value ) {
					var columns = $('#'+base.$el.attr('id')+' thead tr th').map(function() {
					    return $(this).attr('field');
					});
					var table = $('#'+base.$el.attr('id')+' tbody tr:nth-child('+(i+1)+')').map(function(i) {
						var row = {};
						$(this).find('td').each(function(i) {
							var v = $(this).find('input').val();
							if ( typeof v == 'undefined' ) {
								v = $(this).find('textarea').val();			
					    		if ( typeof v == 'undefined' ) {
					    			v = $(this).find('label').text();
					    			if ( !v.trim() ) {
						    			v = $(this).text();
									}
						    	}
							}
						
							row[ columns[i] ] = v;
						});			
						return row;
					}).get();

					r = table;		
				}	
			});				

			return r[0];				
		};

		base.del = function(){
			var r = false;
			
			var key   = Object.keys(base.header);
			var value = base.header[ key ];

			base.$el.find('tbody').find('tr').each(function(i, el) {
				var id = $(el).attr( key.toString().toLowerCase() );

				if ( id == value ) {
					$(el).attr('delete', 'true');
					$(el).hide('slow');

					r = true;
				}	
			});

			return r;				
		};			

		base.init();

		var r = null;	
		if ( base.options.method == 'clr' ) {
			r = base.clr();
		}
		else if ( base.options.method == 'add' ) {
			r = base.add();
		}
		else if ( base.options.method == 'edt' ) {
			r = base.edt();
		}
		else if ( base.options.method == 'del' ) {
			r = base.del();
		}

		return r;
	};
	
	$.Table.boot.defaultOptions = {
		method : ''
	};
	
	$.fn.bootTable = function(options, header, values){
		var r = null;	
		
		this.each(function() {
			r = $.Table.boot(this, header, values, options);
		});

		return r;
	};

	$.fn.getBootTable = function(){
		this.data("Table.boot");
	};
	
})(jQuery);