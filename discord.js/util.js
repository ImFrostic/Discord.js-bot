function nice_date(d){
	let year	= d.getUTCFullYear();
	let month	= d.getUTCMonth() + 1;	if (month < 10) month = "0" + month;
	let day		= d.getUTCDate();		if (day < 10) day = "0" + day;

	let hours 	= d.getUTCHours(); 		if (hours < 10) hours = "0" + hours;
	let minutes = d.getUTCMinutes(); 	if (minutes < 10) minutes = "0" + minutes;
	let seconds = d.getUTCSeconds(); 	if (seconds < 10) seconds = "0" + seconds;

	return (`${hours}:${minutes}:${seconds} - ${month}/${day}/${year} UTC`);
}


module.exports = {
	date: nice_date
};