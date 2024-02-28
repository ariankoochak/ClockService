function fixUnder10Number(inp){
    if(inp < 10){
        return `0${inp}`
    }
    return inp
}

export default function getNormalHour(date) {
    const d = new Date(date);
    return `${fixUnder10Number(d.getHours())}:${fixUnder10Number(d.getMinutes())}`;
}