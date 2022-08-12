import React from 'react';

const buttonTypes = {
  nursing: {
    title: 'Nursing',
    img: '/images/nursing.png',
    alt: 'mom and baby'
  },
  formula: {
    title: 'Formula',
    img: '/images/bottle.png',
    alt: 'bottle'
  },
  diaper: {
    title: 'Diaper Changed',
    img: '/images/diaper.png',
    alt: 'diaper'
  },
  bath: {
    title: 'Bath',
    img: 'images/bath.png',
    alt: 'bathtub'
  },
  solidFood: {
    title: 'Baby Solid Food',
    img: 'images/solidFood.png',
    alt: 'highchair'
  },
  sleep: {
    title: 'Sleep',
    img: 'images/sleep.png',
    alt: 'moon'
  }
};

export default class BabyEntryButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfCare: ''
    };
    this.handleAddFormChange = this.handleAddFormChange.bind(this);
  }

  handleAddFormChange(event) {
    event.preventDefault();
    const value = event.target.id;

    const newEntry = {
      typeOfCare: value
    };

    this.props.onSubmit(newEntry);
  }

  render() {
    const { handleAddFormChange } = this;

    return (
      <div className="color-menu row justify-content-center">
        <form>
        <div className="row">
            <div className="col text-center">
        <label htmlFor={buttonTypes.nursing.title} className="me-3">
                <input type="radio" id={buttonTypes.nursing.title} name="buttonTypes" value={buttonTypes.nursing.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.nursing.title} className="baby-buttons"/>
          <img src={buttonTypes.nursing.img} alt={buttonTypes.nursing.title} className="baby" />
        </label>
            <label htmlFor={buttonTypes.formula.title} className="me-3">
                <input type="radio" id={buttonTypes.formula.title} name="buttonTypes" value={buttonTypes.formula.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.formula.title} className="baby-buttons" />
          <img src={buttonTypes.formula.img} alt={buttonTypes.formula.title} className="baby" />
        </label>
            <label htmlFor={buttonTypes.diaper.title} className="me-3">
                <input type="radio" id={buttonTypes.diaper.title} name="buttonTypes" value={buttonTypes.diaper.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.diaper.title} className="baby-buttons" />
          <img src={buttonTypes.diaper.img} alt={buttonTypes.diaper.title} className="baby" />
        </label>
            <label htmlFor={buttonTypes.bath.title} className="me-3">
                <input type="radio" id={buttonTypes.bath.title} name="buttonTypes" value={buttonTypes.bath.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.bath.title} className="baby-buttons" />
          <img src={buttonTypes.bath.img} alt={buttonTypes.bath.title} className="baby" />
        </label>
            <label htmlFor={buttonTypes.solidFood.title} className="me-3">
                <input type="radio" id={buttonTypes.solidFood.title} name="buttonTypes" value={buttonTypes.solidFood.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.solidFood.title} className="baby-buttons" />
          <img src={buttonTypes.solidFood.img} alt={buttonTypes.solidFood.title} className="baby" />
        </label>
            <label htmlFor={buttonTypes.sleep.title} className="me-3">
                <input type="radio" id={buttonTypes.sleep.title} name="buttonTypes" value={buttonTypes.sleep.title} onChange={handleAddFormChange} checked={this.state.typeOfCare === buttonTypes.sleep.title} className="baby-buttons" />
          <img src={buttonTypes.sleep.img} alt={buttonTypes.sleep.title} className="baby" />
        </label>
        </div>
        </div>
      </form>
      </div>
    );
  }
}
