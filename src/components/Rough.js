import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { error, type } from "cypress/types/jquery";

const App = () => {
  const [formData, setFormData] = useState({
    step1: {
      firstName: "",
      lastName: "",
    },
    step2: {
      model: "",
      price: "",
    },
    step3: {
      cardInfo: "",
      expDate: "",
    },
  });
  const [currForm, setCurrForm] = useState(0);
  const [forms, setForms] = useState([]);
  useEffect(() => {
    setForms([
      {
        step: 1,
        cardTitle: { component: Title, title: "Customer Details:" },
        ele1: {
          component: Input,
          type: "text",
          id: "first_name",
          label: "First Name",
          name: "firstName",
          error:"required",
          errEnable:false,
          onChange: (e) => {
            if (e.target.value === "") {
              
            };
            setFormData((prev) => ({
              ...prev,
              [`step${currForm + 1}`]: {
                ...prev[`step${currForm + 1}`],
                [e.target.name]: e.target.value,
              },
            }));
          },
        },
        ele2: {
          component: Input,
          type: "text",
          id: "last_name",
          label: "Last Name",
          name: "lastName",
          error:"required",
          errEnable:false,
          onChange: (e) => {
            if (e.target.value === "") {

            };
            setFormData((prev) => ({
              ...prev,
              [`step${currForm + 1}`]: {
                ...prev[`step${currForm + 1}`],
                [e.target.name]: e.target.value,
              },
            }));
          },
        },
        prev: {
          component: Button,
          enabled: false,
          fn: undefined,
          display: false,
          label: "Previous",
        },
        next: {
          component: Button,
          enabled: false,
          fn: () => setCurrForm((pre) => pre + 1),
          display: true,
          label: "Next",
        },
      },
      {
        step: 2,
        cardTitle: { component: Title, title: "Car Details" },
        ele1: {
          component: Input,
          type: "text",
          id: "model",
          label: "Model",
          name: "model",
          errEnable:false,
        },
        ele2: {
          component: Input,
          type: "text",
          id: "car_price",
          label: "Car Price",
          name: "price",
          errEnable:false,
        },
        prev: {
          component: Button,
          enabled: true,
          fn: () => setCurrForm((pre) => pre - 1),
          display: true,
          label: "Previous",
        },
        next: {
          component: Button,
          enabled: false,
          fn: () => setCurrForm((pre) => pre + 1),
          display: true,
          label: "Next",
        },
      },
      {
        step: 3,
        cardTitle: { component: Title, title: "Payment Details" },
        ele1: {
          component: Input,
          type: "text",
          id: "card_info",
          label: "Card Number",
          name: "cardInfor",
          errEnable:false,
        },
        ele2: {
          component: Input,
          type: "text",
          id: "expiry_date",
          label: "expiery Data",
          name: "expDate",
          errEnable:false,
        },
        prev: {
          component: Button,
          enabled: true,
          fn: () => setCurrForm((pre) => pre - 1),
          display: true,
          label: "Previous",
        },
        next: {
          component: Button,
          enabled: false,
          fn: () => setCurrForm((pre) => pre + 1),
          display: true,
          label: "Submit",
        },
      },
    ]);
  }, []);
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      ></div>
    </div>
  );
};

const Button = ({ label, e }) => {
  return (
    <button style={{ borderRadius: "20%", background: "green" }}>
      {label}
    </button>
  );
};

const Title = ({ title }) => {
  return <h3>{title}</h3>;
};

const Input = ({ label, type }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={formData[`step${e.step}`][label]}
        onChange={() => {}}
      />
    </>
  );
};

export default App;
