import React from 'react';
import './App.css';
import AutoGenerator from './Components/AutoGenerator';
import NumberPad from './Components/NumberPad';
import Tickets from './Components/Tickets';

function App() {
  const [autogenerate, setAutoGenerate] = React.useState(false);
  const [ticketNumber, setTicketNumber] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [error, setError] = React.useState("");

  // For Enter the 6 digit number

  const Numberpad = (event) => {
    const replaceNumbers = [...ticketNumber];
    replaceNumbers.push(event.target.innerHTML);
    setTicketNumber(replaceNumbers);
  }

  //For Removing the ticket number

  const removeTicketNumber = () => {
    setTicketNumber([]);
  };

  //For back space button functionality

  const handleBack = () => {
    const copyTicketNum = [...ticketNumber];
    if (ticketNumber.length >= 0) {
      copyTicketNum.pop();
    }
    setTicketNumber(copyTicketNum);
  };

  // For Random auto number generate

  const handleAutoGenNumber = () => {
    setAutoGenerate(true);
    setTimeout(() => {
      const randomTicketNum = Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicketNum.toString().split(''))
      setAutoGenerate(false);
    }, 1000);
  }

  //For Adding the ticket

  const ticketGenerate = () => {
    setError('');
    if (ticketNumber.length !== 6) {
      sendError("Please enter 6 digits ticket number");
      return
    } else if (ticketNumber.length > 6) {
      sendError("Ticket number should be 6 digits only");
    } else if (tickets.length >= 5) {
      sendError("A person can book only 5 tickets");
    } else if (DuplicateFilter(tickets)) {
      sendError("The ticket number is already exists");
      return;
    } else {
      const generateTicket = {
        id: tickets.length + 1,
        ticketNumber: ticketNumber.join(''),
        date: Date.now()
      }

      const replaceTickets = [...tickets];
      replaceTickets.push(generateTicket)
      setTickets(replaceTickets);
      setTicketNumber([]);
    }
  }

  const DuplicateFilter = t => {
    if (t.length) {
      const duplicateTicket = t.filter(ticket => ticket.ticketNumber === ticketNumber.join(''));
      if (duplicateTicket.length) {
        return true
      } else return false;
    } else {
      return false
    }
  }

  // For Delete Ticket Number

  const handleRemove = index => {
    const copyTickets = [...tickets];
    copyTickets.splice(index, 1);
    setTickets(copyTickets);
  };

  // Close the errors

  const closeError = () => setError('');

  const sendError = (error) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 1500)
  }


  return (
    <div className="container-fluid App_container">
      {error && (
        <div className="alert alert-danger alert-position">
          <strong>Error!</strong> {error}
          <button type="button" className="close" onClick={closeError}>&times;</button>
        </div>
      )}
      <h3 className="text-center text-white pt-4">Ticket Entry System</h3>
      <div className="container inner_container">
        <div className="row">
          <div className="col-lg-6 p-3">
            {/* Numberpad component */}
            <NumberPad
              Numberpad={Numberpad}
              removeTicketNumber={removeTicketNumber}
              handleBack={handleBack}
              ticketNumber={ticketNumber}
              ticketGenerate={ticketGenerate}
            />
          </div>
          <div className="col-lg-6 p-3">
            {/* AutoGenerator component */}
            <AutoGenerator
              handleAutoGenNumber={handleAutoGenNumber}
              loading={autogenerate}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        {/* Tickets component */}
        <Tickets
          tickets={tickets}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}

export default App;
