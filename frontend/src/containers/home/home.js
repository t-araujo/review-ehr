import './home.css'
import React, { useState, useEffect } from "react"
import { logout } from "../../actions/auth";
import { getAllCases } from "../../actions/cases";
import { getAllConditions } from "../../actions/conditions";
import { setDecision } from "../../actions/cases-decisions";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [selectedLabel, setSelectedLabel] = useState('')
  const [currentCase, setCurrentCase] = useState({})
  const [casesToAnalize, setCasesToAnalize] = useState([])
  const [conditionsToSet, setConditionsToSet] = useState([])

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { cases } = useSelector(state => state.cases);
  const { conditions } = useSelector(state => state.conditions);
  const { user } = useSelector(state => state.auth);
  const { decisions } = useSelector(state => state.decisions);

  useEffect(() => {
    dispatch(getAllCases())
    dispatch(getAllConditions())
  }, [])

  useEffect(() => {
    if(cases) {
      setCasesToAnalize(cases)
    }
  }, [cases, dispatch])

  useEffect(() => {
    if(conditions) {
      setConditionsToSet(conditions)
    }
  }, [conditions, dispatch])

  useEffect(() => {
    if(casesToAnalize.length > 0) {
      setCurrentCase(casesToAnalize[0])
    }
  }, [casesToAnalize])

  useEffect(() => {
    if(decisions.next_decision) {
      casesToAnalize.shift()
      setCasesToAnalize(casesToAnalize)
      if(casesToAnalize.length > 0) {
        setCurrentCase(casesToAnalize[0])
      } else {
        setCurrentCase([])
      }
    }
  }, [decisions, casesToAnalize])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const handleNextCase = (e) => {
    e.preventDefault()
    if(selectedLabel === '') {
      /* setMEssage */
      return
    }

    dispatch(setDecision(user.id, currentCase._id, selectedLabel))
  }

  const handleSelectChange = ({ target }) => {
    setSelectedLabel(target.value)
  }

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="">
      <header className='casesHeader d-flex align-items-center flex-row-reverse pr-4'>
        <div className='ml-2'>
          <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
        </div>
        <div className='mr-3'>
          Logged In as: {user? user.title : ''} {user ? user.name : ''}
        </div>
      </header>

      <div className='body container-fluid'>
        <div className='description m-3'>
          <p className=''>Please review this case</p>
          <div className='casesDescriptions p-3'>
            {currentCase.condition ? currentCase.condition : 'You Are Done'}
          </div>
        </div>
        <div className='action m-3'>
          <div className='conditions'>
            <p>{'Select condition'}</p>
            <select onChange={handleSelectChange} className='form-select selectCondition' multiple aria-label='multiple select example'>
              {conditionsToSet.map((element, idx) => {
                return element.description ? (<option key={idx} value={element.description}>{element.description}</option>)  : (null);
              })
              }
            </select>
          </div>
          <div className='nextCase mt-5'>
            <button onClick={handleNextCase} disabled={currentCase.condition ? false : true} className='btn btn-primary'>Next Case</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
