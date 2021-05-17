//clear local storage at midnight
var changeDate = function(currentDay) {

    var changeTime = moment(currentDay, 'L').set('hour', 21);

    if(moment().isAfter(changeTime)) {

        //remove items from local storage
        localStorage.removeItem('schedule');

        //remove classes from items
        $('.description').removeClass('past');
        $('.description').removeClass('present');
    }
}

//add current day to header
var displayCurrentDay = function() {
    var currentDay = moment();
    
    var formattedDay = currentDay.format('dddd, MMM Do');

    $('#currentDay').append(formattedDay);


    changeDate(currentDay);
    
}
displayCurrentDay();

//run an interval to check if the day has changed while the calendar is open
setInterval(displayCurrentDay, (1000 * 60) * (60 * 2));



//check time and update input color
var checkTime = function() {

    for(i = 0; i <= 8; i++) {
        var currentTime = $('#' + i + ' .hour').text().trim();

        var convertedTime = moment(currentTime, 'hA');

        if (moment().hour() == convertedTime.hour()) {
            $('#' + i + ' .description').addClass('present');
            $('#' + i + ' .description').removeClass('future');
        }
        else if(moment().isBefore(convertedTime)) {
            $('#' + i + ' .description').addClass('future');
          }
        else {
            $('#' + i + ' .description').addClass('past');
            $('#' + i + ' .description').removeClass('present');
      }
    }
}
checkTime();

//check the time slots every 5 min
setInterval(checkTime, (1000 * 60) * 5);




//save input information to local storage
var saveDescription = function() {
    
    //get the description of the time slot
    var scheduleDescription = $(this).siblings('.description').val();
    
    //get the id of the parent
    var descriptionId = $(this).parent().attr('id');

    //load data from local storage
    var loadSchedule = JSON.parse(localStorage.getItem('schedule')) || [];

    //push newest save to loadschedule array
    loadSchedule.push({
        description: scheduleDescription,
        identifier: descriptionId
    });
  
    
    //save item to local storage
    localStorage.setItem('schedule', JSON.stringify(loadSchedule));
}
$('.saveBtn').on('click', saveDescription);



var renderDescription = function() {
    //pull out description data
    var loadSchedule = JSON.parse(localStorage.getItem('schedule')) || [];


    //loop through the array created from the user input
    for(i = 0; i < loadSchedule.length; i++) {
        
        //loop through the array of time slots to see which one matches the user input slot
        for (c = 0; c < $('.row').length; c++) {

            if(loadSchedule[i].identifier == $('.row')[c].id) {

                $('#' + loadSchedule[i].identifier).children('.description').val(loadSchedule[i].description);

            }
        }
    }
}
renderDescription();
