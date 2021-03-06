import React, {useState, useEffect} from 'react';
import './DashboardInfo.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Card from '../Card/Card.jsx'
import ModalAdd from '../Modals/ModalAdd/ModalAdd';

function DashboardInfo () {

  const items = {...localStorage};
  let arr = [];
  for (let i = 0; i < Object.values(items).length; i++) {
    (Object.keys(items)).find(function (element) {
      if ((element === ((JSON.parse(Object.values(items)[i])).name))) {
        arr.push(...(JSON.parse(Object.values(items)[i])).information)
      }  else {
        arr.push()
      }
    });
  }

  const [modalAdd, setModalAdd] = useState(false)
  const [modal, setModal] = useState(false)
  const [list, updateList] = useState(arr);

  const initialState = () =>
  localStorage.getItem(JSON.parse(Object.values(items)).name || null);
  const [initialValue, setInitialValue] = useState(initialState);
  
  let parseInitialState = JSON.parse(initialState())
  parseInitialState.information = list
  let updateLocalStorage = JSON.stringify(parseInitialState)
  const openModal = () => {
    setModalAdd(true)
  };

  useEffect(() => {
    localStorage.setItem(JSON.parse(Object.values(items)).name, updateLocalStorage)
  }, [updateLocalStorage]);


  return (
    <div className="container-dashboard">
      <h1 className="title-dashboard">Information</h1>
      <Link 
        className="link"
        to={{
          pathname: `/login`,
        }}
      >
        Log out
      </Link>
      <div>
      { list.map(item => (
            <div className="container-info">
              <Card
                key={item.name}
                name={item.name}
                password={item.password}
                sait={item.sait}
                arr={list}
                setModal={setModal}
                modal={modal}
                updateList={updateList}
                id={item.id}
                setInitialValue={ setInitialValue}
                updateLocalStorage={updateLocalStorage}
              />
            </div>
          ))
      }
      </div>
      <button 
        className="add"
        onClick={openModal}
      >
        Add new card
      </button>
      {modalAdd && 
          <div className="container-modal">
            <div className="card-modal">
              <ModalAdd
                onCancel={setModalAdd}
                list={list}
                updateList={updateList}
                setInitialValue={setInitialValue}
                updateLocalStorage={updateLocalStorage}
              />
            </div>
          </div>
        }
    </div>
  )
}

export default DashboardInfo;