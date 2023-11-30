import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import {FiFilter} from 'react-icons/fi'
import {BiSort} from 'react-icons/bi'
import AddNew from './AddNew'
import { motion } from "framer-motion";
import { api } from '../Api/apiRoutes'
import axios from 'axios'
import Users from './Users'

const Header = ({setRefresh, refresh}) => {

  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const createNewTask = async () => {
    const {data} = await axios.post(api, {
      input: input,
      state: 1,
    });
    console.log(data);
    setInput("");
    setRefresh(!refresh);
  };

  useEffect(()=>{
    setName(JSON.parse(localStorage.getItem("user")).name[0].toUpperCase());
  }, []);

  return (
    <motion.div
    initial={{
      scale: 0,
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    transition={{
      duration: 0.6,
    }}
    className='h-[20%] py-4 flex justify-between items-center gap-16'
    >
        <Logo>KanBan</Logo>
        <AddNew createNewTask={createNewTask} input={input} setInput={setInput}/>
        <Container>
            <Filter><FiFilter/></Filter>
            <Sort><BiSort/></Sort>
            {name && <Users name={name} />}
        </Container>
    </motion.div>
  )
}

const Logo = tw.div`font-semibold text-lg font-["Poppins"] text-white tracking-wide`
const Container = tw.div`flex gap-4 items-center justify-center`
const Filter = tw.div`text-md text-white bg-transparent p-3`
const Sort = tw.div`text-md text-white bg-transparent p-3`

export default Header

// 3aqeC2dIEzvJX8wL