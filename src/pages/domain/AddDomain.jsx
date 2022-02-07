import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase';
import DefaultLayout from '../../layout/DefaultLayout';
import Input from '../../components/basic/Input'
import Button from '../../components/basic/Button'
import "react-datepicker/dist/react-datepicker.css";
import '../../assets/scss/pages/AddDomain.scss'

const AddDomain = () => {
  ///States
  const [domain, setDomain] = useState("");
  const [domainProvider, setDomainProvider] = useState("");
  const [date, setDate] = useState();
  const [alert, setAlert] = useState("");

  ///Data sender to firestore
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'domains'), {
        domain: domain,
        domainProvider: domainProvider,
        validUntil: date,
        createdAt: Timestamp.now()
      })
      setDomain("")
      setDomainProvider("")
      setDate()
      setAlert("You have successfully added a domain.")
    } catch (error) {
      setAlert(error)
    }
  }

  return (
    <DefaultLayout navbar>
      <div className='DashboardHeader'>
        Add Domain
      </div>

      <form onSubmit={handleSubmit}>
        {alert && <div className='Alert'>{alert}</div>}
        <div className='FormContainer'>
          <Input onChange={v => setDomain(v)} value={domain} placeholder={'Domain'} required />
          <Input onChange={v => setDomainProvider(v)} value={domainProvider} placeholder={'Domain Provider'} required />
          <div className='DateWrapper'>
            <DatePicker
              className='Input'
              selected={date}
              placeholderText="Valid Until"
              onChange={(d) => setDate(d)}
              required />
          </div>
        </div>
        <Button submit full>Add Domain</Button>
      </form>

    </DefaultLayout>
  );
};

export default AddDomain;
