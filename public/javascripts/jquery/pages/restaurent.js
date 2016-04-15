(function($){	
	/* Formatting function for row details - modify as you need */
	function format ( d ) {
			var grades = '';
			if( d.grades.length == 0){
				grades = '<tr><td cols="4">No grades.</td></tr>';					          					     
			}

			for( var key in  d.grades ){
				var grade = d.grades[key];
				grades += '<tr>' +
					          '<td></td>'+
					          '<td>'+grade.date+'</td>' +
					          '<td>'+grade.grade+'</td>' + 
					          '<td>'+grade.score+'</td>' +
					      '</tr>';
			}
	

		    // `d` is the original data object for the row
		    return '<table id="table-'+d._id+'" class="table-details" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;width:100%">'+
			    '<tr>'+
				    '<td>Name:</td>'+
				    '<td>'+d.name+'</td>'+
			    '</tr>'+
			    '<tr>'+
				    '<td>Address:</td>'+
				    '<td>'+
				    	'<address>Building: '+d.address.building+
					    	'<br>Street: '+d.address.street+
					    	'<br>Zipcode: '+d.address.zipcode +
					    	'<br>Coord: '+d.address.coord[0]+ ', ' + d.address.coord[1] +
				    	'</address>'+
				    '</td>'+
			    '</tr>'+
			    // Grades Zone
			    '<tr>'+
				    '<td>Grades:</td>'+
				    '<td><table style="width:100%">'+
					      	'<tbody><tr>' +
					          '<th></th>' +
					          '<th>Date</th>'+
					          '<th>Grade</th>'+
					          '<th>Score</th>'+          
					      '</tr>'+grades+'</tbody></table>'+
				    '</td>'+
			    '</tr>'+
			    // Actions Zone
			    '<tr>'+
				    '<td>Actions:</td>'+
				    '<td>'+
				    	'<a role="button" class="btn btn-danger  btn-action btn-space" href="javascript:void(0);" onClick="doDelete(this)"  data-rid="'+d._id+'" >Delete</a>'+
				    	'<a role="button" class="btn btn-primary btn-action btn-space" data-toggle="modal" data-target="#modal-'+d._id+'"  data-rid="'+d._id+'" >Quick Edit</a>' + 
				    	'<a href="/restaurents/details/'+d._id+'" class="btn btn-success btn-action btn-space" data-rid="'+d._id+'" >View More</a>' +
				    	'<a role="button" class="btn btn-default btn-action btn-space" href="javascript:void(0);" onClick="doCancel(this)" data-rid="'+d._id+'" >Cancel</a>' + 				    	
				    '</td>'+
			    '</tr>'+
		    '</table>'+ 
		    '<div class="modal fade" id="modal-'+d._id+'" tabindex="-1" role="dialog" aria-labelledby="modal-'+d._id+'" >'+
			  '<div class="modal-dialog" role="document">' +
		    	'<form name="form_name-'+d._id+'" id="formId-'+d._id+'" action="/restaurents/update" method="POST" >' +
				    '<div class="modal-content">' + 
					    '<div class="modal-header">' +
					        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					        '<h4 class="modal-title" id="exampleModalLabel">Edit Restaurent @'+d.name+'</h4>' +
					    '</div>' +
				        '<div class="modal-body">' +				        
					          '<div class="form-group">' +
					            '<label for="res-name" class="control-label">Restaurent Name:</label>' +
					            '<input type="text" class="form-control" id="name" value="'+ d.name +'" name="res_name" >' +
					          '</div>' +
					          '<div class="form-group">' +
					            '<label for="address_building" class="control-label">Building:</label>' + 
					            '<textarea class="form-control" id="address_building" name="address_building" >'+d.address.building+'</textarea>' + 
					          '</div>' + 				        
					          '<div class="form-group">' +
					            '<label for="address_street" class="control-label">Street:</label>' + 
					            '<textarea class="form-control" id="address_street" name="address_street" >'+d.address.street+'</textarea>' + 
					          '</div>' +
					          '<div class="form-group">' +
					            '<label for="address_lat" class="control-label">Lat:</label>' + 
					            '<input type="text" class="form-control" id="address_lat" value="'+ d.address.coord[0] +'" name="address_lat" >' +

					            '<label for="address_lng" class="control-label">Lng:</label>' + 
					            '<input type="text" class="form-control" id="address_lng" value="'+ d.address.coord[1] +'" name="address_lng" >' +
					          '</div>' +
					           '<div class="form-group">' +					            
					            '<label for="zipcode" class="control-label">Zipcode:</label>' + 
					            '<input type="text" class="form-control" id="zipcode" value="'+ d.address.zipcode +'" name="zipcode" >' +
					          '</div>' +
				      '</div>' + 
				      '<div class="modal-footer">' + 				      		
					        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + 
					        '<input type="hidden" class="form-control" id="_id" value="'+ d._id +'" name="_id" >' +
					        '<button type="button" class="btn btn-primary" onClick="doUpdate(this);" data-rid="'+d._id+'" >Save</button>' +
				      '</div>' + 				   
			    	'</div>' +
			     '</form>' + 
			  '</div>' +
			'</div>';		    
	}	
	$(document).ready(function(){


		// NOTIFY
		function showNotify( $type, $message  ){
			$.notify({
				// options
				icon: '',
				title: 'Restaurent notify',
				message: $message,
				url: 'https://github.com/mouse0270/bootstrap-notify',
				target: '_blank'
			},{
				// settings
				element: 'body',
				position: null,
				type: $type,
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: '_blank',
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
						'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>' 
			});
		}

		/*$.notify({
			title: "Welcome:",
			message: "This plugin has been provided to you by Robert McIntosh aka mouse0270"
		});*/


		/*var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
			allow_dismiss: false,
			showProgressbar: true
		});

		setTimeout(function() {
			notify.update({
				'type': 'success', 
				'message': '<strong>Success</strong> Your page has been saved!', 
				'progress': 25
			});
		}, 4500);*/	
		var tr = '<tbody>';
		for(var i = 0 ; i < 10; i++){
			var clss = ((i % 2) == 0) ? "odd" : "even";
			tr += '<tr id="res-570b81d6ed54719e7bb44679'+i+'" role="row" class="'+clss+'"><td class=" details-control"><span class="details details-open"></span></td><td class="sorting_1">\'\'W\'\' Cafe</td><td>Manhattan</td><td>American </td><td>1</td><td>570b81d6ed54719e7bb44679</td></tr>';
		}
		tr += '</tbody>';

		// DATATABLE 
		var htmlTable =  '<thead>' + 
						'<tr>'+
							'<th></th>' + 
							'<th>Name</th>' + 
							'<th>Borough</th>' + 
							'<th>Cuisine</th>' + 
							'<th>Grades Count</th>' + 
							'<th>ID</th>' + 
						'</tr>'+						
					'</thead>' +
					'<tfoot>' +
						'<tr>'+
							'<th></th>' + 
							'<th>Name</th>' + 
							'<th>Borough</th>' + 
							'<th>Cuisine</th>' + 
							'<th>Grades Count</th>' + 
							'<th>ID</th>' + 
						'</tr>'+	
					'</tfoot>' + tr;

		$('#example').html(htmlTable);
		$('<div class="loading">Loading&#8230;</div>').appendTo('body');
		var table = $('#example').DataTable({
			"processing": true,
			"serverSide": true,
			"ajax": "/restaurents/loadAjax", 
			"oLanguage": {
				"sProcessing": "<b>Loading...</b>"
			},
			"initComplete": function(){
				$("div.loading").remove();
			}
			,
		 	"columns": [
	            {
	                "className":      'details-control',
	                "orderable":      false,
	                "data":           null,
	                "defaultContent": '<span class="details details-open"></span>'
	            },
	            { "data": "name" },	            
	            { "data": "borough" },
	            { "data": "cuisine" },
	            { "data": "grades_count" },
	            { "data": "_id" }	            	           
	        ]			,
	        "order": [[1, 'asc']],
	        "createdRow": function (row, data, index) {	        
		        $(row).attr("id",'res-' + data._id );		        
		    }
		});


		
		// Add event listener for opening and closing details
	    $('#example tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it	          
	            row.child.hide();
	            tr.removeClass('shown');
	            tr.find(".details").removeClass("details-close").addClass("details-open");	            
	        }
	        else {
	            // Open this row
	            row.child( format(row.data()) ).show();	            
	            tr.addClass('shown');
	         	tr.find(".details").removeClass("details-open").addClass("details-close");
	        }
	    });


	    /**
	    	DELETE
	    */
	    window.doDelete = function(element){
	    	var tr = $(element).closest('tr');
	    	var isOk = confirm("Do you want delete this restaurent ?");
	    	if(isOk){
	    		var id = $(element).attr("data-rid");	    		
	    		var data = {'id': id }	    						    	;	    		
	    		$.ajax({
	    			url : "/restaurents/delete",
	    			data: data,
	    			type: "POST",
	    			dataType:"JSON",
	    			beforeSend:function( data ){
	    				console.log("deleting...");
	    			},
	    			success : function(data){
	    				if( data.err == 0 ){
	    					
	    					// reaload table
	    					table.ajax.reload( function(data2){
			        			showNotify("success", data.message);
			        		}, false ); // user paging is not reset on reload    				

	    				}else{
	    					showNotify("danger", data.message);
	    					return false;	    				
	    				}
	    			}
	    		});
	    	}
	    }; // end doDelete



	    /**
	    	CANCEL
	    */
	    window.doCancel = function(element){
	    
	    	var $id = $(element).attr("data-rid");
			$("#res-"+ $id).find(".details-control").click();

		
	    }





	    /* 
	    	UPDATE
	    */
     	
     	window.doUpdate = function(element){
     		var id = $(element).attr("data-rid");     		
     		var $this = $("#formId-"+id);  	     		
		 	var postData = $this.serializeArray();
		    var formURL  =  $this.attr("action");
		    $.ajax({
		        url : formURL,
		        type: "POST",
		        data : postData,
		        success:function(data, textStatus, jqXHR) 
		        {		        	
		        	$("#modal-" + id ).modal('toggle');		        	 		        			        			        			        
					table.ajax.reload( function(){
	        			$("#res-"+ id).find(".details-control").click();	
        				showNotify("success", textStatus);
	        		}, false ); // user paging is not reset on reload        				        			            		            		         
		        },
		        error: function(jqXHR, textStatus, errorThrown) 
		        {
		            showNotify("danger", textStatus);
		        }
		    });		   	     		    
     	}
	});
	

})(jQuery);
