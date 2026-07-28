import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDocters from '../components/TopDocters';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div className="space-y-12 sm:space-y-16">
      <Header />
      <SpecialityMenu />
      <TopDocters />
      <Banner />
    </div>
  );
};

export default Home;