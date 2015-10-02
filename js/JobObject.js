var JobObject = JobObject || function(jobDate, jobClient, jobRef, jobNumber, jobStartTime, jobFinishTime, jobActive, callback){
	
	console.log('JobObject called');

	// console.log('jobClient + ' + jobClient);
	console.log('jobStartTime + ' + jobStartTime);
	console.log('jobFinishTime + ' + jobFinishTime);
	
	var jobDate = jobDate;
	var client = jobClient;
    var ref = jobRef;
    var number = jobNumber;
    var startTime = jobStartTime;
    var finishTime = jobFinishTime;
    var duration = _jobDurationCalc(startTime, finishTime);
    var active = jobActive;
    
    //console.log('DebitObject called and name = ' + name);
    //console.log('DebitObject called and value = ' + value);
	
	var newDate = new Date();

    JOB_CREATED_DATE = newDate.toLocaleDateString();

	var startDate = JOB_CREATED_DATE;
	
	function _getJobClient () {
		////console.log("DebitObject.getDebitNammmme method called and = " + name);
	    return client;
	};
	
	function _setJobClient (newclientVal) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		client = newclientVal;
		//console.log("DebitObject.prototype.settPayed method called and = " + payed);
	    return client;
	};

	// REFERENCE STUFF
	function _getJobRef () {
		////console.log("DebitObject.getDebitNammmme method called and = " + name);
	    return ref;
	};

	function _setJobRef (newrefVal) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		ref = newrefVal;
		//console.log("DebitObject.prototype.settPayed method called and = " + payed);
	    return ref;
	};

	// JOB NUMBER STUFF
	
	function _getJobNumber () {
		//console.log("JobObject.prototype._getJobNumber method called and  = " + value);
	    return number;
	};

	function _setJobNumber (newnumberVal) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		number = newnumberVal;
		//console.log("DebitObject.prototype.settPayed method called and = " + payed);
	    return number;
	};
	
	// JOB Start time STUFF
	function _getJobStartTime () {
		////console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
	    return startTime;
	};

	function _setJobStartTime (newSTVal) {
		//console.log("_setJobStartTime called: newSTVal " + newSTVal + " & startTime = " + startTime);
		startTime = newSTVal;
		//console.log("_setJobStartTime called: newSTVal " + newSTVal + " & startTime = " + startTime);
	    return startTime;
	};

	// JOB Finish time STUFF
	function _getJobFinishTime () {
		////console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
	    return finishTime;
	};

	function _setJobFinishTime (newFTVal) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		finishTime = newFTVal;
		//console.log("DebitObject.prototype.settPayed method called and = " + payed);
	    return finishTime;
	};

	// JOB DURATION time STUFF
	function _getJobDurationTime () {
		////console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
	    return duration;
	};

	function _setJobDurationTime (start,finish) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		//jobDurationCalc (start, finish)

		//console.log("start = " + start);
		//console.log("finish = " + finish);

		//console.log("duration 1 = " + duration);

		duration = _jobDurationCalc (start, finish);
		
		//console.log("duration 2 = " + duration);
	    
	    return duration;
	};

	function _getActive () {
		//console.log("DebitObject.prototype._getPayyed method called and  = " + payed);
	    return active;
	};

	function _setActive (activeBool) {
		//console.log("activeBool = " + activeBool);
		//console.log("DebitObject.prototype.settttPayed method called and = " + active);
		active = activeBool;
		//console.log("DebitObject.prototype.settPayed method called and = " + active);
	    return active;
	};

	// JOB DATE STUFF
	function _getJobDate () {
		////console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
	    return jobDate;
	};

	function _setJobDate (newdateVal) {
		////console.log("DebitObject.prototype.settttPayed method called and = " + payed);
		jobDate = newdateVal;
		//console.log("DebitObject.prototype.settPayed method called and = " + payed);
	    return jobDate;
	};
		
	function _getDate () {
		////console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
	    return startDate;
	};


console.log('JobObject called 1');


	// DURATION FUNCTION
	function _jobDurationCalc (start, finish) {

        console.log("jobDuration = function(start, finish) { CALLED");

        var time1 = start;

        var time2 = finish;


        var time1Sliced = time1.slice(-2);
        var time2Sliced = time2.slice(-2);

        // console.log("time1Sliced = " + time1Sliced);
        // console.log("time2Sliced = " + time2Sliced);

        time1=time1.slice(0,-2); //slice off last two characters here
        time2=time2.slice(0,-2); //slice off last two characters here



        var time1Split = time1.split(':');
        var time2Split = time2.split(':');

        var hours1 = parseInt(time1Split[0], 10), 
            hours2 = parseInt(time2Split[0], 10),
            mins1 = parseInt(time1Split[1], 10),
            mins2 = parseInt(time2Split[1], 10);

        //console.log("hours1 = " + hours1 + ": hours2 = " + hours2);

        if(time1Sliced==="am"){
            //console.log('time1Sliced==am');

        }else{
            //console.log('time1Sliced==pm');

            if(hours1===12){

            }else{
                hours1 = hours1+12;
            }
            
        }

        if(time2Sliced==="am"){
            //console.log('time2Sliced==am');

        }else{
            //console.log('time2Sliced==pm');

            if(hours2===12){

            }else{
                hours2 = hours2+12;
            }
        }

        //console.log("hours1 = " + hours1 + ": hours2 = " + hours2);

        var hours = hours2 - hours1, mins = 0;

        if(hours < 0) hours = 24 + hours;

        if(mins2 >= mins1) {
            mins = mins2 - mins1;
        } else {
            mins = (mins2 + 60) - mins1;
            hours--;
        }

        mins = mins / 60; // take percentage in 60

        hours += mins;

        hours = hours.toFixed(2);

        // console.log("time1 = " + time1);
        // console.log("time2 = " + time2);

        // console.log("hours1 = " + hours1);
        // console.log("hours2 = " + hours2);

         console.log("hours = " + hours);

        duration = hours;

        return duration;

    };// END jobDuration = function() {
	
	
console.log('JobObject called 2');

	////////////// Public methods ///////////////////////////////////////////	
	return{
		
		getJobDate:_getJobDate,

		setJobDate:function(newdateVal){
			_setJobDate(newdateVal);
		},

		getJobClient:_getJobClient,

		setJobClient:function(newclientVal){
			_setJobClient(newclientVal);
		},

		getJobRef:_getJobRef,

		setJobRef:function(newrefVal){
			_setJobRef(newrefVal);
		},

		getJobNumber:_getJobNumber,

		setJobNumber:function(newnumberVal){
			_setJobNumber(newnumberVal);
		},

		getJobStartTime:_getJobStartTime,

		setJobStartTime:function(newSTVal){
			_setJobStartTime(newSTVal);
		},

		getJobFinishTime:_getJobFinishTime,

		setJobFinishTime:function(newFTVal){
			_setJobFinishTime(newFTVal);
		},

		getJobDurationTime:_getJobDurationTime,

		setJobDurationTime:function(start, finish){
			_setJobDurationTime(start, finish);
		},

		getActive:_getActive,

		setActive:function(activeBool){
			_setActive(activeBool);
		},
		
		getDate:function(){
			_getDate();
		}
		
	};// end return object
};