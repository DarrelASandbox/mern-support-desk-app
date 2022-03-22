import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : 'rgba(0,0,0,0.7)',
      }}>
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.note}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-SG')}
      </div>
    </div>
  );
};
export default NoteItem;
