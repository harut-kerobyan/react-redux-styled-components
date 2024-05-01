import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import ReactDragListView from "react-drag-listview";
import Switch from "./Switch";
import Search from "./Search";
import TableColHead from "./TableColHead";
import { fetchOffers, fetchOffersCount, setPage } from "../store/offersSlice";
import { Offer, OfferState, columnsState } from "../store/types";
import {
  FilterSection,
  Loader,
  NameWrapper,
  Pagination,
  StatusCircle,
  Statuses,
  StyledHead,
  StyledTable,
  StyledWrapper,
} from "./helperStyledComponents";
import filter from "../icons/filter.png";
import disableFilter from "../icons/disable-filter.png";

const statusColors = {
  approved: "#fff",
  pending: "yellow",
  declined: "tomato",
};

const initialColumns: columnsState[] = [
  {
    title: "USERNAME",
    dataIndex: "user",
  },
  {
    title: "EMAIL",
    dataIndex: "email",
  },
  {
    title: "CASE",
    dataIndex: "case",
  },
  {
    title: "REASON",
    dataIndex: "reason",
  },
  {
    title: "SUBMISSION DATE",
    dataIndex: "submissionDate",
  },
];

function Table() {
  const [showIcons, setShowIcons] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<String[]>([]);
  const [columns, setColumns] = useState<columnsState[]>(initialColumns);
  const dispatch = useDispatch<any>();
  const offers = useSelector<OfferState, Offer[]>(
    (state) => state.offer.offers,
  );
  const isLoading = useSelector<OfferState>((state) => state.offer.isLoading);
  const error = useSelector<OfferState>((state) => state.offer.error);
  const search = useSelector<OfferState, string>((state) => state.offer.search);
  const count = useSelector<OfferState, number>((state) => state.offer.count);
  const page = useSelector<OfferState, number>((state) => state.offer.page);
  const order = useSelector<OfferState, string | undefined>(
    (state) => state.offer.order,
  );
  const orderBy = useSelector<OfferState, string | undefined>(
    (state) => state.offer.orderBy,
  );

  const handlePageClick = (e: { selected: number }) => {
    dispatch(setPage({ page: e.selected + 1 }));
  };

  const dragProps = {
    onDragEnd(fromIndex: any, toIndex: any) {
      const tmpColumns = [...columns];
      const item = tmpColumns.splice(fromIndex, 1)[0];
      tmpColumns.splice(toIndex, 0, item);
      setColumns(tmpColumns);
    },
    nodeSelector: "th",
  };

  useEffect(() => {
    dispatch(
      fetchOffers({
        page,
        search,
        status: statuses.join("|") || undefined,
        order,
        orderBy,
      }),
    );
    dispatch(
      fetchOffersCount({
        page: 1,
        search,
        status: statuses.join("|") || undefined,
        order,
        orderBy,
      }),
    );
  }, [dispatch, search, statuses, page, order, orderBy]);

  return (
    <StyledWrapper>
      {isLoading ? <Loader>loading...</Loader> : null}
      <FilterSection>
        <Statuses>
          <Switch
            Label="Approved"
            onChange={(value) => {
              if (value) {
                setStatuses([...statuses, "approved"]);
              } else {
                setStatuses(statuses.filter((s) => s !== "approved"));
              }
            }}
          />
          <Switch
            Label="Pending"
            LabelColor="yellow"
            onChange={(value) => {
              if (value) {
                setStatuses([...statuses, "pending"]);
              } else {
                setStatuses(statuses.filter((s) => s !== "pending"));
              }
            }}
          />
          <Switch
            Label="Declined"
            LabelColor="tomato"
            onChange={(value) => {
              if (value) {
                setStatuses([...statuses, "declined"]);
              } else {
                setStatuses(statuses.filter((s) => s !== "declined"));
              }
            }}
          />
        </Statuses>
        <Search />
      </FilterSection>
      <StyledHead>
        <div>
          <img
            src={filter}
            className={showIcons ? "active" : ""}
            alt="icon"
            title="Show column actions"
            onClick={() => setShowIcons(true)}
          />
          <img
            src={disableFilter}
            className={!showIcons ? "active" : ""}
            alt="icon"
            title="Hide column actions"
            onClick={() => setShowIcons(false)}
          />
        </div>
      </StyledHead>
      <ReactDragListView.DragColumn {...dragProps}>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((c) => (
                <TableColHead
                  title={c.title}
                  dataIndex={c.dataIndex}
                  showIcons={showIcons}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {!error ? (
              offers.map((offer) => (
                <tr>
                  {columns.map((c) =>
                    c.dataIndex === "user" ? (
                      <td>
                        <NameWrapper>
                          <span>{offer.user}</span>
                          <StatusCircle
                            color={statusColors[offer.status]}
                            title={offer.status}
                          />
                        </NameWrapper>
                      </td>
                    ) : (
                      <td>{offer[c.dataIndex]}</td>
                    ),
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Not Found</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </ReactDragListView.DragColumn>
      <Pagination>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={count / 6}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
        />
      </Pagination>
    </StyledWrapper>
  );
}

export default Table;
