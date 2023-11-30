import React from "react";
import tw from "tailwind-styled-components";

const Users = ({name="-"}) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
};

const Name = tw.div`bg-[#38BDF8] text-white cursor-pointer shadow-inner text-md font-bold tracking-wide w-8 h-8 flex justify-center items-center rounded-[50%]`;
const Wrapper = tw.section`z-50 shadow-lg w-fit h-fit rounded-full p-2 flex flex-col justify-start items-center border-2 border-gray-900 overflow-hidden bg-[#38bff826]
`;

export default Users;
