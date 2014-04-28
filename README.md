bootTable
=========

JQuery Plugin for Manipulating Tables

## JQuery
jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

- http://jquery.com/

## Bootstrap
Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.

- http://getbootstrap.com/

## Usage Plugin 

- With boottable.js plugin is possible to do

- Clear the table - method 'clr'
- Add items in the table - method 'add'
- Edit a table item - method 'edt'
- Delete a table item - method 'del'

### clr

- Before we get all the items of the table in the database is necessary to clean the items that are in the table, using the method clear. (bootTable/example/js/script.js - method all)

```javascript
$('#table-users').bootTable({
	method : 'clr'
});	
```

### add

- Added items in the table, after returning from the database. (bootTable/example/js/script.js - method all)

```javascript
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
```

### edt

- Edit items in the table using the plugin without the need to consult the database. (bootTable/example/js/script.js - method edit)

```javascript
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
```

### del

- Delete items in the table using the plugin. (bootTable/example/js/script.js - method delete)

```
var params = { 
	"ID_USER" : id
};
var del = $('#table-users').bootTable({
	method : 'del'
}, params);	
```

## Usage Example 

- Donwload the Project 
- Exec release.sql (example/script/release.sql)  
- Change the database connection (example/app/service/DataBase.php) 

```php
private static $myServer = "MYSQL_SERVER"; // localhost
private static $myUser = "MYSQL_USER"; // root
private static $myPass = "MYSQL_PASSWORD"; // root
private static $myDB = "DB_NAME"; // boottable 
```

## Contributing

Anyone and everyone is welcome to contribute.

## License

+ [MIT License © Eduardo Malherbi Martins] (https://github.com/emalherbi/bootTable/blob/master/LICENSE)

## Author

**Eduardo Malherbi Martins**

+ [http://emalherbi.com](http://emalherbi.com)

