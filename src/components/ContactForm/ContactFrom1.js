import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast(`🤔 ${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      toast(`🤔 ${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      toast.info("😱 Enter the contact's name and number phone!");
    } else if (
      !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g.test(
        number
      )
    ) {
      toast.error('💩 Enter the correct number phone!');
    } else {
      setContacts(prevContacts =>
        [contact, ...prevContacts].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        })
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
      <ToastContainer autoClose={3700} />
    </Container>
  );
}

export default App;
