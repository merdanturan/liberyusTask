import React, { useState, useEffect } from 'react';
import moment from 'moment'
import DatePicker from "react-datepicker";
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

import { db } from '../../firebase';
import Modal from '../../components/basic/Modal';
import Button from '../../components/basic/Button';
import Input from '../../components/basic/Input'
import DefaultLayout from '../../layout/DefaultLayout';


const ListDomain = () => {
  ///States
  const { allDomains } = useSelector(state => state.data)
  const [domains, setDomains] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState();
  const [alert, setAlert] = useState("");
  ///Modal states
  const [domain, setDomain] = useState("");
  const [domainProvider, setDomainProvider] = useState("");
  const [date, setDate] = useState();

  ///Set data to state when alldomains change
  useEffect(() => {
    setDomains(allDomains)
  }, [allDomains])

  ///Modal opener
  const handleModal = x => {
    setModalOpen(true)
    setDomain(x.data.domain)
    setDomainProvider(x.data.domainProvider)
    setDate(moment.unix(x.data.validUntil.seconds)._d)
    setModalIndex(x.id)
  }

  ///Domain Updater
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'domains', modalIndex)
    try {
      await updateDoc(taskDocRef, {
        domain: domain,
        domainProvider: domainProvider,
        validUntil: date
      })
      setModalOpen(false)
      setDomain("")
      setDomainProvider("")
      setDate()
      setModalIndex()
    } catch (error) {
      setAlert(error)
    }
  }

  ///Domain Deleter
  const handleDelete = async (i) => {
    try {
      await deleteDoc(doc(db, 'domains', i))
    } catch (error) {
      setAlert(error)
    }
  }

  ///Calculate for days left
  const daysLeft = (d) => {
    return moment.unix(d).diff(Date.now(), 'days')
  }

  return (
    <DefaultLayout navbar>
      {alert && <div className='Alert'>{alert}</div>}

      <table className="CustomTable">
        <thead>
          <tr>
            <th width="40%">Domain</th>
            <th>Provider</th>
            <th>Valid Until</th>
            <th>Days Left</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {domains.map(x => (
            <tr
              className={cx(
                daysLeft(x.data.validUntil.seconds) < 100 && "safe",
                daysLeft(x.data.validUntil.seconds) < 61 && "mid",
                daysLeft(x.data.validUntil.seconds) < 16 && "danger"
              )}
              key={x.id}>

              <td>{x.data.domain}</td>
              <td>{x.data.domainProvider}</td>
              <td>{moment.unix(x.data.validUntil.seconds).format("MM/DD/YYYY")}</td>
              <td>{daysLeft(x.data.validUntil.seconds)}</td>
              <td><Button onClick={() => handleModal(x)}>Edit</Button></td>
              <td><Button onClick={() => handleDelete(x.id)}>Delete</Button></td>

            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen &&
        <Modal onClose={() => setModalOpen(false)} active={isModalOpen}>
          <form onSubmit={handleUpdate}>
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
            <Button submit full>Update Domain</Button>
          </form>
        </Modal>
      }

    </DefaultLayout>
  );
};

export default ListDomain;
