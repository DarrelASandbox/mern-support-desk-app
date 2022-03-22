import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackButton, Spinner } from '../components';
import { getTicket } from '../features/ticket/ticketSlice';

const Ticket = () => {
  const { ticket, isLoading } = useSelector((state) => state.tickets);

  const { ticketId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicket(ticketId)).then((res) => {
      if (res.error) toast.error(res.error.payload);
    });
  }, [dispatch, ticketId]);

  if (isLoading) return <Spinner />;

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
      </div>
    </>
  );
};
export default Ticket;
