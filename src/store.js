export const initialStore = () => {
  return {
    contacts: [],
    loading: true
  };
};

export default function contactListReducer(store, action = {}) {
  switch (action.type) {
    case 'seeContacts':
      return {
        contacts: action.payload,
        loading: false
      };

    case 'addContact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'deleteContact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    case 'editContact':
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? { ...contact, ...action.payload } : contact
        )
      };

    default:
      throw new Error('Unknown action type: ' + action.type);
  }
}
