function User (theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
    this.quizScores = [];
    this.currentScore = 0;
}// end function User

// HERE WE ARE OVERWRITING THE PROTOTYPE PROPERTY WITH AN OBJECT LITERAL. AND WE DEFINE ALL OF OUR METHODS (THAT WILL BE INHERITED BY ALL USER INSTANCES) IN THIS OBJECT.
User.prototype = {
	
    constructor: User,
    
    saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd);
    },
    
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        console.log(this.name + " Scores: " + scores);
        return this.name + " Scores: " + scores;
    },
    
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        console.log("New Email Saved: " + this.emai);
        return "New Email Saved: " + this.email;
    }
    
};// end User.prototype


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



// The Question function is the parent for all other question objects;​
// All question objects will inherit from this Question constructor​

function Question(theQuestion, theChoices, theCorrectAnswer) {
    // Initialize the instance properties
    this.question = theQuestion;
    this.choices = theChoices;
    this.correctAnswer = theCorrectAnswer;
    this.userAnswer = "";

    // private properties: these cannot be changed by instances
    var newDate = new Date(),
    // Constant variable: available to all instances through the instance method below. This is also a private property.
    QUIZ_CREATED_DATE = newDate.toLocaleDateString();
    
// This is the only way to access the private QUIZ_CREATED_DATE variable ​
// This is an example of a privilege method: it can access private properties and it can be called publicly
   this.getQuizDate = function () {
   		console.log("QUIZ_CREATED_DATE" + QUIZ_CREATED_DATE);
        return QUIZ_CREATED_DATE;
   };
   
// A confirmation message that the question was created​
    console.log("Quiz Created On: " + this.getQuizDate());

} // end function Question(theQuestion, theChoices, theCorrectAnswer)

// Define the prototype methods that will be inherited​
Question.prototype.getCorrectAnswer = function () {
    return this.correctAnswer;
};

Question.prototype.getUserAnswer = function () {
    return this.userAnswer;
};

Question.prototype.displayQuestion = function () {
    var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>";
        choiceCounter = 0;

    this.choices.forEach(function (eachChoice)  {
        questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
        choiceCounter++;
    });
    questionToDisplay += "</ul>";

    console.log (questionToDisplay);

};// end Question.prototype.displayQuestion = function ()

// Create the MultipleChoiceQuestion​
function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer){
// For MultipleChoiceQuestion to properly inherit from Question, here inside the MultipleChoiceQuestion constructor, we have to explicitly CALL the Question constructor
// passing MultipleChoiceQuestion as the this object, and the parameters we want to use in the Question constructor:
    Question.call(this, theQuestion, theChoices, theCorrectAnswer);
};

// inherit the methods and properties from Question
inheritPrototype(MultipleChoiceQuestion, Question);

// Create the DragDropQuestion
function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
    Question.call(this, theQuestion, theChoices, theCorrectAnswer);
}

// inherit the methods and properties from Question
inheritPrototype(DragDropQuestion, Question);


// Override the displayQuestion method it inherited​
DragDropQuestion.prototype.displayQuestion = function () {
    // Just return the question. Drag and Drop implementation detail is beyond this article​
    console.log(this.question);
};


// Initialize some questions and add them to an array
var allQuestions = [
new MultipleChoiceQuestion("Who is Prime Minister of England?", ["Obama", "Blair", "Brown", "Cameron"], 3),
   
new MultipleChoiceQuestion("What is the Capital of Brazil?", ["São Paulo", "Rio de Janeiro", "Brasília"], 2),
   
new DragDropQuestion("Drag the correct City to the world map.", ["Washington, DC", "Rio de Janeiro", "Stockholm"], 0)
];

// Display all the questions​
allQuestions.forEach(function (eachQuestion)  {
    eachQuestion.displayQuestion();
});

//Use of the for/in loop to access the properties in the an object
// for (var eachItem in allQuestions) {
	// console.log("eachItem = " + eachItem);
// }

JSON.stringify (allQuestions, null, 4);


