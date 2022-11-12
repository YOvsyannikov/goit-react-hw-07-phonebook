// import PropTypes from 'prop-types';
// import s from './Filter.module.css';

// function Filter({ value, onChange }) {
//   return (
//     <label className={s.label}>
//       Find contacts by name
//       <input
//         className={s.input}
//         type="text"
//         value={value}
//         onChange={onChange}
//       />
//     </label>
//   );
// }

// Filter.propTypes = {
//   value: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// export default Filter;

import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-action';
import { getFilter, getContacts } from '../../redux/contacts/contacts-selector';
import { CSSTransition } from 'react-transition-group';
import popTransition from '../../utils/transactions/pop.module.css';
import s from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  return (
    <CSSTransition
      in={contacts.length > 0}
      timeout={250}
      classNames={popTransition}
      mountOnEnter
      unmountOnExit
    >
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={e => dispatch(filterContact(e.target.value))}
        />
      </label>
    </CSSTransition>
  );
}

export default Filter;
