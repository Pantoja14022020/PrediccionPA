const idPaciente = document.querySelector('#pronostico').getAttribute('data-id');
const loader = document.querySelector('#loader');






//GRAFICO PARA VISUALIZAR LOS DATOS REGISTRADOS DE LA PA Sistolica y Diastolica
$.ajax({
    url: `/get/datos/${idPaciente}`, // URL del endpoint
    method: 'GET',
    success: function (res) {
        const {df_sistolica,df_diastolica} = res;

        // Obtén el elemento canvas donde se dibujará el gráfico
        const grafico_pa = document.getElementById('presion_arterial').getContext('2d');
        // Definir los datos para el gráfico
        const data = {
            labels: df_sistolica['Fecha'].reverse(),
            datasets: [
                {
                    label: 'Sistólica',
                    data: df_sistolica['PA Sistolica'].reverse(),
                    backgroundColor: '#cf4343', // Color de fondo de las barras
                    borderColor: '#cf4343', // Color del borde de las barras
                    borderWidth: 1, // Ancho del borde
                },
                {
                    label: 'Diastólica',
                    data: df_diastolica['PA Diastolica'].reverse(),
                    backgroundColor: '#2a27ff', // Color de fondo de las barras
                    borderColor: '#2a27ff', // Color del borde de las barras
                    borderWidth: 1, // Ancho del borde
                }
            ]
        };
        // Crea el gráfico de linea
        const grafico_presionarterial = new Chart(grafico_pa, {
            type: 'line', // Tipo de gráfico
            data: data, // Datos del gráfico
            options: {
                responsive: true,
                scales:{
                    x:{
                        display: false//Ocultar los labels en el eje de lass x
                    }
                }
            }
        });



        //Mandar los datos a los dos modelos para hacer las predicciones
        //AQUI YA TENGO LISTO LOS JSON PARA MANDAR EN LA API EN PYTHON
        //SON DOS DATAFRAMES, YA QUE SON DOS MODELOS, SOLO FALTA ARMAR LA PETICION AJAX DE TIPO POST
        //AQUI ME QUEDE 04-11-2023    12:12
        const dataframe_pa_sistolica = {
            'Fecha': df_sistolica['Fecha'].reverse(),
            'PA Sistolica': df_sistolica['PA Sistolica'].reverse()
        }
        const dataframe_pa_diastolica = {
            'Fecha': df_diastolica['Fecha'],
            'PA Diastolica': df_diastolica['PA Diastolica'].reverse()
        }
        console.log(df_diastolica['Fecha'])
        console.log(df_diastolica['PA Diastolica'])
         //AQUI ME QUEDE 04-11-2023    12:12

    },
    error: function (error) {
        console.error(error);
    },
    complete: function () {
        loader.classList.add('hide-loader');//quitar loader
    }
});
