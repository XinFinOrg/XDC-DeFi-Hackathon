import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import DashboardGrid from '../components/DashboardGrid';
import DashboardTable from '../components/DashboardTable';
import Navbar from '../components/Navbar';
const dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="App-main">
    <DashboardGrid />
    <DashboardTable />
  </div></>
  )
}

export default dashboard