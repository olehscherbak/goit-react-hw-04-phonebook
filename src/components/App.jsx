import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import useLocalStorage from 'hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const changeFilter = filterValue => setFilter(filterValue);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = value => {
    const updatedContacts = contacts.filter(contact => contact.id !== value);
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="phoneBook">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ContactList
        contactArray={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
}
