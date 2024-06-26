import React, { useState } from "react";
import { useSelector } from "react-redux";
function DeliveryDetails({ onSelectDeliveryAddress }) {
  const customer = useSelector((state) => state.user.profile);
  const [state, setState] = useState({
    name: customer.name,
    phone: "",
    address: "",
    country: "",
    postalCode: "",
    instructions:"",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { name, phone, country, postalCode, address,instructions } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    let delivery = {
      name: name,
      phone: phone,
      country: country,
      postalCode: postalCode,
      address: address,
      instructions:instructions,
    };
    onSelectDeliveryAddress(delivery);
  };

  return (
    <div className="card-body">
      <form>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                className="form-control border-form-control"
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">
                Phone <span className="required">*</span>
              </label>
              <input
                type="number"
                className="form-control border-form-control"
                name="postalCode"
                value={postalCode}
                placeholder="eg 0741515192"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="control-label">
                Delivery Address <span className="required">*</span>
              </label>
              <textarea
                className="form-control border-form-control"
                name="address"
                value={address}
                onChange={handleChange}
                placeholder="eg. Nairobi county,Ngong road, 4th avanue,house no 4"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="control-label">
              Order Instructions <span className="required">*</span>
              </label>
              <textarea
                className="form-control border-form-control"
                name="country"
                value={country}
                onChange={handleChange}
                placeholder="To send a gift to someone ..."
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
          className="btn btn-secondary mb-2 btn-lg"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </form>
    </div>
  );
}

export default DeliveryDetails;
