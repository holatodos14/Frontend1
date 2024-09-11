import { Route, Switch } from 'wouter'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Dashboard from './pages/users/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/Login'
import ReportIncident from './pages/users/ReportIncident'
import ProtectedRoute from './pages/ProtectedRoute'
import NotFound from './pages/NotFound'  // Optional: for handling 404 errors

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="p-4">
        <Switch>
          <Route path="/" component={Login} />
          
          <ProtectedRoute>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/report-incident" component={ReportIncident} />
              <Route path="/admin/dashboard" component={AdminDashboard} />
              
            </Switch>
          </ProtectedRoute>
          
          <Route path="/404" component={NotFound} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </AuthProvider>
  )
}

export default App
