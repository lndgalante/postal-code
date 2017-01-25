import React from 'react'
import Spinner from 'react-spinkit'
import './PostalCode.css'

export default class PostalCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = { successFetch: false, successGeo: false, latitude: 0, longitude: 0, message: '' }
  }
  fetchResults () {
    const lat = this.state.latitude
    const lon = this.state.longitude
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => { this.setState({ successFetch: true, message: data.address.postcode }) })
    this.getImageLink()
  }
  getCurrentPosition () {
    if (!navigator.geolocation) {
      this.setState({ message: 'Geolocation is not supported by your browser' })
      return
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ successGeo: true, latitude: position.coords.latitude, longitude: position.coords.longitude })
        this.fetchResults()
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.setState({ message: 'Ha negado el uso de la Geolocalización' })
            break
          case error.POSITION_UNAVAILABLE:
            this.setState({ message: 'Información de su ubicación no esta disponible' })
            break
          case error.TIMEOUT:
            this.setState({ message: 'La solicitud para obtener la ubicación del usuario se agotó' })
            break
          case error.UNKNOWN_ERROR:
            this.setState({ message: 'Un error desconocido ha ocurrido' })
            break
          default:
            break
        }
      })
  }
  componentDidMount () {
    this.getCurrentPosition()
  }
  render () {
    return (this.state.successGeo && this.state.successFetch) ? this.renderResults() : this.renderSpinner()
  }
  renderSpinner () {
    return (
      <div className='container'>
        <Spinner spinnerName='cube-grid' noFadeIn />
      </div>
    )
  }
  renderResults () {
    return (
      <div className='container'>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
