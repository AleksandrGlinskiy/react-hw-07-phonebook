import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from 'redux/operations';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    const contact = {
      id: nanoid(),
      name,
      phone,
    };
    e.preventDefault();

    const findName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (findName) {
      return alert(`${name} is already in contacts.`);
    }
    const findNumber = contacts.find(contact => contact.phone === phone);
    if (findNumber) {
      return alert(`This phone number is already in contacts.`);
    }

    dispatch(addContact(contact));

    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor="">
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label} htmlFor="">
        Number
        <input
          className={css.input}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
}
