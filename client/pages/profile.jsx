import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '/images/camera.png',
      name: '',
      gender: '',
      birthdate: '',
      height: '',
      weight: ''
    };
    this.fileInputRef = React.createRef();
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handlePhotoUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.setState({ img: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleHeightChange(event) {
    this.setState({ height: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  handleRadioChange(event) {
    this.setState({ gender: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ birthdate: event.target.value });
  }

  handleProfileSubmit(e) {
    e.preventDefault();
    const photoUrl = this.fileInputRef.current.files[0];
    const name = this.state.name;
    const gender = this.state.gender;
    const birthdate = this.state.birtdate;
    const height = this.state.height;
    const weight = this.state.weight;

    const formData = new FormData();
    formData.append('photoUrl', photoUrl);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('height', height);
    formData.append('weight', weight);

    fetch('/api/auth/profiles', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        // console.log('data:', data);
        this.setState({
          photoUrl: '/images/camera.png',
          name: '',
          gender: '',
          birthdate: '',
          height: '',
          weight: ''
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    // console.log('state:', this.state);
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }

    const { handlePhotoUpload, handleRadioChange, handleDateChange } = this;
    const { handleProfileSubmit, handleNameChange, handleHeightChange, handleWeightChange } = this;

    const { photoUrl, name, birthdate, height, weight } = this.state;
    return (
    <>
        <div className="row justify-content-center">
          <div className="col mb-4">
      <h1 className="text-center mt-5">Welcome Baby!</h1>
          </div>
        </div>
        <form className="mt-5" onSubmit={handleProfileSubmit}>
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 col-lg-2">
              <img src={photoUrl} className="rounded-circle" alt=""/>
            <input
              required
              className="mb-3"
              type="file"
              name="image"
              ref={this.fileInputRef}
              accept=".png, .jpg, .jpeg, .gif" onClick={handlePhotoUpload}/></div>
          </div>
          <div className="row mb-3 justify-content-center">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-5 col-m">
              <input type="text"
                     className="form-control"
                     id="name"
                     name="name"
                     value={name}
                     onChange={handleNameChange} />
                </div>
              </div>
          <fieldset className="form-group">
            <div className="row mb-3 justify-content-center">
              <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
              <div className="col-sm-5">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="gender">
                  <input className="form-check-input"
                         type="radio"
                         name="gender"
                         id="girl"
                         value="girl"
                         onChange={handleRadioChange} />
                      Girl
                    </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="gender">
                  <input className="form-check-input"
                         type="radio"
                         name="gender"
                         id="boy"
                         value="boy"
                         onChange={handleRadioChange} />
                      Boy
                    </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="birthdate" className="col-sm-2 col-form-label">Birthdate</label>
            <div className="col-sm-5" >
              <input type="date"
                     className="form-control"
                     id="birthdate"
                     value={birthdate}
                     onChange={handleDateChange} />
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="height" className="col-sm-2 col-form-label">Height</label>
            <div className="col-sm-5" >
              <input type="text"
                     className="form-control"
                     id="height"
                     value={height}
                     onChange={handleHeightChange}/>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="weight" className="col-sm-2 col-form-label">Weight</label>
            <div className="col-sm-5" >
              <input type="text"
                     className="form-control"
                     id="weight"
                     value={weight}
                     onChange={handleWeightChange} />
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="col-m-4">
            <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
            </form>
    </>
    );
  }
}

Profile.contextType = AppContext;
