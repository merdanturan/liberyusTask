import React, { useState, useEffect } from 'react';
import moment from 'moment'
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase';

import DefaultLayout from '../layout/DefaultLayout'
import Button from '../components/basic/Button'
import '../assets/scss/pages/Dashboard.scss'



const Dashboard = () => {
  ////States
  const [domains, setDomains] = useState([])
  const [filteredDomains, setFilteredDomains] = useState([])

  ////Getting data on first load
  useEffect(() => {
    const q = query(collection(db, 'domains'), orderBy('validUntil'))
    onSnapshot(q, (querySnapshot) => {
      setDomains(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  ////Set data to state and redux when domains change
  useEffect(() => {
    setFilteredDomains(domains.filter(x => daysLeft(x.data.validUntil.seconds) <= 15))
  }, [domains])

  ////Calculate for days left
  const daysLeft = d => {
    return moment.unix(d).diff(Date.now(), 'days')
  }

  return (
    <DefaultLayout navbar>
      <div className='DashboardContainer'>

        <div className='DashboardHeader'>Welcome to Liberyus</div>

        <div className='DashboardText'>To add new domain</div>
        <Link to="/add"><Button full>Add Domain</Button></Link>

        <div className='divider'>or</div>

        <div className='DashboardText'>To view your domains</div>
        <Link to="/list"><Button full>View Domains</Button></Link>
      </div>

      <div>
        <div className='DashboardHeader'>Domain Alerts</div>
        <table className="CustomTable">
          <thead>
            <tr>
              <th width="40%">Domain</th>
              <th>Provider</th>
              <th>Valid Until</th>
              <th>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {filteredDomains.map(x => (
              <tr
                className={cx(
                  daysLeft(x.data.validUntil.seconds) < 16 && "danger"
                )}
                key={x.id}>

                <td>{x.data.domain}</td>
                <td>{x.data.domainProvider}</td>
                <td>{moment.unix(x.data.validUntil.seconds).format("MM/DD/YYYY")}</td>
                <td>{daysLeft(x.data.validUntil.seconds)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </DefaultLayout>
  );
};

export default Dashboard;
