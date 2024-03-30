const currentDate = new Date(); // Get the current date

// Extract individual date components
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1 and pad with zero if necessary
const day = currentDate.getDate().toString().padStart(2, '0'); // Pad with zero if necessary

// Concatenate year, month, and day into a single string
const concatenatedDate = `${year}${month}${day}`;

export default concatenatedDate
