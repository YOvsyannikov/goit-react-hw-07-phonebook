import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import Cleave from 'cleave.js/react';
import { toast } from 'react-toastify';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import s from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === '' || number.trim() === '';
  };

  const checkValidNumber = number => {
    return !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g.test(
      number
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkRepeatName(name)) {
      toast(`🤔 ${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      toast(`🤔 ${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      toast.info("😱 Enter the contact's name and number phone!");
    } else if (checkValidNumber(number)) {
      toast.error('💩 Enter the correct number phone!');
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }
    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Ivan Ivanov"
        />
      </label>
      <label className={s.label}>
        Number
        <Cleave
          options={{ delimiter: '-', blocks: [4, 2, 3, 2, 2] }}
          placeholder="+380-00-000-00-00"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>

      {!isLoading && (
        <button className={s.btn} type="submit">
          Add contact
        </button>
      )}
      {isLoading && <LoaderComponent />}
    </form>
  );
}

export default ContactForm;
