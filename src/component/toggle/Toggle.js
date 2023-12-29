import React from "react";
import mbtogel from "../../assets/img/mb-togel.svg";
import SideBar from "../sidebar/SideBar";

const Toggle = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <img className="mt-1" src={mbtogel} onClick={handleOpenSidebar} />
    </div>
  );
};

export default Toggle;
