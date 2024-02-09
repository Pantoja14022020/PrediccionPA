const btnCloseModal = document.querySelector('#close-modal');
const btnAddUser = document.querySelector('#add-user');
const modalAddUser = document.querySelector('#modal-add-user');
btnCloseModal.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    modalAddUser.classList.add('hide-modal');
});
btnAddUser.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    modalAddUser.classList.remove('hide-modal');
});