import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton, Spinner, TicketItem } from '../components';
import { getTickets, reset } from '../features/ticket/ticketSlice';

const Tickets = () => {
  const { isLoading, tickets } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
    dispatch(reset());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Data</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};
export default Tickets;
