import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// 공통
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import MyPage from "./pages/User/MyPage";
import ModifyForm from "./pages/User/ModifyForm";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// 일반사용자
import Membership from "./pages/Membership/Membership";
import MembershipList from "./pages/Membership/MembershipList";
import MembershipDetail from "./pages/Membership/MembershipDetail";
import Reservation from "./pages/Reservation/Reservation";
// import ReservationStatus from "./pages/Reservation/ReservationStatus";
import ReservationHistory from "./pages/Reservation/ReservationHistory";
import Insurance from "./pages/Insurance/Insurance";
import InsuranceList from "./pages/Insurance/InsuranceList";
import InsuranceDetail from "./pages/Insurance/InsuranceDetail";
import InsuranceSignup1 from "./pages/Insurance/InsuranceSignup1";
import InsuranceSignup2Day from "./pages/Insurance/InsuranceSignup2Day";
import InsuranceSignup2Long from "./pages/Insurance/InsuranceSignup2Long";
import InsuranceSignup3 from "./pages/Insurance/InsuranceSignup3";
import InsuranceSignup4 from "./pages/Insurance/InsuranceSignup4";
import InsuranceSignup5 from "./pages/Insurance/InsuranceSignup5";
// 골프장 운영자
import BusinessMain from "./pages/Business/BusinessMain";
// import MonthStatus from "./pages/Business/MonthStatus";
// import SalesDashboard from "./pages/Business/SalesDashboard";
import CostManagement from "./pages/Business/CostManagement";
import RegisterCost from "./pages/Business/RegisterCost";
import EditCost from "./pages/Business/EditCost";
import CashFlowDashboard from "./pages/Business/components/CashFlowDashboard";
import FinanceMain from "./pages/Finance/FinanceMain";
import FinancialStatementManagement from "./pages/Finance/FinancialStatementManagement";
import LoanMain from "./pages/Loan/LoanMain";
import LoanHistory from "./pages/Loan/LoanHistory";
import LoanProduct from "./pages/Loan/LoanProduct";
import LoanProductDetail1 from "./pages/Loan/LoanProductDetail1";
import LoanProductDetail2 from "./pages/Loan/LoanProductDetail2";
import LoanProductDescription1 from "./pages/Loan/LoanProductDescription1";
import LoanProductDescription2 from "./pages/Loan/LoanProductDescription2";
import ApplyLoan from "./pages/Loan/ApplyLoan";
import ConfirmLoan from "./pages/Loan/ConfirmLoan";

// import Dashboard from "./pages/EntranceFee/Dashboard";
// import Investment from "./pages/EntranceFee/Investment";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <div className="root-wrap">
          <Routes>
            {/* 공통 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/modifyForm" element={<ModifyForm />} />

            {/* 일반 사용자 */}
            <Route path="/membership" element={<Membership />} />
            <Route path="/membershipdetail" element={<MembershipDetail />} />
            <Route path="/membershiplist" element={<MembershipList />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route
              path="/reservationHistory"
              element={<ReservationHistory />}
            />
            {/* <Route path="/reservationStatus" element={<ReservationStatus />} /> */}
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/insuranceList" element={<InsuranceList />} />
            <Route path="/insuranceDetail" element={<InsuranceDetail />} />
            <Route path="/insuranceSignup1" element={<InsuranceSignup1 />} />
            <Route
              path="/insuranceSignup2day"
              element={<InsuranceSignup2Day />}
            />
            <Route
              path="/insuranceSignup2long"
              element={<InsuranceSignup2Long />}
            />
            <Route path="/insuranceSignup3" element={<InsuranceSignup3 />} />
            <Route path="/insuranceSignup4" element={<InsuranceSignup4 />} />
            <Route path="/insuranceSignup5" element={<InsuranceSignup5 />} />

            {/* 골프장 운영자 */}
            <Route path="/businessMain" element={<BusinessMain />} />
            <Route path="/costManagement" element={<CostManagement />} />
            <Route path="/registerCost" element={<RegisterCost />} />
            <Route path="/editCost" element={<EditCost />} />
            <Route path="/cashFlowDashboard" element={<CashFlowDashboard />} />
            <Route path="/financeMain" element={<FinanceMain />} />
            <Route
              path="/financialStatementManagement"
              element={<FinancialStatementManagement />}
            />
            <Route path="/loanMain" element={<LoanMain />} />
            <Route path="/loanHistory" element={<LoanHistory />} />
            <Route path="/loanProduct" element={<LoanProduct />} />
            <Route
              path="/loanProductDetail1"
              element={<LoanProductDetail1 />}
            />
            <Route
              path="/loanProductDetail2"
              element={<LoanProductDetail2 />}
            />
            {/* <Route
              path="/loanProductDescription1"
              element={<LoanProductDescription1 />}
            />
            <Route
              path="/loanProductDescription2"
              element={<LoanProductDescription2 />}
            /> */}
            <Route path="/applyLoan" element={<ApplyLoan />} />
            <Route path="/confirmLoan" element={<ConfirmLoan />} />
            {/* <Route path="/mainDashboard" element={<MainDashboard />} /> */}
            {/* <Route path="/salesDashboard" element={<SalesDashboard />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investment" element={<Investment />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
