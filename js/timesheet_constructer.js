
// HERE WE DEFINE OUR MAIN TOPAY FUNCTION.
// WE ARE PASSING IT 5 ARGUMENTS: AN ID, A DOM ELEMENT, A TITLE STRING, THE DEBT LIST WHICH IS AN ARRAY OF DebitObject OBJECTS, AND A SHOW VARIABLE
var TimesheetMain = TimesheetMain || (function(domId, jobsList, show){

	console.log('var TimesheetMain domId =' + domId);

	var retrievedObject;
	var retrievedObjectPassed;

	// 	CREATE ARRAYS FOR OBJECT ITEMDS
	var jobClientsArray = [];
	var jobNumbersArray = [];
	var jobDatesArray = [];

	// create an ARRAY to hold the DebitObject list
	var allJobs = [];

	// boolean for storage set
	var storage = false;

	// create array to hold all new DebitObject's and make them accesible to other methods
	var timesheetObjArray = [];
	var timesheetObjStore = [];

	// HERE WE DECLARE ARRAYS TO HOLD OUR ITEM LAYOUT HTML ELEMENTS
	var timesheetJob = [];
	var jobClientElement = [];
	var jobDateElement = [];
	var jobSTElement = [];
	var jobFTElement = [];
	var jobDurationElement = [];

	var btnShowClient = [];

	var iconWrapElement = [];
	var btnSetState = [];
	var btnEditItem = [];
	var btnDeleteItem = [];

	var selectsExist = false;
	var selDateElement;
	var selClientElement;
	var selNumberElement;

	var dateSelWrap = document.getElementById("dateSelWrap");
	var clientSelWrap = document.getElementById("clientSelWrap");
	var numberSelWrap = document.getElementById("numberSelWrap");



	var jobNumberElement = [];
	var jobRefElement = [];

	var domElement;


	// HERE WE SET SOME VARIABLES AND BOOLEANS THAT WE NEED TO SEE FROM OTHER METHODS IN OUR MAIN TOPAY APP FUNCTION OBJECT
	//var viewTotal = 0;
	var editing = false;


	// CHECK TO SEE IF LOCAL IS AVAILABLE
	if ( typeof (Storage) != "undefined") {

		console.log('typeof (Storage) != "undefined"');
		// Store
		// localStorage.setItem("lastname", "Smith");
		// Retrieve
		// document.getElementById("result").innerHTML = localStorage.getItem("lastname");
		// CHECK TO SEE IF LOCAL STORAGE HAS BEEN SET
		if (localStorage.getItem("jobsObject") === null) {
			console.log('jobsObject = null');
			//  BEGIN AJAX CALL
			
			// end $.ajax({

		} else {// IF LOCAL STORAGE SET THEN GET ALL DEBTOBJECTS FROM THERE
			//console.log('LOCAL STORAGE SET THEN GET ALL DEBTOBJECTS FROM THERE');

			// Retrieve the object from storage
			retrievedObject = localStorage.getItem('jobsObject');

			//console.log('else retrievedObject: ', JSON.parse(retrievedObject));

			retrievedObjectPassed = JSON.parse(retrievedObject);

			storage = true;

			// INITIALIZE MAIN APP
			createApp("timesheet_holder", retrievedObjectPassed, "all");
		}// if (localStorage.getItem("testObject") === null) {

	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}// end if (typeof(Storage) != "undefined") {


	// var addFormWrapper = document.getElementById("addFormWrapper");


	// var addItemFormWrapper = document.createElement('div');
	// addItemFormWrapper.id = "btn_add";
	// addItemFormWrapper.setAttribute('class','col-md-4');
	// addItemFormWrapper.innerHTML = "ADD";
	// addFormWrapper.appendChild(addItemFormWrapper);



	
	// CREATE APP FUNCTION
	function createApp(domId, jobsList, show){

		// console.log("========== createApp CALLED ===============");

		// console.log(domId);
		// console.log(jobsList);
		// console.log(show);



		// HERE WE FILL OUR budgetDebtObjArray WITH OUR jobsList PASSED FROM LOCAL STORAGE
		for (var i in jobsList) {

			//console.log("jobsList[i].client = " + jobsList[i].client);
			
			  timesheetObjArray[i] = new JobObject(jobsList[i].date,jobsList[i].client,jobsList[i].ref,jobsList[i].number,jobsList[i].jobstart,jobsList[i].jobfinish,jobsList[i].active);

			  //console.log("timesheetObjArray[i].getJobDurationTime() = " + timesheetObjArray[i].getJobDurationTime());

			  // need to create array like jobsList
			  timesheetObjStore[i] = {"date":jobsList[i].date,"client":jobsList[i].client,"ref":jobsList[i].ref,"number":jobsList[i].number,"jobstart":jobsList[i].jobstart,"jobfinish":jobsList[i].jobfinish,"active":jobsList[i].active};

			  // CREATE ARRAYS FOR LATER
			  jobDatesArray[i] = jobsList[i].date;
			  jobClientsArray[i] = jobsList[i].client;
			  jobNumbersArray[i] = jobsList[i].number;

			  
		}// END for (var i in jobsList) {
		
		// CREATE topay DOM ELEMENT
		domElement = document.getElementById(domId);
		domElement.setAttribute('class','row timesheet_wrapper');
		
		// DEAL WITH JOBLIST ARRAY
		var myJsonString = JSON.stringify(jobsList);

		//console.log("myJsonString = " + myJsonString);

		// CREATE IF SATEMENT HERE!!!!!! FOR FIRST LOAD OF THESE SELECT BOSXES
		if(!selectsExist){
			createDateSelList();
			createClientSelList();
			createNumberSelList();

			selectsExist = true;
		}
		


		// HERE WE CREATE AND RENDER OUR PAGE BY CALLING OUR createDebitList(domElement,jobsList,show) FUNCTION
		createJobList(show);

	}// end function createPlayer







	// CREATE CLIENT JOB LIST FUNCTION
	function createClientSelList(){
		console.log("========== function createClientSelList(show) CALLED ===============");
		var unique = jobClientsArray.filter(function(itm, i){

			///console.log("jobClientsArray.indexOf(itm)== i = " + i);
		    return jobClientsArray.indexOf(itm)== i; 
		    // returns true for only the first instance of itm
		}); // END FILTER

		//console.log(unique);

		selClientElement = document.createElement ("select");

		for (var i in unique) {
			// make unique references only
			//console.log(unique[i]);

			var option = new Option (unique[i], unique[i]);
			option.setAttribute('data-index',i);
            selClientElement.options[selClientElement.options.length] = option;
		}// END for (var i in unique) {

		clientSelWrap.appendChild(selClientElement);

		//console.log('selClientElement = ' + selClientElement);

		

	}// END function createClientSelList(){

	//selClientElement.addEventListener("change", createJobFilter('this'));

	selDateElement.addEventListener('change', function(){ 
	    // pass in `this` (the element), and someOtherVar
	    //getSelection(this, someOtherVar);
	    // var value = sel.options[sel.selectedIndex].value;
	    // console.log(value);
	    createJobFilter(this.value,"date");

	},false);

	selClientElement.addEventListener('change', function(){ 
	    // pass in `this` (the element), and someOtherVar
	    //getSelection(this, someOtherVar);
	    // var value = sel.options[sel.selectedIndex].value;
	    // console.log(value);
	    createJobFilter(this.value,"client");

	},false);

	// SHOW ONLY CLIENT JOB LIST FUNCTION
	function createJobFilter(filterVal,switchVal){

		console.log('filterVal = ' + filterVal);


		// console.log("this.dataset.index = " + btnDomEl.dataset.index);

		// console.log("= createJobListCustom(btnDomEl) CALLED: this.dataset.index = " + btnDomEl.dataset.index);

		//var testClient = filterVal;

		var testVal = filterVal;

		 // switch (switchVal) {
		 //    case "date":
		 //        testVal = timesheetObjArray[btnDomEl.dataset.index].getJobDate();

		 //        break; 
		 //    case "client":
		 //        testVal = timesheetObjArray[btnDomEl.dataset.index].getJobClient();

		 //        break; 
		 //    case "number":
		 //    	testVal = timesheetObjArray[btnDomEl.dataset.index].getJobNumber();
	        	
		 //        break; 
		 //    default: 
		 //        text = "default switch case";
		 //  }// end switch (show) {

		console.log("testVal = " + testVal);

		//console.log(domElement);

		// HERE WE CLEAR THE MAIN DOM ELEMENT BEFORE RE INITIALISING OUR DEBT LIST
		domElement.innerHTML = "";
		
		viewTotal = 0;
		
		// HERE WE LOOP THROUGH ALL THE OBJECT ELEMENTS STORED IN OUR timesheetObjArray AND FILL OUR LAYOUT ARRAYS DECLARED ABOVE AND APPEND THEM TO THE PAGE; DEPENDING ON THE SHOW VARIABLE
		for (var i in timesheetObjArray) {

			console.log("timesheetObjArray[i].getJobClient() = " + timesheetObjArray[i].getJobClient())

			// var tmpClient = timesheetObjArray[i].getJobClient();

			// console.log("tmpClient = " + tmpClient);

			switch (switchVal) {
			    case "date":
			        var tmpVal = timesheetObjArray[i].getJobDate();

			        break; 
			    case "client":
			        var tmpVal = timesheetObjArray[i].getJobClient();

			        break; 
			    case "number":
		        	var tmpVal = timesheetObjArray[i].getJobNumber();
			        break; 
			    default: 
			        text = "default switch case";
			  }// end switch (show) {

			if(tmpVal===testVal){

			timesheetJob[i] = document.createElement('div');
		    timesheetJob[i].id = "job_wrap" + i;

		    timesheetJob[i].setAttribute('class','layout job_wrap');

		    domElement.appendChild(timesheetJob[i]);

		    // JOB DATE ELEMENT
			jobDateElement[i] = document.createElement('div');
			jobDateElement[i].setAttribute('class','col-md-2 span-client');
			jobDateElement[i].innerHTML = timesheetObjArray[i].getJobDate();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobDateElement[i]);


			// JOB START TIME ELEMENT
			jobSTElement[i] = document.createElement('span');
			jobSTElement[i].setAttribute('class','span-start-time');
			jobSTElement[i].innerHTML = timesheetObjArray[i].getJobStartTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobSTElement[i]);

			// JOB FINISH TIME ELEMENT
			jobFTElement[i] = document.createElement('span');
			jobFTElement[i].setAttribute('class','span-finish-time');
			jobFTElement[i].innerHTML = timesheetObjArray[i].getJobFinishTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobFTElement[i]);



		    // JOB CLIENT ELEMENT
			jobClientElement[i] = document.createElement('div');
			jobClientElement[i].setAttribute('class','col-md-3 span-client');
			jobClientElement[i].innerHTML = timesheetObjArray[i].getJobClient();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobClientElement[i]);

			// JOB NUMBER ELEMENT
			jobNumberElement[i] = document.createElement('div');
			jobNumberElement[i].setAttribute('class','col-md-3 span-number');
			jobNumberElement[i].innerHTML = timesheetObjArray[i].getJobNumber();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobNumberElement[i]);

			// JOB REF ELEMENT
			jobRefElement[i] = document.createElement('div');
			jobRefElement[i].setAttribute('class','col-md-4-end span-ref');
			jobRefElement[i].innerHTML = timesheetObjArray[i].getJobRef();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobRefElement[i]);
				
			}

			//timesheetObjArray[i].getJobClient();
		  
		}// end for

	}



		// CREATE NUMBER JOB LIST FUNCTION
	function createNumberSelList(){
		console.log("========== function createNumberSelList(show) CALLED ===============");
		var unique = jobNumbersArray.filter(function(itm, i){

			//console.log("jobNumbersArray.indexOf(itm)== i = " + i);
		    return jobNumbersArray.indexOf(itm)== i; 
		    // returns true for only the first instance of itm
		}); // END FILTER

		console.log(unique);

		selNumberElement = document.createElement ("select");

		for (var i in unique) {
			// make unique references only
			//console.log(unique[i]);

			var option = new Option (unique[i], unique[i]);
            selNumberElement.options[selNumberElement.options.length] = option;
		}// END for (var i in unique) {

		numberSelWrap.appendChild(selNumberElement);

	}// END function createClientSelList(){

		// CREATE NUMBER JOB LIST FUNCTION
	function createDateSelList(){
		console.log("========== function createClientSelList(show) CALLED ===============");
		var unique = jobDatesArray.filter(function(itm, i){

			//console.log("jobDatesArray.indexOf(itm)== i = " + i);
		    return jobDatesArray.indexOf(itm)== i; 
		    // returns true for only the first instance of itm
		}); // END FILTER

		//console.log(unique);

		selDateElement = document.createElement ("select");

		for (var i in unique) {
			// make unique references only
			//console.log(unique[i]);

			var option = new Option (unique[i], unique[i]);
            selDateElement.options[selDateElement.options.length] = option;
		}// END for (var i in unique) {

		dateSelWrap.appendChild(selDateElement);

	}// END function createClientSelList(){



	function addSelectBox () {
            //var parentDiv = document.getElementById ("main");
            var selectElement = document.createElement ("select");
            for (var i=0;i < 5;i++)
            {
                var option = new Option ("Text " + i, "Value" + i);
                selectElement.options[selectElement.options.length] = option;
            }
            parentDiv.appendChild (selectElement);
    }

	// CREATE CREATE JOB LIST FUNCTION
	function createJobList(show){

		//console.log("========== function createJobList(show) CALLED ===============");

		//console.log(domElement);

		// HERE WE CLEAR THE MAIN DOM ELEMENT BEFORE RE INITIALISING OUR DEBT LIST
		domElement.innerHTML = "";
		
		viewTotal = 0;
		
		// HERE WE LOOP THROUGH ALL THE OBJECT ELEMENTS STORED IN OUR timesheetObjArray AND FILL OUR LAYOUT ARRAYS DECLARED ABOVE AND APPEND THEM TO THE PAGE; DEPENDING ON THE SHOW VARIABLE
		for (var i in timesheetObjArray) {

			//console.log("timesheetObjArray[i].getJobClient() = " + timesheetObjArray[i].getJobClient());
			//console.log("timesheetObjArray[i].getActive() = " + timesheetObjArray[i].getActive());

			//timesheetObjArray[i].getJobClient();

			timesheetJob[i] = document.createElement('div');
		    timesheetJob[i].id = "job_wrap" + i;

		    if(timesheetObjArray[i].getActive()){
			  	
			  	timesheetJob[i].setAttribute('class','layout job_wrap job-active');
			  	
			  }else{
			  		timesheetJob[i].setAttribute('class','layout job_wrap job-inactive');
			  }

		    //timesheetJob[i].setAttribute('class','layout job_wrap');

		    domElement.appendChild(timesheetJob[i]);

		    // JOB DATE ELEMENT
			jobDateElement[i] = document.createElement('div');
			jobDateElement[i].setAttribute('class','col-md-2 span-client');
			jobDateElement[i].innerHTML = timesheetObjArray[i].getJobDate();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobDateElement[i]);


			// JOB START TIME ELEMENT
			jobSTElement[i] = document.createElement('span');
			jobSTElement[i].setAttribute('class','span-start-time');
			jobSTElement[i].innerHTML = "<span>Start Time:</span> " + timesheetObjArray[i].getJobStartTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobSTElement[i]);

			// JOB FINISH TIME ELEMENT
			jobFTElement[i] = document.createElement('span');
			jobFTElement[i].setAttribute('class','span-finish-time');
			jobFTElement[i].innerHTML = "<span>Finish Time:</span> " + timesheetObjArray[i].getJobFinishTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobFTElement[i]);

			// JOB DURATION ELEMENT
			jobDurationElement[i] = document.createElement('span');
			jobDurationElement[i].setAttribute('class','span-duration');
			//timesheetObjArray[i].setJobDurationTime(timesheetObjArray[i].getJobStartTime(),timesheetObjArray[i].getJobFinishTime());
			jobDurationElement[i].innerHTML = "<span>Duration:</span> " + timesheetObjArray[i].getJobDurationTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobDurationElement[i]);



		    // JOB CLIENT ELEMENT
			jobClientElement[i] = document.createElement('div');
			jobClientElement[i].setAttribute('class','col-md-3 span-client');
			jobClientElement[i].setAttribute('data-index',i);
			jobClientElement[i].id = i + "_tShowClient";
			jobClientElement[i].innerHTML = timesheetObjArray[i].getJobClient();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobClientElement[i]);

			// ADD ITEM EDIT BUTTON TO EACH
			  btnShowClient[i] = document.createElement('button');
			  btnShowClient[i].id = i + "_btnShowClient";
			  btnShowClient[i].innerHTML = "[SHOW" + i + "]";
			  btnShowClient[i].setAttribute('data-index',i);
				
				if (btnShowClient[i].addEventListener) {
		            btnShowClient[i].addEventListener("click", function(){ createJobListCustom(this,"client"); }, false);
		            jobClientElement[i].addEventListener("click", function(){ createJobListCustom(this,"client"); }, false);
		        } else {
		            btnShowClient[i].attachEvent('onclick', function(){ createJobListCustom(this,"client"); });
		            jobClientElement[i].attachEvent('onclick', function(){ createJobListCustom(this,"client"); });
		        }

				jobClientElement[i].appendChild(btnShowClient[i]);


			// JOB NUMBER ELEMENT
			jobNumberElement[i] = document.createElement('div');
			jobNumberElement[i].setAttribute('class','col-md-3 span-number');
			jobNumberElement[i].innerHTML = timesheetObjArray[i].getJobNumber();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobNumberElement[i]);

			// JOB REF ELEMENT
			jobRefElement[i] = document.createElement('div');
			jobRefElement[i].setAttribute('class','col-md-4-end span-ref');
			jobRefElement[i].innerHTML = timesheetObjArray[i].getJobRef();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobRefElement[i]);

			// ADD ICON WRAPPER
			//
			iconWrapElement[i] = document.createElement('div');
			iconWrapElement[i].setAttribute('class','iconWrapElement');
			// iconWrapElement[i].innerHTML = timesheetObjArray[i].getJobRef();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobRefElement[i].appendChild(iconWrapElement[i]);

			//console.log("timesheetObjArray[i].getActive() = " + timesheetObjArray[i].getActive());

			if(timesheetObjArray[i].getActive()){
			  	
			  	// CREATE BUTTON FOR PAY ALL
			  	btnSetState[i] = document.createElement('button');
				btnSetState[i].id = i + "_btnSetState";
				//btnSetState[i].innerHTML = "[X " + i + "]";
				btnSetState[i].setAttribute('data-index',i);
				btnSetState[i].setAttribute('class','control-btn btn-active-on');
				
				if (btnSetState[i].addEventListener) {
		            btnSetState[i].addEventListener("click", function(){ setState(this,show,false); }, false);
		        } else {
		            btnSetState[i].attachEvent('onclick', function(){ setState(this,show,false); });
		        }
				iconWrapElement[i].appendChild(btnSetState[i]);
			  	
			  }else{
			  		// CREATE BUTTON FOR PAY ALL
			  	btnSetState[i] = document.createElement('button');
				btnSetState[i].id = i + "_btnSetState";
				// btnSetState[i].innerHTML = "[X " + i + "]";
				btnSetState[i].setAttribute('data-index',i);
				btnSetState[i].setAttribute('class','control-btn btn-active-off');
				
				if (btnSetState[i].addEventListener) {
		            btnSetState[i].addEventListener("click", function(){ setState(this,show,true); }, false);
		        } else {
		            btnSetState[i].attachEvent('onclick', function(){ setState(this,show,true); });
		        }
				iconWrapElement[i].appendChild(btnSetState[i]);

			  }// end if(timesheetObjArray[i].getActive()){


			  // CREATE BUTTON FOR EDIT ITEM
			  	btnEditItem[i] = document.createElement('button');
				btnEditItem[i].id = i + "_btnEditItem";
				// btnDeleteItem[i].innerHTML = "[DELETE " + i + "]";
				btnEditItem[i].setAttribute('data-index',i);
				btnEditItem[i].setAttribute('data-toggle',"modal");
				btnEditItem[i].setAttribute('data-target',"#modal" + i);
				btnEditItem[i].setAttribute('class','control-btn btn-edit');
				
				if (btnEditItem[i].addEventListener) {
		            //btnEditValue[i].addEventListener("click", function(){ editValue(this,"all"); }, false);
		            btnEditItem[i].addEventListener("click", function(){ editItemForm(this,show); }, false);
		        } else {
		            btnEditItem[i].attachEvent('onclick', function(){ editItemForm(this,show); });
		        }
				iconWrapElement[i].appendChild(btnEditItem[i]);


			// CREATE BUTTON FOR DELETE ITEM
			  	btnDeleteItem[i] = document.createElement('button');
				btnDeleteItem[i].id = i + "_btnDeleteItem";
				// btnDeleteItem[i].innerHTML = "[DELETE " + i + "]";
				btnDeleteItem[i].setAttribute('data-index',i);
				btnDeleteItem[i].setAttribute('class','control-btn btn-delete');
				
				if (btnDeleteItem[i].addEventListener) {
		            //btnEditValue[i].addEventListener("click", function(){ editValue(this,"all"); }, false);
		            btnDeleteItem[i].addEventListener("click", function(){ deleteItem(this,show); }, false);
		        } else {
		            btnDeleteItem[i].attachEvent('onclick', function(){ deleteItem(this,show); });
		        }
				iconWrapElement[i].appendChild(btnDeleteItem[i]);
		  
		  // switch (show) {
		  //   case "payed":
		  //       if(timesheetObjArray[i].getPayed()){
		        	
				//   	budgetDebt[i] = document.createElement('div');
		  // 			budgetDebt[i].id = "job_wrap" + i;
		  			
		  // 			renderDebitListItem(budgetDebt[i],domElement,i,"payed");
				//   }
		  //       break; 
		  //   case "unpayed":
		  //       if(timesheetObjArray[i].getPayed()==false){
		        	
		  //       	budgetDebt[i] = document.createElement('div');
			 //  		budgetDebt[i].id = "job_wrap" + i;
			  		
			 //  		renderDebitListItem(budgetDebt[i],domElement,i,"unpayed");
				//   }
		  //       break; 
		  //   case "all":
		    
	   //      	budgetDebt[i] = document.createElement('div');
			 //  	budgetDebt[i].id = "job_wrap" + i;
			  	
			 //  	renderDebitListItem(budgetDebt[i],domElement,i,"all");
			  	
		  //       break; 
		  //   default: 
		  //       text = "default swith case";
		  // }// end switch (show) {
		  
		}// end for
			
	}// END function createDebitList(domElement,timesheetObjArray,show){

	// SHOW ONLY CLIENT JOB LIST FUNCTION
	function createJobListCustom(btnDomEl){

		console.log("this.dataset.index = " + btnDomEl.dataset.index);

		console.log("= createJobListCustom(btnDomEl) CALLED: this.dataset.index = " + btnDomEl.dataset.index);

		var testVal;

		 switch (switchVal) {
		    case "date":
		        testVal = timesheetObjArray[btnDomEl.dataset.index].getJobDate();

		        break; 
		    case "client":
		        testVal = timesheetObjArray[btnDomEl.dataset.index].getJobClient();

		        break; 
		    case "number":
		    	testVal = timesheetObjArray[btnDomEl.dataset.index].getJobNumber();
	        	
		        break; 
		    default: 
		        text = "default switch case";
		  }// end switch (show) {


		// var testClient = timesheetObjArray[btnDomEl.dataset.index].getJobClient();

		//console.log("testClient = " + testClient);

		//console.log(domElement);

		// HERE WE CLEAR THE MAIN DOM ELEMENT BEFORE RE INITIALISING OUR DEBT LIST
		domElement.innerHTML = "";
		
		viewTotal = 0;
		
		// HERE WE LOOP THROUGH ALL THE OBJECT ELEMENTS STORED IN OUR timesheetObjArray AND FILL OUR LAYOUT ARRAYS DECLARED ABOVE AND APPEND THEM TO THE PAGE; DEPENDING ON THE SHOW VARIABLE
		for (var i in timesheetObjArray) {

			console.log("timesheetObjArray[i].getJobClient() = " + timesheetObjArray[i].getJobClient())

			switch (switchVal) {
			    case "date":
			        var tmpVal = timesheetObjArray[i].getJobDate();

			        break; 
			    case "client":
			        var tmpVal = timesheetObjArray[i].getJobClient();

			        break; 
			    case "number":
		        	var tmpVal = timesheetObjArray[i].getJobNumber();
			        break; 
			    default: 
			        text = "default switch case";
			  }// end switch (show) {

			

			console.log("tmpClient = " + tmpVal);

			if(tmpVal===testVal){

			timesheetJob[i] = document.createElement('div');
		    timesheetJob[i].id = "job_wrap" + i;

		    timesheetJob[i].setAttribute('class','layout job_wrap');

		    domElement.appendChild(timesheetJob[i]);

		    // JOB DATE ELEMENT
			jobDateElement[i] = document.createElement('div');
			jobDateElement[i].setAttribute('class','col-md-2 span-client');
			jobDateElement[i].innerHTML = timesheetObjArray[i].getJobDate();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobDateElement[i]);


			// JOB START TIME ELEMENT
			jobSTElement[i] = document.createElement('span');
			jobSTElement[i].setAttribute('class','span-start-time');
			jobSTElement[i].innerHTML = timesheetObjArray[i].getJobStartTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobSTElement[i]);

			// JOB FINISH TIME ELEMENT
			jobFTElement[i] = document.createElement('span');
			jobFTElement[i].setAttribute('class','span-finish-time');
			jobFTElement[i].innerHTML = timesheetObjArray[i].getJobFinishTime();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobDateElement[i].appendChild(jobFTElement[i]);



		    // JOB CLIENT ELEMENT
			jobClientElement[i] = document.createElement('div');
			jobClientElement[i].setAttribute('class','col-md-3 span-client');
			jobClientElement[i].innerHTML = timesheetObjArray[i].getJobClient();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobClientElement[i]);

			// JOB NUMBER ELEMENT
			jobNumberElement[i] = document.createElement('div');
			jobNumberElement[i].setAttribute('class','col-md-3 span-number');
			jobNumberElement[i].innerHTML = timesheetObjArray[i].getJobNumber();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobNumberElement[i]);

			// JOB REF ELEMENT
			jobRefElement[i] = document.createElement('div');
			jobRefElement[i].setAttribute('class','col-md-4-end span-ref');
			jobRefElement[i].innerHTML = timesheetObjArray[i].getJobRef();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			timesheetJob[i].appendChild(jobRefElement[i]);


			// ADD ICON WRAPPER
			//
			iconWrapElement[i] = document.createElement('div');
			iconWrapElement[i].setAttribute('class','iconWrapElement');
			// iconWrapElement[i].innerHTML = timesheetObjArray[i].getJobRef();
			//debitNameElement[i].innerHTML = budgetDebtObjArray[i].name;
			jobRefElement[i].appendChild(iconWrapElement[i]);

			//console.log("timesheetObjArray[i].getActive() = " + timesheetObjArray[i].getActive());

			if(timesheetObjArray[i].getActive()){
			  	
			  	// CREATE BUTTON FOR PAY ALL
			  	btnSetState[i] = document.createElement('button');
				btnSetState[i].id = i + "_btnSetState";
				//btnSetState[i].innerHTML = "[X " + i + "]";
				btnSetState[i].setAttribute('data-index',i);
				btnSetState[i].setAttribute('class','control-btn btn-active-on');
				
				if (btnSetState[i].addEventListener) {
		            btnSetState[i].addEventListener("click", function(){ setState(this,show,false); }, false);
		        } else {
		            btnSetState[i].attachEvent('onclick', function(){ setState(this,show,false); });
		        }
				iconWrapElement[i].appendChild(btnSetState[i]);
			  	
			  }else{
			  		// CREATE BUTTON FOR PAY ALL
			  	btnSetState[i] = document.createElement('button');
				btnSetState[i].id = i + "_btnSetState";
				// btnSetState[i].innerHTML = "[X " + i + "]";
				btnSetState[i].setAttribute('data-index',i);
				btnSetState[i].setAttribute('class','control-btn btn-active-off');
				
				if (btnSetState[i].addEventListener) {
		            btnSetState[i].addEventListener("click", function(){ setState(this,show,true); }, false);
		        } else {
		            btnSetState[i].attachEvent('onclick', function(){ setState(this,show,true); });
		        }
				iconWrapElement[i].appendChild(btnSetState[i]);

			  }// end if(timesheetObjArray[i].getActive()){


			  // CREATE BUTTON FOR EDIT ITEM
			  	btnEditItem[i] = document.createElement('button');
				btnEditItem[i].id = i + "_btnEditItem";
				// btnDeleteItem[i].innerHTML = "[DELETE " + i + "]";
				btnEditItem[i].setAttribute('data-index',i);
				btnEditItem[i].setAttribute('data-toggle',"modal");
				btnEditItem[i].setAttribute('data-target',"#modal" + i);
				btnEditItem[i].setAttribute('class','control-btn btn-edit');
				
				if (btnEditItem[i].addEventListener) {
		            //btnEditValue[i].addEventListener("click", function(){ editValue(this,"all"); }, false);
		            btnEditItem[i].addEventListener("click", function(){ editItemForm(this,show); }, false);
		        } else {
		            btnEditItem[i].attachEvent('onclick', function(){ editItemForm(this,show); });
		        }
				iconWrapElement[i].appendChild(btnEditItem[i]);


			// CREATE BUTTON FOR DELETE ITEM
			  	btnDeleteItem[i] = document.createElement('button');
				btnDeleteItem[i].id = i + "_btnDeleteItem";
				// btnDeleteItem[i].innerHTML = "[DELETE " + i + "]";
				btnDeleteItem[i].setAttribute('data-index',i);
				btnDeleteItem[i].setAttribute('class','control-btn btn-delete');
				
				if (btnDeleteItem[i].addEventListener) {
		            //btnEditValue[i].addEventListener("click", function(){ editValue(this,"all"); }, false);
		            btnDeleteItem[i].addEventListener("click", function(){ deleteItem(this,show); }, false);
		        } else {
		            btnDeleteItem[i].attachEvent('onclick', function(){ deleteItem(this,show); });
		        }
				iconWrapElement[i].appendChild(btnDeleteItem[i]);


			
				
			}

			//timesheetObjArray[i].getJobClient();
		  
		}// end for
			
	}// END function createJobListCustom(showclient){

	function renderJobListItem(obj,domElement,i,show){
		console.log('no way');


	}// end function renderDebitListItem(obj,domElement,i,show){


	var prevEditItemParent;
    var curEditItemParent;
    var tempForm;
    	
    function editItemForm(btnDomEl,show) {
		
		console.log("curEditItemParent = " + curEditItemParent);
		
		if (curEditItemParent === undefined) {
			console.log("undefined");
			curEditItemParent = document.getElementById("job_wrap"+btnDomEl.dataset.index);
			
			createEditItemForm (btnDomEl);
			
			prevEditItemParent = document.getElementById("job_wrap"+btnDomEl.dataset.index);
			
			
		} else {
			
			curEditItemParent = document.getElementById("job_wrap"+btnDomEl.dataset.index);
			
			if(curEditItemParent===prevEditItemParent){
				console.log('curEditItemParent===prevEditItemParent');
				
				if(editing){
					prevEditItemParent.removeChild( tempForm );
					editing=false;
				}else{
					
					createEditItemForm (btnDomEl);
					
				}
				
				
			}else{
				console.log('NOT curEditItemParent===prevEditItemParent');
				
				if(editing){
					prevEditItemParent.removeChild( tempForm );
					
					createEditItemForm (btnDomEl);
					
					prevEditItemParent = document.getElementById("job_wrap"+btnDomEl.dataset.index);
					//editing=false;
				}else{
					
					console.log('BOOOOOOOM');
					
					createEditItemForm (btnDomEl);
					
					prevEditItemParent = document.getElementById("job_wrap"+btnDomEl.dataset.index);
				
				}// end if(editing){
			}
		}// end if (curEditItemParent === undefined) {
			
	}// end function editValueForm(btnDomEl) {

function createEditItemForm (btnDomEl) {

	console.log("btnDomEl.dataset.index = " + btnDomEl.dataset.index);

		// CREATE/OPEN TEMP FORM MODAL WRAPPER
		tempFormWrap = document.createElement('div');

		tempFormWrap.setAttribute('class',"modal fade");
		tempFormWrap.setAttribute('id',"modal" + btnDomEl.dataset.index);
		tempFormWrap.setAttribute('tabindex','-1');

		curEditItemParent.appendChild(tempFormWrap);
	  
	  // CREATE/OPEN TEMP ITEM EDIT FORM
		tempForm = document.createElement('div');
		
		tempForm.name='myForm';
		
		tempForm.id = "form_edit_item";


		var my_tbDate=document.createElement('INPUT');
		my_tbDate.type='DATE';
		my_tbDate.name='myinputdate';
		//my_tbDate.value='Date';
		my_tbDate.value=timesheetObjArray[btnDomEl.dataset.index].getJobDate();


		my_tbDate.setAttribute('id',"textboxDateadd" + btnDomEl.dataset.index);
		my_tbDate.setAttribute('datepicker-popup',null);
		tempForm.appendChild(my_tbDate);

		var my_tbClient=document.createElement('INPUT');
		my_tbClient.type='TEXT';
		my_tbClient.name='myinputclient';
		//my_tbClient.value='Client';
		my_tbClient.value=timesheetObjArray[btnDomEl.dataset.index].getJobClient();
		my_tbClient.setAttribute('id',"textboxClientadd" + btnDomEl.dataset.index);
		tempForm.appendChild(my_tbClient);

		var my_tbRef=document.createElement('INPUT');
		my_tbRef.type='TEXT';
		my_tbRef.name='myinputref';
		//my_tbRef.value='Ref';
		my_tbRef.value=timesheetObjArray[btnDomEl.dataset.index].getJobRef();
		my_tbRef.setAttribute('id',"textboxRefadd" + btnDomEl.dataset.index);
		tempForm.appendChild(my_tbRef);

		var my_tbNumber=document.createElement('INPUT');
		my_tbNumber.type='TEXT';
		my_tbNumber.name='myinputnumber';
		//my_tbNumber.value='Number';
		my_tbNumber.value=timesheetObjArray[btnDomEl.dataset.index].getJobNumber();
		my_tbNumber.setAttribute('id',"textboxNumberadd" + btnDomEl.dataset.index);
		tempForm.appendChild(my_tbNumber);

		var my_tbSt=document.createElement('INPUT');
		my_tbSt.type='TEXT';
		my_tbSt.name='myinputst';
		//my_tbSt.value='Start Time';
		my_tbSt.value=timesheetObjArray[btnDomEl.dataset.index].getJobStartTime();
		my_tbSt.setAttribute('id',"textboxJobStartadd" + btnDomEl.dataset.index);
		my_tbSt.setAttribute('class','time');
		tempForm.appendChild(my_tbSt);

		var my_tbFt=document.createElement('INPUT');
		my_tbFt.type='TEXT';
		my_tbFt.name='myinputft';
		//my_tbFt.value='Finish Time';
		my_tbFt.value=timesheetObjArray[btnDomEl.dataset.index].getJobFinishTime();
		my_tbFt.setAttribute('id',"textboxJobFinishadd" + btnDomEl.dataset.index);
		my_tbFt.setAttribute('class','time');
		tempForm.appendChild(my_tbFt);

		
		// my_tbSt.setAttributes({
		//     'id':'textboxJobStartadd' + btnDomEl.dataset.index,
		//     'class':'time',
		//     'styles':{
		//         'backgroundColor':'blue',
		//         'color':'red'
		//     },
		// });


		var my_submit = document.createElement('button');
		my_submit.id = "submit";
		my_submit.innerHTML = "[SUBMIT" + btnDomEl.dataset.index + "]";
		my_submit.setAttribute('data-form',btnDomEl.dataset.index);
		my_submit.setAttribute('data-dismiss','modal');
		tempForm.appendChild(my_submit);
		
		if (my_submit.addEventListener) {
	        //btnEditValue[i].addEventListener("click", function(){ editValue(this,"all"); }, false);
	        my_submit.addEventListener("click", function(){ editItemFormSubmit(this,show); }, false);
	    } else {
	        my_submit.attachEvent('onclick', function(){ editItemFormSubmit(this,show); });
	    }
		
		tempFormWrap.appendChild(tempForm);


		// 
		$('#modal' + btnDomEl.dataset.index).on('hidden.bs.modal', function (e) {
		  // do something...
		  console.log('e= ' + e);
		  console.log(e);

		  console.log('curEditItemParent = ' + curEditItemParent);
		  console.log(curEditItemParent);

		  curEditItemParent.removeChild(tempFormWrap);

		  editing=false;

		});
		
		editing=true;
		// END CREATE/OPEN TEMP ITEM EDIT FORM
	}// end function createEditItemForm () {

function editItemFormSubmit(btnDomEl,show) {
		
		//console.log('this is submit bitton for form ' + btnDomEl.dataset.form);
		
		var tmpDateForm = document.getElementById("textboxDateadd" + btnDomEl.dataset.form);
		var tmpDate = tmpDateForm.value;
		console.log("textbox DATE = " + tmpDate);
		
		timesheetObjArray[btnDomEl.dataset.form].setJobDate(tmpDate);
		//timesheetObjArray[btnDomEl.dataset.form].getJobDate();
		
		console.log("timesheetObjStore[btnDomEl.dataset.form].date = " + timesheetObjStore[btnDomEl.dataset.form].date);
		
		timesheetObjStore[btnDomEl.dataset.form].date = timesheetObjArray[btnDomEl.dataset.form].getJobDate();
		
		console.log("timesheetObjStore[btnDomEl.dataset.form].date second = " + timesheetObjStore[btnDomEl.dataset.form].date);

		// set JOB CLIENT
		var tmpClientForm = document.getElementById("textboxClientadd" + btnDomEl.dataset.form);
		var tmpClient = tmpClientForm.value;
		console.log("textbox CLIENT = " + tmpClient);
		timesheetObjArray[btnDomEl.dataset.form].setJobClient(tmpClient);
		timesheetObjStore[btnDomEl.dataset.form].client = timesheetObjArray[btnDomEl.dataset.form].getJobClient();

		// set JOB REF
		var tmpRefForm = document.getElementById("textboxRefadd" + btnDomEl.dataset.form);
		var tmpRef = tmpRefForm.value;
		console.log("textbox REF = " + tmpRef);
		timesheetObjArray[btnDomEl.dataset.form].setJobRef(tmpRef);
		timesheetObjStore[btnDomEl.dataset.form].ref = timesheetObjArray[btnDomEl.dataset.form].getJobRef();

		// set JOB NUMBER
		var tmpNumberForm = document.getElementById("textboxNumberadd" + btnDomEl.dataset.form);
		var tmpNumber = tmpNumberForm.value;
		console.log("textbox Number = " + tmpNumber);
		timesheetObjArray[btnDomEl.dataset.form].setJobNumber(tmpNumber);
		timesheetObjStore[btnDomEl.dataset.form].number = timesheetObjArray[btnDomEl.dataset.form].getJobNumber();

		console.log("timesheetObjArray[btnDomEl.dataset.form].getJobNumber() = " + timesheetObjArray[btnDomEl.dataset.form].getJobNumber());

		// set JOB Start Time
		var tmpSTForm = document.getElementById("textboxJobStartadd" + btnDomEl.dataset.form);
		var tmpST = tmpSTForm.value;
		console.log("textbox ST = " + tmpST);

		timesheetObjArray[btnDomEl.dataset.form].setJobStartTime(tmpST);

		timesheetObjStore[btnDomEl.dataset.form].jobstart = timesheetObjArray[btnDomEl.dataset.form].getJobStartTime();

		console.log("timesheetObjArray[btnDomEl.dataset.form].getJobStartTime() = " + timesheetObjArray[btnDomEl.dataset.form].getJobStartTime());

		console.log("timesheetObjStore[btnDomEl.dataset.form].jobstart = " + timesheetObjStore[btnDomEl.dataset.form].jobstart);

		// set JOB Finish Time
		var tmpFTForm = document.getElementById("textboxJobFinishadd" + btnDomEl.dataset.form);
		var tmpFT = tmpFTForm.value;
		console.log("textbox FT = " + tmpFT);
		timesheetObjArray[btnDomEl.dataset.form].setJobFinishTime(tmpFT);

		timesheetObjStore[btnDomEl.dataset.form].jobfinish = timesheetObjArray[btnDomEl.dataset.form].getJobFinishTime();

		timesheetObjArray[btnDomEl.dataset.form].setJobDurationTime(tmpST, tmpFT);



		
		localStorage.setItem('jobsObject', JSON.stringify(timesheetObjStore));
		// REGET LOCAL STORAGE
		//retrievedObject = localStorage.getItem('testObject');
		
		//retrievedObjectPassed = JSON.parse(retrievedObject);
        
        // RE INITIALISE MAIN APP
        //BudgetMain.createApp("budgetId", "budget_holder","This Is New Topay App", retrievedObjectPassed, show);
        createJobList(show);
        
        editing=false;
		
	}// end function editValueForm(btnDomEl) {


function deleteItem(btnDomEl,show,bool) {
		console.log("this.dataset.index = " + btnDomEl.dataset.index);
		
		timesheetObjArray.splice(btnDomEl.dataset.index, 1);
		timesheetObjStore.splice(btnDomEl.dataset.index, 1);
		
		// RESET LOCAL STORAGE
		localStorage.setItem('jobsObject', JSON.stringify(timesheetObjStore));
        
        // RE INITIALISE createDebitList
        createJobList(show);
		
}// end function editPay(btnDomEl,show,bool) {

function setState(btnDomEl,show,bool) {
			// //console.log("objDebt= " + budgetDebtObjArray[btnDomEl.dataset.index].name);
			console.log("this.dataset.index = " + btnDomEl.dataset.index);
			//budgetDebtObjArray[btnDomEl.dataset.index].getPayed();
			
			timesheetObjArray[btnDomEl.dataset.index].setActive(bool);
			
			//budgetDebtObjArray[btnDomEl.dataset.index].getPayed();
			//console.log("budgetDebtObjStore[btnDomEl.dataset.index].payed = " + budgetDebtObjStore[btnDomEl.dataset.index].payed);
			
			timesheetObjStore[btnDomEl.dataset.index].active = timesheetObjArray[btnDomEl.dataset.index].getActive();

			for (var i in timesheetObjStore) {
				console.log("i = " + i);
			}

			
			// RESET LOCAL STORAGE
			localStorage.setItem('jobsObject', JSON.stringify(timesheetObjStore));

	        createJobList(show);
			
    }// end function editPay(btnDomEl,show,bool) {

function SortByClient(client) {
  //return ((x.client == y.client) ? 0 : ((x.client > y.client) ? 1 : -1 ));

  console.log(this);

  return client;
}

     /**
 * Generic array sorting
 *
 * @param property
 * @returns {Function}
 */
var sortByProperty = function (property) {
    return function (x, y) {

    	console.log(x[property]);

        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

// CREATE FILTERED JOB LIST FUNCTION
function createJobListFilter(show){



	console.log("--- function createJobListFilter(show) CALLED =" + retrievedObjectPassed);

	console.log(show);


	// HERE retrievedObjectPassed IS SET SORTED
    retrievedObjectPassed.sort(sortByProperty(show));

    console.log("--- retrievedObjectPassed.sort(SortByClient()); CALLED");

    for(var n=0;n<retrievedObjectPassed.length;n++){
      console.log(retrievedObjectPassed[n].client + ' ' + retrievedObjectPassed[n].number + '<br>');
    }

    createApp("timesheet_holder", retrievedObjectPassed, "all");

	
}// END function createDebitList(domElement,timesheetObjArray,show){

	




	function showClient(btnDomEl) {

		console.log("this.dataset.index = " + btnDomEl.dataset.index);

		console.log("client = " + client);
		
	}// end function editValueForm(btnDomEl) {


	function addJobItem(date,client,ref,number,jobstart,jobfinish) {

		
		
		console.log("addJobItem CALLED and client = " + client + " and ref = " + ref + " and number = " + number + " and date = " + date + " jobstart = " + jobstart + " jobfinish = " + jobfinish );

		// console.log("RetrievedObjectPassed = " + timesheetObjArray);

		// console.log("RetrievedObjectPassed = " + timesheetObjArray + ". and length = " + timesheetObjArray.length);

		// console.log(timesheetObjArray.length);

		//jobsPassed = JSON.parse(jobsList);

		//console.log(jobsPassed);
		
		// var tempPos = parseInt(timesheetObjArray.length+1);

		// console.log('tempPos = ' + tempPos);

		timesheetObjArray.push(new JobObject(date,client,ref,number,jobstart,jobfinish,true));

		for (var i in timesheetObjArray) {

			console.log("timesheetObjArray[i].name = " + timesheetObjArray[i].getJobClient());

		};

		timesheetObjStore.push({
		  date: timesheetObjArray[i].getJobDate(),
	      client: timesheetObjArray[i].getJobClient(), 
	      ref: timesheetObjArray[i].getJobRef(), 
	      number: timesheetObjArray[i].getJobNumber(), 
	      jobstart: timesheetObjArray[i].getJobStartTime(), 
	      jobfinish: timesheetObjArray[i].getJobFinishTime(),
	      active: true
	    });

		//console.log(JSON.parse(timesheetObjArray));

		console.log(JSON.stringify(timesheetObjArray));

		console.log(JSON.stringify(timesheetObjStore));

		// for (i = 0; i < timesheetObjArray.length; i++) { 
		//     console.log('storage name ================ ' + timesheetObjArray[i].getJobClient());

		//     // timesheetObjArray.push({ 
		//     //   client: timesheetObjArray[i].client, 
		//     //   ref: timesheetObjArray[i].ref, 
		//     //   number: timesheetObjArray[i].number
		//     // });

		// }

		// console.log("timesheetObjArray 1 = ");
		// console.log(timesheetObjArray);



		

		//timesheetObjArray.push({ new JobObject(client,ref,number)});
		
		
		// timesheetObjArray.push({ 
	 //      client: client, 
	 //      ref: ref, 
	 //      number: number
	 //    });

		// console.log("timesheetObjArray 2 = ");
		// console.log(timesheetObjArray.length);

		// console.log(JSON.stringify(timesheetObjArray));
		
		localStorage.setItem('jobsObject', JSON.stringify(timesheetObjStore));




		//localStorage.setItem('testObject', JSON.stringify(budgetDebtObjStore));

		// console.log("timesheetObjArray 3 = ");
		// console.log(timesheetObjArray);
		
		//createDebitList("all");
		createJobList("all");
		
	}
    	
	
	
	////////////// Public methods ///////////////////////////////////////////	
	return{
		
		createApp:function(domId, jobsList, show){
			createApp(domId, jobsList, show);
		},
		addJobItem:function(date,client,ref,number,jobstart,jobfinish){
			addJobItem(date,client,ref,number,jobstart,jobfinish);
		},
		createJobListFilter:function(show){
			createJobListFilter(show);
		},
		createJobFilter:function(filterVal){
			createJobFilter(filterVal);
		}
		
	};// end return object
	
});// end var BudgetMain = BudgetMain || (function(budgetId,domId,budgetTitle,jobsList,show){


