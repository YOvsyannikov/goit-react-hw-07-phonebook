import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      <ToastContainer autoClose={3700} />
    </Container>
  );
}

export default App;
