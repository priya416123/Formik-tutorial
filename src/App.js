import React from 'react';
import { withFormik,Form, Field } from 'formik';
import Yup from 'yup'

const App=({
  values,
  // handleChange
  // handleSubmit
  errors,
  touched,
  isSubmitting
})=>(
  // <form onSubmit={handleSubmit}>
  <Form>
    {/* <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/> */}
    <div>
  {touched.email && errors.email && <p>{errors.email}</p>}
    <Field type="email" name="email" placeholder="Email"/>
    </div>
    <div>
    {touched.password && errors.password && <p>{errors.password}</p>}
    <Field type="password" name="password" placeholder="Password"/>
    </div>
    <label>
    <Field type="checkbox" name="newsletter" checked={values.newsletter}/>
    Join our newsletter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
)
const FormikApp= withFormik({
  mapPropsToValues({email,password,newsletter,plan}){
    return{
      email: email || '',
      password: password || '',
      newletter: newsletter || false,
      plan: plan || 'free'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(9,'Password must be 9 characters or longer').required('Password is required')
  }),
  handleSubmit(values, { resetForm,setErrors,setSubmitting}){
    setTimeout(()=>{
      if(values.email === 'andrew@test.io'){
        setErrors({ email: 'That email is already taken'})
      } else{
        resetForm()
      }
      setSubmitting(false)
    },2000)
    // console.log(values)
  }
})(App)
export default FormikApp;
