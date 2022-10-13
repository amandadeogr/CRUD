const openModal = () => {
   const modal = document.getElementById('modal');
   modal.classList.add('active')
}

//events
const registerClientButton = document.getElementById('registerClient');
registerClientButton.addEventListener('click', openModal);