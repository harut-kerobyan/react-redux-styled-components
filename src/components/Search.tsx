import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSearch } from "../store/offersSlice";

const SearchFieldWrap = styled.div`
  border: 1px solid #5f5f5f;
  border-radius: 20px;
  background: rgb(255 255 255 / 18%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    color: #fff;
  }
`;

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearch({search: searchValue}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchFieldWrap>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFFFFF"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </svg>
        <input
          type="text"
          placeholder="Search in result"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </SearchFieldWrap>
    </form>
  );
};

export default Search;
