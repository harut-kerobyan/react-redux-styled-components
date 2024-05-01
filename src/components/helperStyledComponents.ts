import styled from "styled-components";

export const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;

  th {
    padding: 24px;
    text-align: left;
  }

  td {
    padding: 24px 12px;
  }

  td + td {
    padding: 24px 12px;
    border-left: 1px solid #5f5f5f;
  }

  thead tr {
    background-color: #113d52;
  }

  tbody tr {
    background-color: #13191f;
  }

  tbody tr:nth-of-type(odd) {
    background-color: #1e1e29;
  }
`;

export const StyledWrapper = styled.div`
  padding: 24px;
  position: relative;
`;

export const StyledHead = styled.div`
  background: #13191f;
  padding: 8px 24px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-end;

  div {
    border: 1px solid #5f5f5f;
    display: flex;
    border-radius: 5px;
  }

  img {
    width: 24px;
    height: 24px;
    background: transparent;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.3;
  }

  img.active {
    background: #1084c9;
    opacity: 1;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  margin-bottom: 48px;
`;

export const Statuses = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const Loader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const StatusCircle = styled.span`
  background: ${({ color }) => color || "#fff"};
  border-radius: 50%;
  display: inline-block;
  width: 12px;
  height: 12px;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const Pagination = styled.div`
  margin-top: 36px;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
    }

    .next,
    .previous,
    .selected {
      color: #0f79b6;
    }

    .selected {
      border: 1px solid #0f79b6;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: initial;
    }
  }
`;