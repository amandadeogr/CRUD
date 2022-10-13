const openModal = () => {
   const modal = document.getElementById('modal');
   modal.classList.add('active')
}

const closeModal = () => {
   modal.classList.remove('active');
}

//events
const registerClientButton = document.getElementById('registerClient');
registerClientButton.addEventListener('click', openModal);

const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', closeModal)