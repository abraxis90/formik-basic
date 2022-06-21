import React from 'react';
import {useFormik} from 'formik';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
};

const inputWrapperStyle = {
  display: 'grid',
  gridTemplateColumns: 'max-content max-content',
  gridTemplateRows: '1fr 1fr',
  marginBottom: '8px'
};

const labelStyle = {
  paddingRight: '4px'
};

const errorStyle = {
  gridColumnStart: '2'
};

const setValidationErrors = (email, password) => {
  const errors = {};
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email) {
    errors.email = 'Field required';
  }
  else if (!emailRegex.test(email)) {
    errors.emailFormat = 'Username should be an email';
  }
  if (!password) {
    errors.password = 'Field required';
  }

  return errors;
};

function App() {
  const formik = useFormik(
      {
        initialValues: {
          email: '',
          password: ''
        },
        onSubmit: (values) => {
          console.log('form', values);
          const errors = setValidationErrors(values.email, values.password);
          if (Object.keys(errors).length === 0) {
            alert('Login Successful');
          }
        },
        validate: ({email, password}) => {
          return setValidationErrors(email, password);
        }
      }
  );

  return (
      <div>
        <form style={formStyle} onSubmit={formik.handleSubmit}>

          {/* Email */}
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Username:</label>
            <input id="emailField" name="email" type="text"
                   value={formik.values.email}
                   onChange={formik.handleChange}/>
            {formik.errors.email && <div id="emailError" style={errorStyle}>{formik.errors.email}</div>}
            {formik.errors.emailFormat && <div id="emailError" style={errorStyle}>{formik.errors.emailFormat}</div>}
          </div>

          {/* Password */}
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Password:</label>
            <input id="pswField" name="password" type="password"
                   value={formik.values.password}
                   onChange={formik.handleChange}/>
            {formik.errors.password && <div id="pswError" style={errorStyle}>{formik.errors.password}</div>}
          </div>

          <button id="submitBtn" type="submit">Submit</button>
        </form>
      </div>
  );
}

export default App;
