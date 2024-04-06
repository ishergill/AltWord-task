function secondsToHours(seconds : number){
  const hours = Math.floor(seconds / 3600);
  const remainderSeconds = seconds % 3600;
  const minutes = Math.floor(remainderSeconds / 60);

  let result = `${hours} hour`;
  if (hours !== 1) {
    result += "s";
  }

  if (minutes > 0) {
    result += ` ${minutes} minute`;
    if (minutes !== 1) {
      result += "s";
    }
  }

  return result;
}


function formatDate(inputDate : number) {
  // Extract day, month, and year from the 'endsAt' value
  const endsAt = String(inputDate);
  const month = endsAt.substr(0, 2);
  const day = endsAt.substr(2, 2);
  const year = endsAt.substr(4, 2);

  // Convert 2-digit year to 4-digit year
  const currentYear = new Date().getFullYear();
  const fullYear = currentYear - (currentYear % 100) + parseInt(year);

  // Map month number to month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name based on the extracted month value
  const monthName = monthNames[parseInt(month) - 1];

  // Format the date
  const formattedDate = `${day} ${monthName} ${fullYear}`;

  return formattedDate;
}

export { secondsToHours, formatDate };
