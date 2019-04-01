var mongoose = require('mongoose'),
    config = require('./config');

    var Schema = mongoose.Schema,
    User = require('./listingSchema.js');

mongoose.connect(config.db.uri);

/********************************************************/

    var time = [];

    var mentorAvailable = false;
    var matchingTopics = []; //what topics match?
    var match = true; //is mentee and mentor a match?
    var cityMatch = false; //does the city match?
    //var online = true;
    //var inPerson = true;
    var matchingComm = []; //what communication preferences match?
    
    //mentee variables
    var menteeTopics = [];
    var menteeHours = [];
    var menteeCity;
    var menteeComm = [];
    var menteeUsername;

    //mentor variables
    var mentorTopics = []
    var mentorHours = [];
    var mentorCity;
    var mentorComm = [];
    var mentorUsername; 
	
/***********************************************************/
getUsers(complete);
//algorithm(complete);

function complete(){
    console.log('----------------------');
	console.log('done updating global variables');
	//console.log('Mentor topics are', mentorTopics);
    //console.log('Mentee topics are', menteeTopics);
    console.log('----------------------');
	
	/***************************/
	//begin algorithm
	var count = 0; //topic array incrementor

	//check if mentor is available
	//console.log('is mentor available', mentorAvailable);
	if (mentorAvailable != true) {
		match = false;
	} else { //mentor is available, check if topics match
		//console.log('mentor is available');
		for (var i = 0; i < menteeTopics.length; i++) {
			for (var j = 0; j < mentorTopics.length; j++) {
				if (mentorTopics[j] == menteeTopics[i]) {
					//update matchingTopics with mentees topic
					//console.log('mentee topics that match with mentor:', menteeTopics[i]);
                    matchingTopics[count] = menteeTopics[i];
					count++;
                }
                //console.log('out if statement');
			}
        } //check if matchingTopics is empty, if so, its not a match
        //console.log('out of the for loops');
		if (matchingTopics[0] === undefined) {
			match = false;
			//break;
        }
        //console.log('matchingTopics arent null');
	}
    //console.log('next');
	
	//var time = [];
	var timeCount = 0;
	//match hours
	for (var i = 0; i < menteeHours.length; i++) {
		for (var j = 0; j < mentorHours.length; j++) {

			//take string and store words into array
			var splitMentor = mentorHours[j].split(" ");
			var mentorHour1 = splitMentor[0];
			var mentorHour2 = splitMentor[2];

			var splitMentee = menteeHours[i].split(" ");
			var menteeHour1 = splitMentee[0];
			var menteeHour2 = splitMentee[2];

			//check and compare if mentee hours match with mentors hours
			//example: menteeHour1 = 4:00, menteeHour2 = 5:00
			//          mentorHour1 = 5:00, mentorHour2 = 7:00
			//if mentee beginning time is greater than or equal to mentor ending time OR
			//if mentee ending time is less than or equal to mentor starting time then they can never meet
			if (menteeHour1 >= mentorHour2 || menteeHour2 <= mentorHour1) {
				time[timeCount] = false;
			} else {
				time[timeCount] = true;
			}
			timeCount++;

		}
    }

	var falsecount = 0;
    //look in time array to see if any of the times has true (mentor and mentee times matched at one point)
	for (var i = 0; i < time.length; i++) {
		if (time[i] == false) {
			falsecount++;
		}
    }
    //if all the mentor times don't match with mentee, then its not match
	if(falsecount == time.length){
		match = false;
    }

	//check if mentor is in the same city as mentee
	if (menteeCity == mentorCity) {
        cityMatch = true;
    }

    //check if communication is inperson or online
    
	commCount = 0;
	//check if communication matches
	for (var i = 0; i < menteeComm.length; i++) {
		for (var j = 0; j < mentorComm.length; j++) {
			if (menteeComm[j] == mentorComm[i]) {
				//update what communications match with mentor and mentee
				matchingComm[commCount] = menteeComm[i];
				commCount++;
			}
		}
	}

	/**********************************end algorithm*****/
    
    //begin printing stuff
    if(match == true){
        console.log('You match with', mentorUsername,'!');
        console.log('');
    
        //print the topics mentor and mentee matches in
        console.log(mentorUsername, 'mentors in the following topics:', matchingTopics);
        console.log('');
    
        //print times mentor is available
        console.log(mentorUsername, 'is available at these times:')
        for(var i = 0; i < time.length; i++){
            if(time[i] == true){
                console.log(mentorHours[i]);
            }
        }
        console.log('');
    
        //what communication is mentor available
        if(matchingComm[0] !== undefined){
            console.log('You can communicate with', mentorUsername, 'using:',  matchingComm);
        }
        console.log('');
    
        //where is the mentor located?
        if(cityMatch == true){
            console.log('The mentor is located in your city:', mentorCity);
        }else{
            console.log('The mentor is located in:', mentorCity);
        }
    
    } else{
        console.log('No matches found.');
    }
}

function getUsers(callback){
	//console.log('This first');
	User.findOne({ _id: '5c9a676bfb6fc0465d4cbb10'} , function (err, listings) {
			
			if (err) throw err;
			
			//Save db return to local variable
			var mentee = listings;
			menteeTopics = mentee.topics;
			menteeHours = mentee.hours;
			menteeCity = mentee.city;
			menteeComm = mentee.communication;
			menteeUsername = mentee.username;
			
			
	});
	//callback();
	User.findOne({ _id: '5c9a67edfb6fc0465d4cbb34' } , function (err, listings) {
            if (err) throw err;
            
            //Save db return to local variable
            var mentor = listings;
            mentorAvailable = mentor.available;
            //console.log('is mentor available?', mentorAvailable);
            mentorTopics = mentor.topics;
            //console.log('maina, mentorTopics are', mentorTopics);
            mentorHours = mentor.hours;
            mentorCity = mentor.city;
            mentorComm = mentor.communication;
            mentorUsername = mentor.username;
			
			callback();
    });

}
