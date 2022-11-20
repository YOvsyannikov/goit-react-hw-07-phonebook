import axios from 'axios';

axios.defaults.baseURL =
  'https://637a3d627419b414df9ce4b5.mockapi.io/contacts/';

export function fetchContacts() {
  return axios.get('/contacts');
}

export function addContact(contact) {
  return axios.post('/contacts', contact);
}

export function deleteContact(id) {
  return axios.delete(`/contacts/${id}`);
}
