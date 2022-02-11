import React, { FC, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { useCatalogContext } from "../../../context/CatalogContext";

interface FilterElContainerProps {
  children: React.ReactNode;
  name: string;
}

const FilterElContainer: FC<FilterElContainerProps> = ({ children, name }) => {
  const { state } = useCatalogContext();

  const [isOpen, setIsOpen] = useState(true);
  const [isHide, setIsHide] = useState(false);

  const hideElement = () => {
    setIsHide(true);
  };

  useEffect(() => {
    if (state.isFilterSidebarOpen) {
      setIsHide(false);
    }
  }, [state.isFilterSidebarOpen]);

  return (
    <div className={`filter-el-container ${name} ${isHide ? "hide" : "show"}`}>
      <div className="control">
        <button
          type="button"
          className={`btn-control arrow ${isOpen ? "open" : "close"}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IoIosArrowDown />
        </button>
        <span>{name}</span>
        <button type="button" className="btn-control" onClick={hideElement}>
          <GrFormClose />
        </button>
      </div>
      <div className={`children-container ${isOpen ? "open" : "close"}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterElContainer;
