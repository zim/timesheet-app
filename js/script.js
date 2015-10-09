$(document).ready(function() {
	//console.log('$(document).ready(function() {');
	
	// SET GLOBALS
	var showAddForm = false;

	// ADD DEBIT ITEM BUTT0N
	$("#btn_add").click(function() {
		console.log('BUTTON ADD CLICKED');

		if (!showAddForm) {
			$("#form_add_item").css({
				"display" : "inline-block"
			});
			showAddForm = true;
		} else {
			$("#form_add_item").css({
				"display" : "none"
			});
			showAddForm = false;
		}// end if(showAddForm){

	});// end btn_add click

	$("#submitAddItem").click(function() {
		//console.log('BUTTON submitAddItem STORAGE VALUE = ' + storage);
		//console.log('retrievedObject on click btn submitAddItem: ', retrievedObjectPassed);
		//retrievedObject = localStorage.getItem('testObject');
		//retrievedObjectPassed = JSON.parse(retrievedObject);
		//BudgetMain.createApp("payed", "budget_holder","This Is New btn click Budget App", retrievedObjectPassed,"payed");

		//console.log('this is submit button for form ' + this.dataset.form);

		var tmpValueAddDate = document.getElementById("textboxDate" + this.dataset.form);
		var tmpDateVal = tmpValueAddDate.value;
		//console.log("textbox date value = " + tmpDateVal);

		var tmpValueAddClientTxt = document.getElementById("textboxClient" + this.dataset.form);
		var tmpClientVal = tmpValueAddClientTxt.value;
		//console.log("textbox value = " + tmpClientVal);

		var tmpValueAddRef = document.getElementById("textboxRef" + this.dataset.form);
		var tmpRefVal = tmpValueAddRef.value;
		//console.log("textbox value value = " + tmpRefVal);
		
		var tmpValueAddNumber = document.getElementById("textboxNumber" + this.dataset.form);
		var tmpNumberVal = parseInt(tmpValueAddNumber.value);
		//console.log("tmpNumberVal value value = " + tmpNumberVal);

		var tmpValueAddJobStart = document.getElementById("textboxJobStart" + this.dataset.form);
		var tmpJSVal = tmpValueAddJobStart.value;
		//console.log("textbox job start value = " + tmpJSVal);

		var tmpValueAddJobFinish = document.getElementById("textboxJobFinish" + this.dataset.form);
		var tmpJFVal = tmpValueAddJobFinish.value;
		//console.log("textbox job finish value = " + tmpJFVal);

		TimesheetMain.addJobItem(tmpDateVal,tmpClientVal,tmpRefVal,tmpNumberVal,tmpJSVal,tmpJFVal);

		$('#textboxClientadd').val('');
		$('#textboxRefadd').val('');
		$('#textboxNumberadd').val('');
		$('#textboxJobStartadd').val('');
		$('#textboxJobFinishadd').val('');
		$('#textboxDateadd').val('');

	});
	// end button click

	$(".ctaSortFilter").click(function() {
		
		var tmpFilterVal = this.dataset.filter;

		console.log('BUTTON ctaSortClient CLICKED ' + tmpFilterVal);

		TimesheetMain.createJobListFilter(tmpFilterVal);
	});
	// end button click

	 $('.time').timepicker();

	 $('input.timepicker').timepicker({});



	function populate_week_range_options(){

	    var start_week_date = new Date(2013, 7-1, 2); // no queries exist before this

	    var todays_date = new Date();

	    // array to hold week commencing dates
	    var week_commencing_dates = new Array();

	    var first_monday_date = new Date(2012, 7-1, 2); // no queries exist before this

	    console.log('first_monday_date = ' + first_monday_date);

	    week_commencing_dates.push(first_monday_date);

	    while(start_week_date < todays_date){

	    	console.log('while(start_week_date < todays_date){ =vvvvvvvvvvvvvvvvvvvvv');

	        var next_date = start_week_date.setDate(start_week_date.getDate() + 1);

	        console.log('var next_date = ' + next_date);

	        var next_days_date = new Date(next_date);


	        day_index = next_days_date.getDay();

	        console.log('day_index = ' + day_index);


	        if(day_index == 1){
	        	console.log('if(day_index == 1){ == next_days_date = ' + next_days_date);
	            week_commencing_dates.push(next_days_date);
	        }

	        // increment the date
	        start_week_date = new Date(next_date);

	    }// END while(start_week_date < todays_date){

	    console.log('WEEK BEGINING ========================');
	    console.log(week_commencing_dates);
	    return week_commencing_dates;
	}//

populate_week_range_options();

});// END $(document).ready(function() {

var TimesheetMain = new TimesheetMain('timesheet_holder');






