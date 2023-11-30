import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import tw from "tailwind-styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { api } from "./Api/apiRoutes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dragged, setDragged] = useState(0);

  const navigate = useNavigate();

  function handleDragDelete() {
    deleteTask(dragged);
  }

  const deleteTask = async (id) => {
    await axios.delete(`${api}${id}`);
    setRefresh(!refresh);
    setDragged(0);
  };

  const getAllTasks = async () => {
    const { data } = await axios.get(api);
    console.log(data);
    setTask(data);
  };

  useEffect(() => {
    getAllTasks();
  }, [refresh]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <Wrapper className="background">
      <Header setRefresh={setRefresh} refresh={refresh} />
      <Container>
        <TaskList
          tasks={task.filter((i) => i.state === 1)}
          setDragged={setDragged}
          dragged={dragged}
          heading={"Not Started"}
          posX={-200}
          posY={200}
          setRefresh={setRefresh}
          refresh={refresh}
          num={1}
        />
        <TaskList
          tasks={task.filter((i) => i.state === 2)}
          setDragged={setDragged}
          dragged={dragged}
          heading={"In Progress"}
          posX={-400}
          posY={400}
          setRefresh={setRefresh}
          refresh={refresh}
          num={2}
        />
        <TaskList
          tasks={task.filter((i) => i.state === 3)}
          setDragged={setDragged}
          dragged={dragged}
          heading={"In Review"}
          posX={-600}
          posY={600}
          setRefresh={setRefresh}
          refresh={refresh}
          num={3}
        />
        <TaskList
          tasks={task.filter((i) => i.state === 4)}
          setDragged={setDragged}
          dragged={dragged}
          heading={"Completed"}
          posX={-800}
          posY={800}
          setRefresh={setRefresh}
          refresh={refresh}
          num={4}
        />
      </Container>
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
          duration: 0.3,
          delay: 2.5,
        }}
        className="text-white text-lg ml-6 bg-[#EC4899] pl-8 pt-8 pb-4 pr-4 hover:pl-10 hover:pt-10 hover:pr-6 hover:pb-6 hover:text-xl z-50 duration-300 rounded-tl-full rounded-br-none absolute -right-2 -bottom-2 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDragDelete(e)}
      >
        <FaTrashAlt />
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = tw.main`
bg-[#0B1120] h-screen w-screen flex flex-col lg:px-24 sm:px-14 relative overflow-hidden backdrop-filter backdrop-blur-xl bg-opacity-95
`;
// select-none
const Container = tw.section`justify-between h-[85%] gap-12 sm:grid sm:grid-cols-2 lg:flex lg:flex-row overflow-y-scroll sm:py-8 lg:py-0 scroll-smooth
`;

export default Home;

// blue - > #38BDF8
// pink- > #EC4899
// gray -> #334155
// light gray -> #475569
