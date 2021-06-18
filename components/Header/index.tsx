import React, { VFC } from 'react';

interface Props {}

const Header: VFC<Props> = ({}) => {
  return (
    <div className="flex justify-center items-center h-32 ">
      <div className="text-2xl">WebBeatMaker</div>
    </div>
  );
};

export default Header;
