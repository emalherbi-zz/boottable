<form id="form-user" name="form-user" role="form">
	<input class="form-control" id="txt-user-code" name="txt-user-code" type="hidden" />
	<div class="page-header">
	  <h1>Sign in <small>* Required fields</small></h1>
	</div>	
	<div class="form-group">
		<label for="txt-user-name">* Name</label>
		<div class="input-group">
			<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
			<input class="form-control" id="txt-user-name" name="txt-user-name" type="text" required />
		</div>
	</div>
	<div class="form-group">
		<label for="txt-user-password">* Password</label>
		<input class="form-control" id="txt-user-password" name="txt-user-password" type="password" required />
	</div>
	<div class="form-group">
		<label for="txt-user-repassword" >* Re-Password</label>
		<input class="form-control" id="txt-user-repassword" name="txt-user-repassword" type="password" required />
	</div>	
	<button type="submit" class="btn btn-success">Save</button>
	<button id="btn-reset" name="btn-reset" type="reset" class="btn btn-primary">New</button>
</form>

<div class="page-header" >
	<h1>Users</h1>
</div>

<div class="table-responsive" >
	<table id="table-users" name="table-users" class="table table-bordered">
		<thead>
			<tr>
				<th width='80px' field="ID_USER" >Code</th>
				<th field="NAME" >Name</th>
				<th field="PASSWORD" >Password</th>
				<th field="ACTIVE" width='80px' >Active</th>
				<th width='80px' >Edit</th>
				<th width='80px' >Delete</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>