import React from 'react';
import Spinner from 'react-spinkit';
import './PostalCode.css';

export default class PostalCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successFetch: false,
      successGeo: false,
      latitude: 0,
      longitude: 0,
      errorMessage: '',
      postalCode: ''
    };
  }
  fetchResults() {
    const lat = this.state.latitude;
    const lon = this.state.longitude;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => {
        const postalCode = data.address.postcode;
        this.setState({
          successFetch: true,
          postalCode
        });
      });
  }
  setMessage(errorMessage) {
    this.setState({
      successGeo: false,
      errorMessage
    });
  }
  getCurrentPosition() {
    if (!navigator.geolocation) {
      this.setMessage('Geolocation is not compatible');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({
          successGeo: true,
          latitude,
          longitude
        });
        this.fetchResults();
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.setMessage('Denied the request for geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            this.setMessage('Location info unavailable');
            break;
          case error.TIMEOUT:
            this.setMessage('User location request timed out');
            break;
          case error.UNKNOWN_ERROR:
            this.setMessage('Unknown error has ocurred');
            break;
          default:
            break;
        }
      }
    );
  }
  componentDidMount() {
    this.getCurrentPosition();
  }
  render() {
    return this.state.successGeo !== false || this.state.successFetch !== false
      ? this.renderResults()
      : this.renderSpinner();
  }
  renderSpinner() {
    return (
      <div className="container">
        <Spinner spinnerName="cube-grid" noFadeIn />
      </div>
    );
  }
  renderResults() {
    return (
      <div className="container">
        <p className="postalCode">{this.state.postalCode}</p>
        <p className="errorMessage">{this.state.errorMessage}</p>
      </div>
    );
  }
}
