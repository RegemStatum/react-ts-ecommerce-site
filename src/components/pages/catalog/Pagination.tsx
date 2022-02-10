import React, { FC } from "react";
import { useCatalogContext } from "../../../context/CatalogContext";
import { catalogActions } from "../../../types/catalogReducer";

const Pagination: FC = () => {
  const { state, dispatch } = useCatalogContext();
  const pagesIndexArr = Array.from({ length: state.pagesAmount });

  return (
    <div className="pagination">
      {pagesIndexArr.map((_, index) => {
        const pageIndex = index + 1;
        return (
          <button
            className={`btn-page ${
              state.curPage === pageIndex ? "active" : ""
            }`}
            key={index}
            onClick={() => {
              dispatch({
                type: catalogActions.SET_CURRENT_PAGE,
                payload: { pageIndex },
              });
            }}
          >
            {pageIndex < 10 ? `0${pageIndex}` : pageIndex}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
