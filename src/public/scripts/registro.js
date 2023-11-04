const pasInput =  document.querySelector('#pasinput');
const padinput = document.querySelector('#padinput');
const btnAddPa = document.querySelector('#btn-guardar-pa');
const formAddPA = document.querySelector('#form-registrar-pa');
const btnDesplegar = document.querySelector('#desplegar');
const btnShowForm = document.querySelector('#show-form');

btnShowForm.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    formAddPA.classList.remove('hide-down');
    btnShowForm.classList.add('hide-show');
});

btnDesplegar.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    formAddPA.classList.add('hide-down');
    btnShowForm.classList.remove('hide-show');
});