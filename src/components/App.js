import React, { useCallback, useEffect, useRef, useState } from "react";

const Title = ({ data }) => {
  return <h3 className="title">{data}</h3>;
};

const Input = ({ data, formData, step }) => {
  const [errMsg, setErrMsg] = useState(false);
  useEffect(() => {
    setErrMsg(false);
  }, [step]);
  const { type, id, label, name, error, onchange, regX } = data;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <label>{label}</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <input
          type={type}
          id={id}
          name={name}
          value={formData[`step${step}`][name]}
          onChange={(e) => {
            const { name, value } = e.target;
            setErrMsg(true);
            onchange({ name, value }, step, regX);
          }}
        />
        {!formData.errors[name] && errMsg && (
          <p style={{ color: "red", margin: "3px 0 3px 0" }}>
            {label} is {error}
          </p>
        )}
      </div>
    </div>
  );
};

const StepCard = ({ data, formData, setStepIndex,setFormData }) => {
  const {
    cardTitle: { component: TitleComponent, title },
    ele1,
    ele2,
    step,
    prev,
    next,
  } = data;
  const enNext = formData["errors"][ele1.name] && formData["errors"][ele2.name];
  console.log(enNext);
  return (
    <>
      <TitleComponent data={title} />
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <ele1.component data={ele1} formData={formData} step={step} />
        <ele2.component data={ele2} formData={formData} step={step} />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prev.display && (
          <button
            className="navBtn"
            disabled={!prev.enabled}
            onClick={() => setStepIndex((prev) => prev - 1)}
          >
            {prev.label}
          </button>
        )}
        <button
          className="navBtn"
          disabled={!enNext}
          onClick={() => {
            if(next.label==="Submit"){
              alert("Data succesfully submitted");
              setStepIndex(0);
              setFormData({
                step1: {
                  firstName: "",
                  lastName: "",
                },
                step2: {
                  model: "",
                  price: "",
                },
                step3:{
                  expDate:"",
                  cardInfo:""
                },
                errors: {
                  firstName: false,
                  lastName: false,
                  price: false,
                  model: false,
                  cardInfo:false,
                  expDate:false
                },
              })
              return;
            }
            setStepIndex((prev) => prev + 1)
          }}
        >
          {next.label}
        </button>
      </div>
    </>
  );
};
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
    step3:{
      expDate:"",
      cardInfo:""
    },
    errors: {
      firstName: false,
      lastName: false,
      price: false,
      model: false,
      cardInfo:false,
      expDate:false
    },
  });
  const [stepIndex, setStepIndex] = useState(0);
  const cardData = {
    step1: {
      step: 1,
      cardTitle: { component: Title, title: "Customer Details" },
      ele1: {
        component: Input,
        type: "text",
        id: "first_name",
        label: "First Name",
        name: "firstName",
        error: "required",
        regX: /^[A-Za-z]{2,}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      ele2: {
        component: Input,
        type: "text",
        id: "last_name",
        label: "Last Name",
        name: "lastName",
        error: "required",
        regX: /^[A-Za-z]{2,}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      prev: {
        enabled: false,
        display: false,
        label: "Previous",
      },
      next: {
        enabled: false,
        display: true,
        label: "Next",
      },
    },
    step2: {
      step: 2,
      cardTitle: { component: Title, title: "Car Details" },
      ele1: {
        component: Input,
        type: "text",
        id: "model",
        label: "Model",
        name: "model",
        error: "Atleast 3 charectors ",
        regX: /^[A-Za-z]{3,}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      ele2: {
        component: Input,
        type: "text",
        id: "car_price",
        label: "Car Price",
        name: "price",
        error: "Atleast 4 digit numbers",
        regX: /^\d{4,}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      prev: {
        enabled: true,
        display: true,
        label: "Previous",
      },
      next: {
        enabled: false,
        display: true,
        label: "Next",
      },
    },
    step3: {
      step: 3,
      cardTitle: { component: Title, title: "Payment Details" },
      ele1: {
        component: Input,
        type: "text",
        id: "card_info",
        label: "Card Number",
        name: "cardInfo",
        error:"Enter a 12 digit card number",
        regX:/^\d{12}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      ele2: {
        component: Input,
        type: "text",
        id: "expiry_date",
        label: "expiery Data",
        name: "expDate",
        error: "Enter Expiery in MM/YY format ",
        regX:/^(0[1-9]|1[0-2])\/\d{2}$/,
        onchange: ({ name, value }, step, regX) => {
          setFormData((prev) => {
            return {
              ...prev,
              [`step${step}`]: {
                ...prev[`step${step}`],
                [name]: value,
              },
              errors: {
                ...prev.errors,
                [name]: regX.test(value),
              },
            };
          });
        },
      },
      prev: {
        enabled: true,
        display: true,
        label: "Previous",
      },
      next: {
        enabled: false,
        display: true,
        label: "Submit",
      },
    },
  };

  return (
    <>
      <div className="container">
        <StepCard
          data={cardData[`step${stepIndex + 1}`]}
          formData={formData}
          setStepIndex={setStepIndex}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default App;
