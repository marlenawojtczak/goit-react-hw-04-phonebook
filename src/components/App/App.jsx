import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Content, AppTitle, ListTitle } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

export const App = () => {
  const initialState = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(zz => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const normalizedContact = {
      id: nanoid(),
      name: normalizedName,
      number: number,
    };

    const isContactExist = contacts.find(
      existingContact =>
        existingContact.name.toLowerCase() === normalizedName.toLowerCase()
    );

    if (isContactExist) {
      alert(`${normalizedName} is already in contacts.`);
    } else {
      setContacts([...contacts, normalizedContact]);
    }
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Content>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onSubmit={handleAddContact} />

        <ListTitle>Contacts</ListTitle>
        <Filter value={filter} onChangeFilter={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </Content>
    </Container>
  );
};
