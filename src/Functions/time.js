export default function formatTime(dateString) {
    const [datePart, timePart] = dateString.split(' ');

    const [hours, minutes, seconds] = timePart.split(':');
    console.log(typeof(hours));
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
}