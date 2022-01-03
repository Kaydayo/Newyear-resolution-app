import React, { useState, useEffect } from 'react'

function App() {
  const [isShow, setIsShow] = useState(false);
  const [getData, setGetData] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [isModal, setIsModal] = useState(false)
  const [result, setResult] = useState(0)
  const handleShow = () => {
    setIsShow(!isShow)
  }

  const handleData = (data) => {
    setGetData(data)
  }

  const deleteResolution = (id) => {
    const resolution = getData.filter(data => data.id !== id)
    setGetData(resolution)
  }
  const handleModal = (data) => {
    setIsModal(!isModal)
    setResult((data.will * 20 + data.rate * 10 + 100) / 4)
  }

  let num = getData.length
  console.log(num)



  useEffect(() => {
    if (getData) {
      localStorage.setItem('data', JSON.stringify(getData))
    } else {
      localStorage.setItem('data', JSON.stringify([]))
    }


  }, [num])




  return (
    <div className="container">
      <h2>My New year resolution{num > 1 ? 's'.toLowerCase() : ''}</h2>
      <div className="ruler"></div>
      {!isShow && <button className="btn" onClick={handleShow}>Create New Year Resolution + </button>}
      {isShow && <FormFIll handleShow={handleShow} getData={handleData} />}
      {getData.map(data => {
        return <div className='set-contain' key={data.id}><div className='item item-3' >
          <h3>{data.title} </h3>
          <p>{data.content}</p>
          <span className="del-resolution" onClick={() => deleteResolution(data.id)}>&times;</span>
          <div className="side">
            <button className="btn btn-no-mar" onClick={(e) => {
              e.preventDefault()
              return handleModal(data)
            }}>☑️</button>
          </div>
          {isModal && <div className="modal-back"><div className="modal">
            <span className='close-modal' onClick={(e) => {
              e.preventDefault()
              return handleModal(data)
            }}>&times;</span>
            <h4>This goal is</h4>
            <h1 style={{ color: result > 50 ? 'green' : 'red', marginTop: '1rem' }}>{result}% <span style={{ fontSize: '1rem', display: 'block', color: 'grey', fontWeight: '200' }}>achieveable</span></h1>
            <div><div className="outline"><div className="inline" style={{ height: '0.90rem', width: `${result}%`, backgroundColor: result > 50 ? 'green' : 'red', borderRadius: '1.5rem' }}></div></div><img src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/50/000000/external-award-online-learning-vitaliy-gorbachev-flat-vitaly-gorbachev.png" alt="champ" /></div>
            <h4 style={{ marginBottom: '1rem', marginTop: '1rem', color: 'grey', fontWeight: '200' }}>put the commitment into work champ</h4>
          </div>
          </div>}
        </div>
        </div>
      })}
    </div>
  );
}

const FormFIll = ({ handleShow, getData }) => {
  const [resolution, setResolution] = useState({ title: '', content: '', rate: 1, past: '', will: 1 })
  const [newResolutions, setNewResolutions] = useState(JSON.parse(localStorage.getItem('data')))

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setResolution({ ...resolution, [name]: value })
  }
  const handleValues = (e) => {
    const newRate = e.target.value
    const name = e.target.name
    if (newRate < 1) {
      setResolution({ ...resolution })
    } else if (newRate > 10) {
      setResolution({ ...resolution, [name]: 10 })
    } else {
      setResolution({ ...resolution, [name]: newRate })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (resolution.title && resolution.content) {
      const myResolution = { ...resolution, id: new Date().getTime().toString() }
      getData([...newResolutions, myResolution])
      setNewResolutions([...newResolutions, myResolution])
      setResolution({ title: '', content: '', rate: 1, past: '', will: 1 })
    }


  }


  return (
    <div className="resolution-form">
      <span className='close' onClick={() => handleShow()}>&times;</span>
      <form className='form'>
        <div className="form-control">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" value={resolution.title} onChange={handleChange} placeholder="e.g learn how to code..." />
        </div>
        <div className="form-control">
          <label htmlFor="content">Goals: </label>
          <textarea name="content" id="content" cols="30" rows="10" value={resolution.content} onChange={handleChange} placeholder="e.g learn web dev, master html & css..."></textarea>
        </div>
        <div className="form-control  form-control-2">
          <label htmlFor="rate"><p>How accomplishable is this resolution on a scale of 1-10 ?</p></label>
          <input type="number" name="rate" id="rate" value={resolution.rate} onChange={handleValues} />
        </div>
        <div className="form-control  form-control-2">
          <p>Ever accomplished such in the past ?</p>
          <div className='spread-checkbox' style={{ display: 'flex', gap: '4rem' }}>
            <div className='spread-checkbox-2' >
              <input type="radio" name="past" id="yes" value='yes' onClick={handleChange} />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className='spread-checkbox-2' >
              <input type="radio" name="past" id="no" value='no' onClick={handleChange} />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>
        <div className="form-control  form-control-2">
          <label htmlFor="will"><p>How much are willing to commit yourself to these resolution(on a scale of 1-10) ?</p></label>
          <input type="number" name="will" id="rating" value={resolution.will} onChange={handleValues} />
        </div>
        <button className="btn" onClick={handleSubmit}>save</button>
      </form>
    </div >
  )
}

export default App;
