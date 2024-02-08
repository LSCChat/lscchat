export default function formatDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

    return formattedDate;
}