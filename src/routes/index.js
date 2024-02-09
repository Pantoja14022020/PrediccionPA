const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../database');
const {getFecha, getHora} = require('../helpers/fecha');
//const { noEstaLogeado } = require('../middlewares/auth');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


//Esto muestra la pagina de inicio con todos los pacientes registrados
router.get('/',/*noEstaLogeado,*/async(req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    const [pacientes,field] = (await connection.execute('SELECT * FROM paciente'));
    req.flash('main',true);
    res.render('main/index.hbs',{pacientes});
});


//Este es para crear un paciente
router.post('/add/user',async (req,res) => {
    let {nombre_paciente} = req.body;
    try {
        const [row,fields] = (await connection.execute('INSERT INTO paciente(nombre) VALUES(?)',[nombre_paciente]));
        //req.flash('success_signup','Creado con exito');
        res.redirect(`/`);
    } catch (error) {
        //req.flash('success_signup','No se pudo crear');
        res.redirect(`/`);
    } finally{
        connection.releaseConnection();
    }

});


//Este es para eliminar un paciente
router.get('/delete/user/:id',/*noEstaLogeado,*/async(req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    const id_paciente = req.params.id;
    const [row,field] = (await connection.execute('DELETE FROM paciente WHERE id_paciente = ?',[id_paciente]));
    res.redirect('/');
});













//Este es para mostrar la pagina donde esta el registro de todas las presiones de un determinado paciente
router.get('/details/paciente/:id', async(req,res)=>{
    const id_paciente = req.params.id;
    req.flash('registro',true);
    //consulta para obtener las presiones del paciente
    const [paciente,fieldd] = (await connection.execute('SELECT nombre FROM paciente WHERE id_paciente = ?',[id_paciente]));
    const [presiones,field] = (await connection.execute('SELECT pa.pa_sistolica, pa.pa_diastolica, pa.fecha, pa.hora, p.nombre FROM presion_arterial AS pa INNER JOIN paciente AS p ON pa.id_paciente = p.id_paciente WHERE pa.id_paciente = ?',[id_paciente]));
    let nombre_paciente =  paciente[0].nombre;
    let mostrarOpcionPredecir = (presiones.length >= 10) ? true : false;
    //Aqui muestro todas las presiones del paciente
    res.render('registro/registro.hbs',{id_paciente,presiones,nombre_paciente,mostrarOpcionPredecir});
});
//Este es para registrar la presion diastolica y sistolica
router.post('/add/pa/paciente/:id', async(req,res) => {
    const id_paciente = req.params.id;
    let {pa_sistolica,pa_diastolica} = req.body;
    let fecha = getFecha();
    let hora = getHora();

    try {
        const [row,fields] = (await connection.execute('INSERT INTO presion_arterial(pa_sistolica,pa_diastolica,id_paciente,fecha,hora) VALUES(?,?,?,?,?)',[pa_sistolica, pa_diastolica, id_paciente, fecha, hora]));
        //req.flash('success_signup','Creado con exito');
        res.redirect(`/details/paciente/${id_paciente}`);
    } catch (error) {
        //req.flash('success_signup','No se pudo crear');
        res.redirect(`/details/paciente/${id_paciente}`);
    } finally{
        connection.releaseConnection();
    }

});












//INTERFAZ PRONOSTICOS donde se muestran los graficos
router.get('/paciente/:id/pronostico',async(req,res)=>{
    const id_paciente = req.params.id;
    res.render('pronostico/pronostico.hbs',{id_paciente});
});
router.get('/get/datos/:id', async(req,res)=>{
    const id_paciente = req.params.id;
    const [presiones,field] = (await connection.execute('SELECT pa_sistolica,pa_diastolica,fecha FROM presion_arterial WHERE id_paciente = ?',[id_paciente]));
    
    const df_sistolica = {
        'Fecha': [],
        'PA Sistolica': []
    }
    const df_diastolica = {
        'Fecha': [],
        'PA Diastolica': []
    }


    presiones.forEach(presion => {
        let {pa_sistolica,pa_diastolica,fecha} = presion;
        
        df_sistolica.Fecha.push(fecha);
        df_diastolica.Fecha.push(fecha);

        df_sistolica['PA Sistolica'].push(pa_sistolica);
        df_diastolica['PA Diastolica'].push(pa_diastolica);
    })


    res.json({
        df_sistolica,
        df_diastolica
    })
})
module.exports = router;//Exportando el router