import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//pages
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
//
import Overview from './pages/Overview';
//
import Loans from './pages/Loans';
import LoanRequest from './pages/LoanRequest'
import LoanAll from './pages/LoanAll'
import LoanData from './pages/LoanData'
import Ontime from './pages/Ontime'
import Latethirty from './pages/Latethirty'
import Latesixty from './pages/Latesixty'
import Lateninety from './pages/Lateninety'
//
import Users from './pages/Users'
import UserDetails from './pages/UserDetails'
import UserID from './pages/UserID'
import UserLoanC from './pages/UserLoanC'
import UserLoanA from './pages/UserLoanA'
import UserLoanU from './pages/UserLoanU'
//
import Merchants from './pages/Merchants'
import MerchantDetails from './pages/MerchantDetails'
import MerchantCredits from './pages/MerchantCredits'
import MerchantDebits from './pages/MerchantDebits'
//
import Wallet from './pages/Wallet'
import WalletFund from './pages/WalletFund'
//
import Guarantors from './pages/Guarantors'
import GuarantorsA from './pages/GuarantorsA'
import GuarantorView from './pages/GuarantorView'
//
import Notifications from './pages/Notifications'
//
import SettingsPro from './pages/SettingsPro'
import SettingsAdd from './pages/SettingsAdd';
import SettingsAll from './pages/SettingsAll';
import ChangePass from './pages/ChangePass';


import Dragdrop2 from './components/Dragdrop2'
import Chart3 from './components/Chart3'


//css
import './App.css';




function App() {
  return (
    <div className="App">
      
      <h1 className="device"> Sorry you can't access the site on this device.</h1>

      <Router>
      
        <Route
          exact
          path="/"
          component={Login}
        />

        <Route
          path="/forgot"
          component={Forgotpassword}
        />

        <Route
          path="/overview"
          component={Overview}
        />

        <Route
          path="/loans"
          component={Loans}
        />

        <Route
          path="/loanrequest"
          component={LoanRequest}
        />

        <Route
          path="/loansall"
          component={LoanAll}
        />

        <Route
          path="/loandata"
          component={LoanData}
        />

        <Route
          path="/ontime"
          component={Ontime}
        />
        <Route
          path="/late30"
          component={Latethirty}
        />
        <Route
          path="/late60"
          component={Latesixty}
        />
        <Route
          path="/late90"
          component={Lateninety}
        />

        <Route
          path="/users"
          component={Users}
        />

        <Route
          path="/userdetails"
          component={UserDetails}
        />

        <Route
          path="/userid"
          component={UserID}
        />

        <Route
          path="/merchants"
          component={Merchants}
        />

        <Route
          path="/merchantdetails"
          component={MerchantDetails}
        />

        <Route
          path="/merchantcredits"
          component={MerchantCredits}
        />

        <Route
          path="/merchantdebits"
          component={MerchantDebits}
        />

        <Route
          path="/wallet"
          component={Wallet}
        />

        <Route
          path="/walletfund"
          component={WalletFund}
        />

        <Route
          path="/guarantors"
          component={Guarantors}
        />

        <Route
          path="/guarantorsa"
          component={GuarantorsA}
        />

        <Route
          path="/guarantorview"
          component={GuarantorView}
        />

        <Route
          path="/notifications"
          component={Notifications}
        />

        <Route
          path="/userloanc"
          component={UserLoanC}
        />

        <Route
          path="/userloana"
          component={UserLoanA}
        />

        <Route
          path="/userloanu"
          component={UserLoanU}
        />

        <Route
          path="/settings"
          component={SettingsPro}
        />

        <Route
          path="/settingsadd"
          component={SettingsAdd}
        />

        <Route
          path="/settingsall"
          component={SettingsAll}
        />

        <Route
          path="/changepass"
          component={ChangePass}
        />

        <Route
          path="/drop2"
          component={Dragdrop2}
        />

        <Route
          path="/chart3"
          component={Chart3}
        />

      </Router>
     
    </div>
  );
}

export default App;
