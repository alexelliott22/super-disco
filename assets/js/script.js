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

        var convertedTime = moment(currentTime, 'hA').format('h:mm A');

        console.log(convertedTime);

        //apply new class & styles based on time slot
      if (moment().isAfter(convertedTime)) {
        $('#' + i + '.description').addClass('past');
        $('#' + i + '.description').removeClass('present');
      }
      else if(moment().isBefore(convertedTime)) {
        $('#' + i + '.description').addClass('future');
      }
      else if (moment() == convertedTime) {
          $('#' + i + '.description').addClass('present');
          $('#' + i + '.description').removeClass('future');
      }
    }
}
checkTime();

//check the time slots every 5 min
setInterval(checkTime, (1000*60) * 5);




//save input information to local storage
var saveDescription = function() {
   
    var scheduleDescription = $('.description').val();
    

    //load data from local storage
    var loadSchedule = JSON.parse(localStorage.getItem('schedule')) || [];

    
    
    //add current scheule to new array
    loadSchedule.push({
        description: scheduleDescription
    });
    
    //save item to local storage
    localStorage.setItem('schedule', JSON.stringify(loadSchedule));

}
$('.saveBtn').on('click', saveDescription);






var renderDescription = function() {
    //pull out description data
    var description = JSON.parse(localStorage.getItem('schedule'));

    // for (i = 0; description.length; i++) {
    //     $('.description').append(description[i]);
    // }


    for(i = 0; i <= 8; i++) {
        
        var timeSlot = moment('9:00:00').add(i, 'hours').format('hA');

        $('#' + i).prepend(timeSlot);
            
    }
}
//renderDescription();

//clear local storage at midnight

