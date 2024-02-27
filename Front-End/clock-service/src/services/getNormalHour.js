export default function getNormalHour(date) {
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes()}`;
}