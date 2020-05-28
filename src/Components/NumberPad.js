import React from 'react';

const KeyBoard = (props) => {
    const { ticketNumber, ticketGenerate, Numberpad, removeTicketNumber, handleBack } = props;
    const [keyDigits] = React.useState([7, 8, 9, 4, 5, 6, 1, 2, 3])
    return (
        <div>
            <div className="card card-body">
                <div className="ticket_number">
                    {ticketNumber.length === 0 && <span className="danger-badge">Enter 6 digits</span>}
                    {ticketNumber && ticketNumber.map((num, i) => (
                        <span key={i} className="d-inline">{num}</span>
                    ))}
                </div>
                <div className="board-row">
                    {keyDigits.map(digit => (
                        <button key={digit} disabled={ticketNumber.length >= 6} className="square-button" onClick={Numberpad}>
                            {digit}
                        </button>
                    ))}
                </div>
                <div className="board-row">
                    <button className="square-button" onClick={handleBack} disabled={ticketNumber.length === 0}>
                        <i className="fa fa-arrow-circle-left" style={{color:"black"}}></i>
                    </button>
                    <button className="square-button" onClick={Numberpad} disabled={ticketNumber.length >= 6} >0</button>
                    <button className="square-button" onClick={removeTicketNumber} disabled={ticketNumber.length === 0}>
                        <i className="fa fa-trash-o text-danger"></i>
                    </button>
                </div>
                <button className="btn btnbtn btn-secondary" style={{backgroundColor:"#d3d7de",color:"black"}} onClick={ticketGenerate}>
                  <strong>  <i className="fa fa-plus-square-o"></i> ADD TICKET</strong>
              </button>
            </div>
        </div>
    )
}

export default KeyBoard;