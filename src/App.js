import React, {useState, useEffect, useMemo, useCallback} from 'react';


function App() {
  
  const [listTec, setListTec] = useState([
  ]);
  
  let lastID = localStorage.getItem("lastID") ? parseInt(localStorage.getItem("lastID")) : 1
   
 console.log('Last => ', lastID)
  
  const [dado, setDado] = useState({
    id: lastID,
    value: ''
  });
  
 
  
 const handleAdd = useCallback(() => {
  setListTec([...listTec,dado])
  setDado({
    value: '',
  });
  let proxId = lastID + 1

  localStorage.setItem("lastID", JSON.stringify(proxId))
 }, [dado,listTec])
 
  //ComponentDidMount
  useEffect(() => {
    const tech = localStorage.getItem('tech');
    if(tech) {
      setListTec(JSON.parse(tech))
    }
  },[])
  

  //ComponentDidUpdate 
  useEffect(() => {
    
    localStorage.setItem('tech', JSON.stringify(listTec))
    
  },[listTec])
  const techSize = useMemo(() => listTec.length, [listTec])

  return (
    <>
    <ul>
      {listTec.map(element => (
        <li key={element.id}>{element.value}</li>
      ))}
      
    </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br/>
    <input type="text" onChange={event => setDado({id: lastID , value: event.target.value})} value={dado.value}/>
    <button onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
