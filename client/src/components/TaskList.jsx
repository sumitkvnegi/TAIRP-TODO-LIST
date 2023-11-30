import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { motion } from "framer-motion";
import dateFormat from 'dateformat';
import { MdEditSquare } from 'react-icons/md';
import axios from "axios";
import { api } from "../Api/apiRoutes";

const TaskList = ({ heading, dragged, setDragged, tasks, posX, posY, setRefresh, refresh, num }) => {
  const [toggle, setToggle] = useState(false);
  const [changed, setChanged] = useState("");
  function handleDrag(id) {
    setDragged(id);
  }

  const updateTask = async (e, id, state) => {
    console.log(e.code);
    if((changed) && (e.code == "Enter")){
      const {data} = await axios.patch(`${api}${id}`, {
        input: changed,
        state: state,
      });
      console.log(data);
      setToggle(!toggle);
      setRefresh(!refresh);
    }
  }

  const changeState = async (e, n) => {
    await axios.patch(`${api}${dragged}`, {
      state: n,
    });
    console.log(dragged);
    setDragged(0);
    setRefresh(!refresh);
  }

  return (
    <motion.div
      initial={{
        x: posX,
        y: posY,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1,
        delay: 1.2,
      }}
      className="bg-[#1E293B] w-full h-[90%] rounded-sm text-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-xl border-[1px] border-gray-900
      "
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => changeState(e, num)}
    >
      <Heading>{heading}</Heading>
      <Container>
        {tasks.map((task)=>(
          <List draggable={true} onDragStart={() => handleDrag(task._id)} key={task._id}>
            <TaskMessage
            value={toggle ? changed : task.input}
            onChange={(e) => {
              setChanged(e.target.value);
            }}
            disabled={!(toggle) ? true : false}
            className={toggle ? "text-yellow-300 blur-[1px]" : ""}
            onKeyDown={(e)=>updateTask(e, task._id, task.state)}
            />
            <MdEditSquare className="absolute bottom-2 cursor-pointer"
            onClick={(e)=>{
              setChanged(e.target.value);
              setToggle(!toggle);
            }}
            />
            <DateTime>{dateFormat(task.createdAt, "dddd, mmmm dS, yyyy, h:MM TT")}</DateTime>
          </List>
        ))}
      </Container>
    </motion.div>
  );
};

const Heading = tw.div`py-2 px-4 text-md font-semibold bg-[#38BDF8] rounded-sm backdrop-filter backdrop-blur-sm bg-opacity-80
`;

const Container = tw.div`overflow-scroll py-4 bg-transparent  overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-start`;

const List = tw.div`p-2 bg-[#475569] mx-4 my-2 rounded-sm backdrop-filter backdrop-blur-sm bg-opacity-80 cursor-grab active:cursor-grabbing text-xs font-thin shadow-xl hover:bg-[#ec489a96] flex flex-col gap-4 relative`;

const TaskMessage = tw.textarea`text-sm capitalize font-semi tracking-widest bg-transparent focus:outline-none resize-none`

const DateTime = tw.p`text-sky-300 text-[0.6rem] tracking-widest self-end
`
export default TaskList;
