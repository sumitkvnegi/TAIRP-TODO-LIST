import React from 'react'
import tw from 'tailwind-styled-components'
import {CgAdd} from 'react-icons/cg'

const AddNew = ({createNewTask, input, setInput}) => {
  return (
    <Wrapper>
        <Input type='text' placeholder='Add New Task...' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <CgAdd size={20} color='#ddd' onClick={createNewTask}/>
    </Wrapper>
  )
}

const Wrapper = tw.div`w-full flex justify-center px-2 py-1.5 bg-[#334155] items-center backdrop-filter backdrop-blur-sm bg-opacity-60 rounded-sm
shadow-xl  border-[1px] border-gray-900`

const Input = tw.input`px-2 py-1 rounded-sm bg-transparent border-[0px] border-[#47556950] w-[90%] focus:outline-none text-sm text-white mr-4`

export default AddNew
