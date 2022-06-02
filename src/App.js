import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './App.css';
import db from "./firebase";
import { collection, onSnapshot, } from "firebase/firestore";

function App() {
  const [plants, setPlants] = useState([]);
  
  useEffect(() => {
    // firestoreからデータ取得
    const plantData = collection(db, "plants");
    // getDocs(plantData).then((snapShot) => {
    //   setPlants(snapShot.docs.map((doc) => ({ ...doc.data() })))
    // });
    onSnapshot(plantData, (QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        interval: doc.data().interval,
        lastDay: dayjs(doc.data().lastDay.toDate()).format('YYYY/MM/DD'),
      }));
      setPlants(data);
    })
  }, [])

  return (
    <div className="App">
      <div>
        {plants.map((plant) => (
          <div key={plant.name}>
            <h1>{plant.name}</h1>
            <p>水やり間隔 {plant.interval} 日</p>
            <p>{plant.lastDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
