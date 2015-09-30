function PayeeObject (theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
}// end function User

// HERE WE ARE OVERWRITING THE PROTOTYPE PROPERTY WITH AN OBJECT LITERAL. AND WE DEFINE ALL OF OUR METHODS (THAT WILL BE INHERITED BY ALL PayeeObject INSTANCES) IN THIS OBJECT.
PayeeObject.prototype = {
	
    constructor: PayeeObject,
    
    // saveScore:function (theScoreToAdd)  {
        // this.quizScores.push(theScoreToAdd);
    // },
    
    showName:function ()  {
        //var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        console.log("Name = " + this.name);
        return this.name;
    },
    showEmail:function ()  {
        //var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        console.log("Email = " + this.email);
        return this.email;
    },
    
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        console.log("New Email Saved: " + this.emai);
        return "New Email Saved: " + this.email;
    }
    
};// end PayeeObject.prototype


// The next function we will use for inheritance is the inheritPrototype function.
// This function succinctly implements the parasitic combination inheritance for us.
// We pass in the parent object (or Super Class) and the child object (or Sub Class),
// and the function does the parasitic combination inheritance: makes the child object inherits from the parent object.

function inheritPrototype(childObject, parentObject) {
	
    // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject​
	// So the copyOfParent object now has everything the parentObject has ​
    var copyOfParent = Object.create(parentObject.prototype);

	//Then we set the constructor of this new object to point to the childObject.​
	// Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.
	copyOfParent.constructor = childObject;

    // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)​
  	childObject.prototype = copyOfParent;
}



// The DebitObject function is the parent for all other DebitObject objects;​
// All DebitObject objects will inherit from this DebitObject constructor​

function DebitObject( debitName, value, payed, category, callback ) {
	//console.log("debit object domId = " + domId);
    // Initialize the instance properties
    this.name = debitName;
    
    //this.endDate = endDate;
    this.value = value;
    this.payed = payed;
    this.category = category;

    // this.domElement = document.getElementById(domId);
    // console.log("domElement = " + this.domElement);

    // private properties: these cannot be changed by instances
    var newDate = new Date(),
    // Constant variable: available to all instances through the instance method below. This is also a private property.
    DEBIT_CREATED_DATE = newDate.toLocaleDateString();
    
	// This is the only way to access the private QUIZ_CREATED_DATE variable ​
	// This is an example of a privilege method: it can access private properties and it can be called publicly
	this.startDate = DEBIT_CREATED_DATE;
	// A confirmation message that the question was created​
	//console.log("DEBIT:" + this.name + " DEBIT_CREATED_DATE" + this.startDate);
	
   // this.getQuizDate = function () {
   		// console.log("QUIZ_CREATED_DATE" + QUIZ_CREATED_DATE);
        // return QUIZ_CREATED_DATE;
   // };
    //console.log("Quiz Created On: " + this.getQuizDate());
} // end function DebitObject(debitName, value, domId, callback)

// Define the prototype methods that will be inherited​
DebitObject.prototype.getDebitName = function () {
	console.log("DebitObject.prototype.getDebitName method called and = " + this.name);
    return this.name;
};

DebitObject.prototype.getValue = function () {
	//console.log("DebitObject.prototype.getValue method called and  = " + this.value);
    return this.value;
};

// DEFINE setValue = function
DebitObject.prototype.setValue = function (sum) {
	console.log("DebitObject.prototype.setValue method called and = " + this.value);
	this.value = this.value - parseInt(sum);
	
	if(this.value<=0){
		this.payed = true;
	}
	
	console.log("DebitObject.prototype.setValue method called and = " + this.value);
	
    return this.value;
};// END DebitObject.prototype.setValue = function (sum) {

DebitObject.prototype.getDate = function () {
	//console.log("DebitObject.prototype.getDate method called and = " + this.startDate);
    return this.startDate;
};

DebitObject.prototype.setPayed = function (payedBool) {
	console.log("DebitObject.prototype.setPayed method called and = " + this.payed);
	this.payed = payedBool;
	console.log("DebitObject.prototype.setPayed method called and = " + this.payed);
    return this.payed;
};