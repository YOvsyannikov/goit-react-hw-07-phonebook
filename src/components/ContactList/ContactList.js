// import PropTypes from 'prop-types';
// import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
// import s from './ContactList.module.css';

// function ContactList({ contacts, onDeleteContact }) {
//   return (
//     <ul className={s.list}>
//       {contacts.map(({ id, name, number }) => (
//         <li className={s.item} key={id}>
//           <p className={s.info}>
//             <b>{name}</b>
//             <em>{number}</em>
//           </p>
//           <button
//             className={s.btn}
//             type="button"
//             onClick={() => onDeleteContact(id)}
//           >
//             <DeleteIcon width="26" height="26" />
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   onDeleteContact: PropTypes.func.isRequired,
// };

// export default ContactList;

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-action';
import {
  getVisibleContacts,
  getContacts,
} from '../../redux/contacts/contacts-selector.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import s from './ContactList.module.css';
import popTransition from '../../utils/transactions/pop.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(getVisibleContacts);
  const contacts = useSelector(getContacts);

  return (
    <>
      <CSSTransition
        in={!contacts.length}
        timeout={250}
        classNames={popTransition}
        mountOnEnter
        unmountOnExit
      >
        <p>Your phonebook is empty. Please add contact.</p>
      </CSSTransition>
      <TransitionGroup component="ul" className={s.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            mountOnEnter
            unmountOnExit
            classNames={popTransition}
          >
            <li className={s.item}>
              <p className={s.info}>
                <b>{name}</b>
                <em>{number}</em>
              </p>
              <button
                className={s.btn}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                <DeleteIcon width="26" height="26" />
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

export default ContactList;
