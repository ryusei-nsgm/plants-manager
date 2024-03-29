import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import '../App.css';
import { db, auth } from "../firebase";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import { addDoc, collection, onSnapshot, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';

import { FormControl, Table, TextField, Button, TableBody, TableRow, TableContainer, TableCell, TableHead, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  table: {
    marginTop: 20,
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#90ee90",
  },
}));

function Home() {
  const classes = useStyles();

  const [plants, setPlants] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputInterval, setInputInterval] = useState();
  const [inputLastDay, setInputLastDay] = useState();
  
  const plantData = collection(db, "plants");
  useEffect(() => {
    onSnapshot(plantData, (QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        interval: doc.data().interval,
        lastDay: dayjs(doc.data().lastDay.toDate()).format('YYYY/MM/DD'),
      }));
      setPlants(data);
    })
  }, []);

  // firestore にデータを追加
  const newPlant = ()=>{
    addDoc(plantData,{
      name: inputName,
      interval: inputInterval,
      lastDay: new Date(inputLastDay),
    });
    setInputName('');
    setInputInterval('');
    setInputLastDay('');
  }

  // 最終水やり日の更新
  const updateLastDay = (id)=>{
    const docRef = doc(db, "plants", id)
    updateDoc(docRef,{
      lastDay: serverTimestamp()
    })
  }

  // 植物のデータ削除
  const deletePlant = (id)=>{
    deleteDoc(doc(db, "plants", id));
  }

  // ログイン判断
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="Home">
        <div className='logoutBar'>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div className={classes.form}>
          <FormControl>
            <TextField
              InputLabelProps={{
                shrink:true,
              }}
              label="名前"
              value={inputName}
              onChange={(e)=>setInputName(e.target.value)}
            />
            <TextField
              InputLabelProps={{
                shrink:true,
              }}
              inputProps={{ pattern: "^[0-9]+$" }}
              label="水やり間隔(日数)"
              type="number"
              onChange={(e)=>setInputInterval(e.target.value)}
            />
            <TextField
              InputLabelProps={{
                shrink:true,
              }}
              label="最後に水をあげた日"
              type="date"
              onChange={(e)=>setInputLastDay(e.target.value)}
            />
          <Button color="default" variant="contained" onClick={() => newPlant()} >追加</Button>
          </FormControl>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead  className={classes.tableHead}>
                <TableCell>名前</TableCell>
                <TableCell>水やり間隔</TableCell>
                <TableCell>最後に水をあげた日</TableCell>
                <TableCell>次にあげる日</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                {plants.map((plant) => (
                  <TableRow key={plant.name}>
                    <TableCell>{plant.name}</TableCell>
                    <TableCell>{plant.interval} 日</TableCell>
                    <TableCell>{plant.lastDay}</TableCell>
                    <TableCell>{dayjs(plant.lastDay).add(plant.interval,'d').format('YYYY/MM/DD')} </TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" onClick={() => updateLastDay(plant.id)} >水やり</Button>
                    </TableCell>
                    <TableCell>
                      <Button color="secondary" variant="contained" onClick={() => deletePlant(plant.id)} >削除</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default Home;