import React from 'react';
import './Header.css';
import Head from './Head';
import Search from './Search';
import Navbar from './Navbar';

const Header = ({ CartItem, searchInput, setSearchInput }) => {
  return (
    <>
      <Head />
      <Search
        CartItem={CartItem}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Navbar />
    </>
  );
};

export default Header;
