
function getFecha(){
    // Obtener la fecha en formato año-mes-día
    const fechaHoraActual = new Date();
    const anio = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0, por lo que se suma 1
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');

    const fechaEnFormato = `${anio}-${mes}-${dia}`;
    return fechaEnFormato;
}

function getHora(){
    // Obtener la hora en formato hh:mm:ss
    const fechaHoraActual = new Date();
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');

    const horaEnFormato = `${horas}:${minutos}:${segundos}`;
    return horaEnFormato;
}


module.exports = {
    getFecha,
    getHora
}