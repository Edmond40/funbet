import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/users/UserManagement';
import UserVerification from './pages/users/UserVerification';
import UserRestrictions from './pages/users/UserRestrictions';
import UserActivity from './pages/users/UserActivity';
import SportsManagement from './pages/sports/SportsManagement';
import MarketsOdds from './pages/sports/MarketsOdds';
import MatchesEvents from './pages/sports/MatchesEvents';
import LeaguesTournaments from './pages/sports/LeaguesTournaments';
import FinancialManagement from './pages/financial/FinancialManagement';
import BettingOperations from './pages/financial/BettingOperations';
import PaymentMethods from './pages/financial/PaymentMethods';
import FinancialReports from './pages/financial/FinancialReports';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import CampaignManagement from './pages/promotions/CampaignManagement';
import BonusCodes from './pages/promotions/BonusCodes';
import MarketingTools from './pages/promotions/MarketingTools';
import LoyaltyPrograms from './pages/promotions/LoyaltyPrograms';
import VirtualSports from './pages/virtual/VirtualSports';
import CasinoGames from './pages/virtual/CasinoGames';
import SupportTickets from './pages/support/SupportTickets';
import LiveChat from './pages/support/LiveChat';
import FAQManagement from './pages/support/FAQManagement';
import UserAnalytics from './pages/analytics/UserAnalytics';
import RiskManagement from './pages/analytics/RiskManagement';
import PerformanceReports from './pages/analytics/PerformanceReports';
import RegulatoryTools from './pages/compliance/RegulatoryTools';
import AuditTrails from './pages/compliance/AuditTrails';
import SecurityMonitoring from './pages/compliance/SecurityMonitoring';
import AMLTools from './pages/compliance/AMLTools';
import PlatformSettings from './pages/system/PlatformSettings';
import GameSettings from './pages/virtual/GameSettings';
import FeedbackAnalysis from './pages/support/FeedbackAnalysis';
import APIManagement from './pages/system/APIManagement';
import Maintenance from './pages/system/Maintenance';
import BackupRecovery from './pages/system/BackupRecovery';

// Auth components
import AdminLogin from './auth/AdminLogin';
import AdminSignup from './auth/AdminSignup';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes - No Layout */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />

      {/* Protected Admin Routes with Layout */}
      <Route path="/" element={
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      } />

      <Route path="/users" element={
        <AdminLayout>
          <UserManagement />
        </AdminLayout>
      } />
      <Route path="/users/verification" element={
        <AdminLayout>
          <UserVerification />
        </AdminLayout>
      } />
      <Route path="/users/restrictions" element={
        <AdminLayout>
          <UserRestrictions />
        </AdminLayout>
      } />
      <Route path="/users/activity" element={
        <AdminLayout>
          <UserActivity />
        </AdminLayout>
      } />

      {/* Sports & Markets */}
      <Route path="/sports" element={
        <AdminLayout>
          <SportsManagement />
        </AdminLayout>
      } />
      <Route path="/sports/markets" element={
        <AdminLayout>
          <MarketsOdds />
        </AdminLayout>
      } />
      <Route path="/sports/matches" element={
        <AdminLayout>
          <MatchesEvents />
        </AdminLayout>
      } />
      <Route path="/sports/leagues" element={
        <AdminLayout>
          <LeaguesTournaments />
        </AdminLayout>
      } />

      {/* Financial Management */}
      <Route path="/financial/transactions" element={
        <AdminLayout>
          <FinancialManagement />
        </AdminLayout>
      } />
      <Route path="/financial/operations" element={
        <AdminLayout>
          <BettingOperations />
        </AdminLayout>
      } />
      <Route path="/financial/payments" element={
        <AdminLayout>
          <PaymentMethods />
        </AdminLayout>
      } />
      <Route path="/financial/reports" element={
        <AdminLayout>
          <FinancialReports />
        </AdminLayout>
      } />

      {/* Analytics & Reports */}
      <Route path="/analytics/business" element={
        <AdminLayout>
          <AnalyticsDashboard />
        </AdminLayout>
      } />
      <Route path="/analytics/users" element={
        <AdminLayout>
          <UserAnalytics />
        </AdminLayout>
      } />
      <Route path="/analytics/risk" element={
        <AdminLayout>
          <RiskManagement />
        </AdminLayout>
      } />
      <Route path="/analytics/performance" element={
        <AdminLayout>
          <PerformanceReports />
        </AdminLayout>
      } />

      {/* Promotions & Bonuses */}
      <Route path="/promotions/campaigns" element={
        <AdminLayout>
          <CampaignManagement />
        </AdminLayout>
      } />
      <Route path="/promotions/codes" element={
        <AdminLayout>
          <BonusCodes />
        </AdminLayout>
      } />
      <Route path='/promotions/marketing' element={
        <AdminLayout>
          <MarketingTools/>
        </AdminLayout>
      }/>
      <Route path="/promotions/loyalty" element={
        <AdminLayout>
          <LoyaltyPrograms />
        </AdminLayout>
      } />

      {/* Virtual Sports & Games */}
      <Route path="/virtual/sports" element={
        <AdminLayout>
          <VirtualSports />
        </AdminLayout>
      } />
      <Route path="/virtual/casino" element={
        <AdminLayout>
          <CasinoGames />
        </AdminLayout>
      } />
      <Route path="/virtual/settings" element={
        <AdminLayout>
          <GameSettings />
        </AdminLayout>
      } />

      {/* Customer Support */}
      <Route path="/support/tickets" element={
        <AdminLayout>
          <SupportTickets />
        </AdminLayout>
      } />
      <Route path="/support/chat" element={
        <AdminLayout>
          <LiveChat />
        </AdminLayout>
      } />
      <Route path="/support/faq" element={
        <AdminLayout>
          <FAQManagement />
        </AdminLayout>
      } />
      <Route path="/support/feedback" element={
        <AdminLayout>
          <FeedbackAnalysis />
        </AdminLayout>
      } />

      {/* Compliance & Security */}
      <Route path="/compliance/regulatory" element={
        <AdminLayout>
          <RegulatoryTools />
        </AdminLayout>
      } />
      <Route path="/compliance/audit" element={
        <AdminLayout>
          <AuditTrails />
        </AdminLayout>
      } />
      <Route path="/compliance/security" element={
        <AdminLayout>
          <SecurityMonitoring />
        </AdminLayout>
      } />
      <Route path="/compliance/aml" element={
        <AdminLayout>
          <AMLTools />
        </AdminLayout>
      } />

      {/* System Configuration */}
      <Route path="/system/platform" element={
        <AdminLayout>
          <PlatformSettings />
        </AdminLayout>
      } />
      <Route path="/system/api" element={
        <AdminLayout>
          <APIManagement />
        </AdminLayout>
      } />
      <Route path="/system/maintenance" element={
        <AdminLayout>
          <Maintenance />
        </AdminLayout>
      } />
      <Route path="/system/backup" element={
        <AdminLayout>
          <BackupRecovery />
        </AdminLayout>
      } />

      {/* Catch all - redirect to admin dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
