const openModal = () => {
   const modal = document.getElementById('modal');
   modal.classList.add('active')
}

const closeModal = () => {
   clearFields()
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

const readClient = () => getLocalStorage();

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
}

// interação com o layout
const isValidFields = () => {
  return document.getElementById('form').reportValidity();
}

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach((field) => (field.value = ''));
}

const saveClient = () => {
  if(isValidFields()) {
    const client = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      birthDate: document.getElementById('birthDate').value
    }
    const index = document.getElementById('name').dataset.index;
    if(index == 'new') {
      createClient(client);
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td>${client.name}</td>
  <td>${client.email}</td>
  <td>${client.birthDate.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</td>
  <td>
     <button type="button" class="button edit" id="edit-${index}">
        Editar
     </button> 

     <button type="button" class="button delete" id="delete-${index}">
        Excluir
     </button>
  `
  const tBody = document.querySelector("#table>tbody").appendChild(newRow);
}

const clearTable = () => {
  const rows = document.querySelectorAll("#table > tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
}

const fillFields = (client) => {
  document.getElementById('name').value = client.name;
  document.getElementById('email').value = client.email;
  document.getElementById('birthDate').value = client.birthDate;

  document.getElementById('name').dataset.index = client.index;
}

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();
}

const isEditOrDeleteButton = (event) => {
  if(event.target.type == 'button') {
    const [action, index] = event.target.id.split('-');

    if(action == 'edit') {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(`Deseja realmente excluir o cliente ${client.name}?`);

      if(response) {
        deleteClient(index);
        updateTable()
      }
    }
  }
}

updateTable()

//events
const registerClientButton = document.getElementById('registerClient');
registerClientButton.addEventListener('click', openModal);

const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', closeModal);

const saveClientButton = document.getElementById('saveClient');
saveClientButton.addEventListener('click', saveClient);

const editAndDeleteButton = document.querySelector('#table>tbody');
editAndDeleteButton.addEventListener('click', isEditOrDeleteButton);