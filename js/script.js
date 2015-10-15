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

	 //$('.time').timepicker();

	 $('input.timepickernew').timepicker({ 'scrollDefault': 'now' });

	 $('#textboxDateadd').datepicker({
	    daysOfWeekDisabled: [0,6]
	});



	function populate_week_range_options(){

	    var start_week_date = new Date(2015, 3-1, 2); // no queries exist before this
	    console.log('start_week_date = ' + start_week_date);

	    var todays_date = new Date();

	    // array to hold week commencing dates
	    var week_commencing_dates = new Array();

	    var first_monday_date = new Date(2015, 3-1, 2); // no queries exist before this

	    //console.log('first_monday_date = ' + first_monday_date);

	    week_commencing_dates.push(first_monday_date);

	    while(start_week_date < todays_date){

	    	//console.log('while(start_week_date < todays_date){ =vvvvvvvvvvvvvvvvvvvvv');

	        var next_date = start_week_date.setDate(start_week_date.getDate() + 1);

	        //console.log('var next_date = ' + next_date);

	        var next_days_date = new Date(next_date);


	        day_index = next_days_date.getDay();

	        //console.log('day_index = ' + day_index);


	        if(day_index == 1){
	        	//console.log('if(day_index == 1){ == next_days_date = ' + next_days_date);
	            week_commencing_dates.push(next_days_date);
	        }

	        // increment the date
	        start_week_date = new Date(next_date);

	    }// END while(start_week_date < todays_date){

	    // console.log('WEEK BEGINING ========================');
	    // console.log(week_commencing_dates);
	    return week_commencing_dates;
	}//

populate_week_range_options();



// PAGING STUFF
//how much items per page to show
	var show_per_page = 5; 
	//getting the amount of elements inside content div
	var number_of_items = $('#timesheet_holder').children().size();
	//calculate the number of pages we are going to have
	var number_of_pages = Math.ceil(number_of_items/show_per_page);
	
	//set the value of our hidden input fields
	$('#current_page').val(0);
	$('#show_per_page').val(show_per_page);
	
	//now when we got all we need for the navigation let's make it '
	
	/* 
	what are we going to have in the navigation?
		- link to previous page
		- links to specific pages
		- link to next page
	*/
	var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
	var current_link = 0;
	while(number_of_pages > current_link){
		navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
		current_link++;
	}
	navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';
	
	$('#page_navigation').html(navigation_html);
	
	//add active_page class to the first page link
	$('#page_navigation .page_link:first').addClass('active_page');
	
	//hide all the elements inside content div
	$('#timesheet_holder').children().css('display', 'none');
	
	//and show the first n (show_per_page) elements
	$('#timesheet_holder').children().slice(0, show_per_page).css('display', 'block');
// END PAGING STUFF









});// END $(document).ready(function() {


// PAGING STUFF
function previous(){
	
	new_page = parseInt($('#current_page').val()) - 1;
	//if there is an item before the current active link run the function
	if($('.active_page').prev('.page_link').length==true){
		go_to_page(new_page);
	}
	
}

function next(){
	new_page = parseInt($('#current_page').val()) + 1;
	//if there is an item after the current active link run the function
	if($('.active_page').next('.page_link').length==true){
		go_to_page(new_page);
	}
	
}
function go_to_page(page_num){
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page').val());
	
	//get the element number where to start the slice from
	start_from = page_num * show_per_page;
	
	//get the element number where to end the slice
	end_on = start_from + show_per_page;
	
	//hide all children elements of content div, get specific items and show them
	$('#timesheet_holder').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
	
	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
	
	//update the current page input field
	$('#current_page').val(page_num);
}

// END PAGING STUFF

var TimesheetMain = new TimesheetMain('timesheet_holder');






