import { Router, Route, Switch } from 'wouter'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'  // This import should now work
import Login from './pages/Login'
import UserDashboard from './pages/users/Dashboard'
import ReportIncident from './pages/users/ReportIncident'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageIncidents from './pages/admin/ManageIncidents'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={UserDashboard} />
              <Route path="/report-incident" component={ReportIncident} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/admin/manage-incidents" component={ManageIncidents} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App