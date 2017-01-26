import React from 'react'
import './Ticket.css'

export default class PostalCode extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='ticket'>
          <ul>
            <li>
              <p>Country</p>
              <p>Argentina</p>
            </li>
            <li>
              <p>State</p>
              <p>Entre Ríos</p>
            </li>
            <li>
              <p>District</p>
              <p>Departamento Uruguay</p>
            </li>
            <li>
              <p>Town</p>
              <p>Concepción del Uruguay</p>
            </li>
            <li>
              <p>Latitude</p>
              <p>-32.477378</p>
            </li>
            <li>
              <p>Longitude</p>
              <p>-58.224903</p>
            </li>
            <li>
              <p>Postal Code</p>
              <p>3260</p>
            </li>
            <li>
              <p>Country Code</p>
              <p>AR</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
