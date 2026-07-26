import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LayoutDashboard, Sprout, ShoppingCart, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import * as api from '@/lib/api';
import { StatCard, TabButton, LoadingState, EmptyState } from './shared';
import { CustomersTab, OrdersTab } from './AdminDashboard';

type Tab = 'overview' | 'customers' | 'orders' | 'profile';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-16">
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-poppins text-gray-900 dark:text-gray-100">Employee Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name}. Daily operations overview.</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={LayoutDashboard} label="Overview" />
          <TabButton active={tab === 'customers'} onClick={() => setTab('customers')} icon={Sprout} label="Customers" />
          <TabButton active={tab === 'orders'} onClick={() => setTab('orders')} icon={ShoppingCart} label="Orders" />
          <TabButton active={tab === 'profile'} onClick={() => setTab('profile')} icon={UserIcon} label="My Profile" />
        </div>

        {tab === 'overview' && <StaffOverview />}
        {tab === 'customers' && <CustomersTab />}
        {tab === 'orders' && <OrdersTab isStaffAll />}
        {tab === 'profile' && <MyProfile />}
      </div>
    </div>
  );
}

function StaffOverview() {
  const [stats, setStats] = useState<api.StaffStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchStaffStats()
      .then((res) => setStats(res.stats))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (!stats) return <EmptyState message="Stats unavailable." />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Customers" value={stats.farmers} icon={Sprout} />
      <StatCard label="Orders" value={stats.orders} icon={ShoppingCart} />
      <StatCard label="Products" value={stats.products} icon={LayoutDashboard} />
      <StatCard label="Seed Varieties" value={stats.seeds} icon={LayoutDashboard} />
    </div>
  );
}

function MyProfile() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<api.Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchMyEmployeeProfile()
      .then((res) => setEmployee(res.employee))
      .catch(() => {
        /* Not every staff account has a linked employee record (e.g. admins). */
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-lg">
      <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">My Profile</h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500 dark:text-gray-400">Name</dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 dark:text-gray-400">Email</dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{user?.email}</dd>
        </div>
        {employee && (
          <>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Position</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{employee.position ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Department</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{employee.department ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{employee.phone ?? '—'}</dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
}
