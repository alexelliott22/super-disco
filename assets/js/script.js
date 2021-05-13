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
    
    //apply new class based on time
  if (moment().isAfter(convertedTime)) {
    $('.description').addClass('past');
    $('.description').removeClass('present');
  }
  else if(moment().isBefore(convertedTime)) {
    $('.description').addClass('future');
  }
  else {
      $('.description').addClass('present');
      $('.description').removeClass('future');
  }
}
// checkTime();






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



}
renderDescription();

//clear local storage at midnight

