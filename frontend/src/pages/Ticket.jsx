import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackButton, NoteItem, Spinner } from '../components';
import { getNotes } from '../features/note/noteSlice';
import { closeTicket, getTicket } from '../features/ticket/ticketSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { ticket, isLoading } = useSelector((state) => state.tickets);
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTicket(ticketId)).then((res) => {
      if (res.error) toast.error(res.error.payload);
    });

    dispatch(getNotes(ticketId)).then((res) => {
      if (res.error) toast.error(res.error.payload);
    });
  }, [dispatch, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId)).then((res) => {
      if (!res.error) toast.success('Ticket Closed!');
      navigate('/tickets');
    });
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    console.log('Note submit');
    closeModal();
  };

  if (isLoading && notesIsLoading) return <Spinner />;

  return (
    <>
      <div className='ticket-page'>
        <header className='ticket-header'>
          <BackButton url='/tickets' />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className='ticket-desc'>
            <h3>Description of Issue:</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>

        {ticket.status !== 'Closed' && (
          <button className='btn' onClick={openModal}>
            <FaPlus /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Add Note'>
          <h2>Add Note</h2>
          <button className='btn-close' onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className='form-group'>
              <textarea
                name='noteText'
                id='noteText'
                className='form-control'
                placeholder='Note text'
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}></textarea>
            </div>

            <div className='form-group'>
              <button className='btn' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== 'Closed' && (
          <button onClick={onTicketClose} className='btn btn-block btn-danger'>
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
};
export default Ticket;
