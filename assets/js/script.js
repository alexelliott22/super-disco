//add current day to header
var checkForCurrentDay = function() {
    var currentDay = moment().format('dddd, MMM Do');

    $('#currentDay').append(currentDay);


}
checkForCurrentDay();

//run an interval to check if the day has changed while the calendar is open
setInterval(checkForCurrentDay, (1000 * 60) * (60 * 2));


//check time and update input color
var checkTime = function() {

    for(i = 0; i <= 8; i++) {
        var currentTime = $('#' + i + ' .hour').text();

        var convertedTime = moment(currentTime, 'hA').format('hh:mm:ss');

        console.log(convertedTime);

        //apply new class & styles based on time slot
      if (convertedTime.isAfter(moment())) {
        $('#' + i + '.description').addClass('past');
        $('#' + i + '.description').removeClass('present');
      }
      else if(convertedTime.isBefore(moment())) {
        $('#' + i + '.description').addClass('future');
      }
      else if (moment().isSame(convertedTime)) {
          $('#' + i + '.description').addClass('present');
          $('#' + i + '.description').removeClass('future');
      }
    }
}
//checkTime();

//check the time slots every 5 min
//setInterval(checkTime, (1000*60) * 5);




//save input information to local storage
var saveDescription = function() {
    //get the description of the time slot
    var scheduleDescription = $('.description').val();
    //get the id of the parent
    var descriptionId = $(this).parent().attr('id');


    //load data from local storage
    var loadSchedule = JSON.parse(localStorage.getItem('schedule')) || [];
    
    //check to see if the schedule has changed or been updated
    loadSchedule.push({
        description: scheduleDescription,
        identifier: descriptionId
    });

    var newLoadSchedule = Array.from(loadSchedule.reduce((map, obj) => map.set(obj.identifier, obj) ,new Map()));

    console.log(newLoadSchedule);
    
    
    
    
    //save item to local storage
    localStorage.setItem('schedule', JSON.stringify(newLoadSchedule));

    //renderDescription(descriptionId);
}
$('.saveBtn').on('click', saveDescription);


var renderDescription = function(descriptionId) {
    //pull out description data
    var loadSchedule = JSON.parse(localStorage.getItem('schedule'));

    if(loadSchedule.identifier == $('.row').attr('id')) {
            $('#' + loadSchedule[descriptionId].identifier + '.description').text(loadSchedule[descriptionId].description);
    }
    
    
    
    //for(i = 0; i <= loadSchedule.length; i++) {
        
        //if(loadSchedule[i].identifier == $('.row').attr('id')) {
            // $('#' + loadSchedule[i].identifier + '.description').text(loadSchedule[i].description);
    //     }
    // }
}


//clear local storage at midnight

