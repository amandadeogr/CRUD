const openModal = () => {
   const modal = document.getElementById('modal');
   modal.classList.add('active')
}

const closeModal = () => {
   modal.classList.remove('active');
}

//localstorage
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];

const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

//CRUD
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};



//events
const registerClientButton = document.getElementById('registerClient');
registerClientButton.addEventListener('click', openModal);

const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', closeModal)