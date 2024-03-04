export function currentDateTime() {
    // Create a new Date object
    var now = new Date();

    // Get the individual components of the date and time
    var year = now.getFullYear();
    var month = now.getMonth() + 1; // Months are zero-indexed, so we add 1
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();

    // Format the components with leading zeros if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Concatenate the components with the desired separators
    var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

    return formattedDateTime;

}