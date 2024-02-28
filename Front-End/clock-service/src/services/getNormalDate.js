export default function getNormalDate(date){
    const d = new Date(date);
     return new Date().toLocaleDateString("fa-IR");
}