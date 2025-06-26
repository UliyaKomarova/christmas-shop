function initCountdown(){
    const daysContainer = document.getElementById('countdownDays');
    const hoursContainer = document.getElementById('countdownHours');
    const minutesContainer = document.getElementById('countdownMinutes');
    const secondsContainer = document.getElementById('countdownSeconds');

    setInterval(() => {
        let timeRemaining = getTimeRemaining();

        addParameterOnPage(daysContainer, convertToDate(timeRemaining).days);
        addParameterOnPage(hoursContainer, convertToDate(timeRemaining).hours);
        addParameterOnPage(minutesContainer, convertToDate(timeRemaining).minutes);
        addParameterOnPage(secondsContainer, convertToDate(timeRemaining).seconds);
    }, 1000);
};

function getTimeRemaining() {
    const deadline = new Date('2024-12-31 23:59:59 GMT+00:00');
    let currentDate = Date.now();
    let timeRemaining = deadline.getTime() - currentDate;

    return timeRemaining;
};

function convertToDate(time) {
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    let days = Math.floor(time / (1000 * 60 * 60 * 24));

    return {
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
    };
};

function addParameterOnPage(block, number) {
    block.textContent = number;
}

initCountdown();