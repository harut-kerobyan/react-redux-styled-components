import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import options from "../icons/options.svg";
import square from "../icons/dotted-square.svg";
import arrow from "../icons/down-arrow.png";
import { columnsState, OfferState } from "../store/types";
import { setOrder, setOrderBy } from "../store/offersSlice";

const ColHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  div {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .drag-icon {
    cursor: move;
  }

  .sort-item {
    cursor: pointer;
  }

  .sort-arrow {
    position: absolute;
    left: -16px;
    display: inline-block;
  }
`;

const TableColHead: FC<columnsState & { showIcons: boolean }> = ({
  title,
  dataIndex,
  showIcons,
}) => {
  const dispatch = useDispatch();
  const order = useSelector<OfferState, string | undefined>(
    (state) => state.offer.order,
  );
  const orderBy = useSelector<OfferState, string | undefined>(
    (state) => state.offer.orderBy,
  );

  const handleOrder = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    dispatch(setOrder({ order: order === "asc" ? "desc" : "asc" }));
    dispatch(setOrderBy({ orderBy: dataIndex }));
  };

  return (
    <th>
      <ColHead>
        <span>{title}</span>
        {showIcons ? (
          <div>
            {orderBy === dataIndex ? (
              <img
                src={arrow}
                className="sort-arrow"
                alt="icon"
                style={{
                  transform: order === "desc" ? "rotate(180deg)" : "initial",
                }}
              />
            ) : null}
            <img
              src={options}
              className="sort-item"
              alt="icon"
              title="Sort"
              onClick={handleOrder}
            />
            <img
              src={square}
              className="drag-icon"
              alt="icon"
              title="Move column"
              draggable={false}
            />
          </div>
        ) : null}
      </ColHead>
    </th>
  );
};

export default TableColHead;
