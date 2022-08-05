import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class CreateProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '/images/camera.png',
      name: '',
      gender: '',
      birthdate: '',
      height: '',
      weight: '',
      babyProfiles: []
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

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('token-jwt')
      }
    };

    fetch('/api/profiles/', req)
      .then(res => res.json())
      .then(babyProfiles => this.setState({ babyProfiles }))
      .catch(err => console.error(err));
  }

  handlePhotoUpload(event) {
    this.setState({ image: URL.createObjectURL(event.target.files[0]) });
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
    const image = this.fileInputRef.current.files[0];
    const name = this.state.name;
    const gender = this.state.gender;
    const birthdate = this.state.birthdate;
    const height = this.state.height;
    const weight = this.state.weight;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('height', height);
    formData.append('weight', weight);

    fetch('/api/profiles', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          image: '/images/camera.png',
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
    console.log('babyProfile:', this.state.babyProfiles);
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }

    // if we've created profile, redirect to HomePage
    // if babyId exists in the user's account, redirect to HomePage
    if (this.state.babyProfiles.babyId !== null) {
      return <Redirect to="home" />;
    }

    console.log('babyProifle exist:', this.state.babyProfiles.babyId);

    const { handlePhotoUpload, handleRadioChange, handleDateChange } = this;
    const { handleProfileSubmit, handleNameChange, handleHeightChange, handleWeightChange } = this;

    const { image, name, birthdate, height, weight } = this.state;
    return (
    <>
    <div className="color">
        <div className="row justify-content-center">
          <div className="col">
      <h1 className="text-center mt-5">Welcome to Baby Journey</h1>
          </div>
          </div>
          <div className="row justify-content-center">
          <div className="col mb-4">
            <p className="text-center mt-3 font-p">Please Create Your Baby&apos;s Profile</p>
          </div>
        </div>
        <form onSubmit={handleProfileSubmit}>
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 col-lg-2 mt-5 mb-4">
              <img src={image} className="rounded-circle" alt=""/>
          </div>
            <div className="d-flex justify-content-between align-items-center">
            <div className="col-5 mb-3">
            <input
              required
              className="mb-3"
              type="file"
              name="image"
              ref={this.fileInputRef}
              accept=".png, .jpg, .jpeg, .gif" onChange={handlePhotoUpload}/></div>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
                <label htmlFor="name" className="col-sm-2 col-form-label mt-4">Name</label>
            <div className="col-sm-5 col-m">
              <input type="text"
                     className="form-control"
                     id="name"
                     name="name"
                     value={name}
                     onChange={handleNameChange} />
                </div>
              </div>
          <fieldset className="form-group" onChange={handleRadioChange}>
            <div className="row mb-4 justify-content-center">
              <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
              <div className="col-sm-5">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="gender">
                  <input className="form-check-input"
                         type="radio"
                         name="gender"
                         id="girl"
                         value="girl"
                      />
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
                         />
                      Boy
                    </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="row mb-4 justify-content-center">
            <label htmlFor="birthdate" className="col-sm-2 col-form-label">Birthdate</label>
            <div className="col-sm-5" >
              <input type="date"
                     name="birthdate"
                     className="form-control"
                     id="birthdate"
                     value={birthdate}
                     onChange={handleDateChange} />
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <label htmlFor="height" className="col-sm-2 col-form-label">Height</label>
            <div className="col-sm-5" >
              <input type="text"
                     className="form-control"
                     id="height"
                     value={height}
                     onChange={handleHeightChange}/>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <label htmlFor="weight" className="col-sm-2 col-form-label">Weight</label>
            <div className="col-sm-5 mb-2" >
              <input type="text"
                     className="form-control"
                     id="weight"
                     value={weight}
                     onChange={handleWeightChange} />
            </div>
          </div>
          <div className="row text-center mb-5">
            <div className="col-m-4 mb-4">
            <button type="submit" className="btn btn-primary" href="#home">Submit</button>
            </div>
          </div>
            </form>
        </div>
    </>
    );
  }
}

CreateProfilePage.contextType = AppContext;
