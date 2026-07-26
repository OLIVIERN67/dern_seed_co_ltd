import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Sprout,
  Package,
  Wheat,
  ShoppingCart,
  MessageSquare,
  Star,
  Mail,
  Trash2,
  Pencil,
  Plus,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import * as api from '@/lib/api';
import {
  StatCard,
  TabButton,
  Modal,
  FormField,
  inputClass,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  IconButton,
  EmptyState,
  LoadingState,
  Th,
  Td,
  StatusBadge,
  RoleBadge,
} from './shared';

type Tab =
  | 'overview'
  | 'users'
  | 'employees'
  | 'customers'
  | 'products'
  | 'seeds'
  | 'orders'
  | 'testimonials'
  | 'messages';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-16">
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-poppins text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name}. Full system access.</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={LayoutDashboard} label="Overview" />
          <TabButton active={tab === 'users'} onClick={() => setTab('users')} icon={Users} label="Users" />
          <TabButton active={tab === 'employees'} onClick={() => setTab('employees')} icon={Briefcase} label="Employees" />
          <TabButton active={tab === 'customers'} onClick={() => setTab('customers')} icon={Sprout} label="Customers" />
          <TabButton active={tab === 'products'} onClick={() => setTab('products')} icon={Package} label="Products" />
          <TabButton active={tab === 'seeds'} onClick={() => setTab('seeds')} icon={Wheat} label="Seeds" />
          <TabButton active={tab === 'orders'} onClick={() => setTab('orders')} icon={ShoppingCart} label="Orders" />
          <TabButton active={tab === 'testimonials'} onClick={() => setTab('testimonials')} icon={Star} label="Testimonials" />
          <TabButton active={tab === 'messages'} onClick={() => setTab('messages')} icon={Mail} label="Messages" />
        </div>

        {tab === 'overview' && <OverviewTab />}
        {tab === 'users' && <UsersTab />}
        {tab === 'employees' && <EmployeesTab />}
        {tab === 'customers' && <CustomersTab />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'seeds' && <SeedsTab />}
        {tab === 'orders' && <OrdersTab isStaffAll />}
        {tab === 'testimonials' && <TestimonialsTab />}
        {tab === 'messages' && <MessagesTab />}
      </div>
    </div>
  );
}

// ---------------- Overview ----------------

function OverviewTab() {
  const [stats, setStats] = useState<api.AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchAdminStats()
      .then((res) => setStats(res.stats))
      .catch(() => toast.error('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (!stats) return <EmptyState message="Stats unavailable." />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Users" value={stats.users.total} icon={Users} />
      <StatCard label="Admins" value={stats.users.admins} icon={Users} />
      <StatCard label="Employees" value={stats.users.employees} icon={Briefcase} />
      <StatCard label="Customers" value={stats.users.customers} icon={Users} />
      <StatCard label="Registered Farms" value={stats.farmers} icon={Sprout} />
      <StatCard label="Products" value={stats.products} icon={Package} />
      <StatCard label="Seed Varieties" value={stats.seeds} icon={Wheat} />
      <StatCard label="Orders" value={stats.orders} icon={ShoppingCart} />
      <StatCard label="Unread Messages" value={stats.unreadMessages} icon={Mail} />
      <StatCard label="Unread Inquiries" value={stats.unreadInquiries} icon={MessageSquare} />
      <StatCard label="Testimonials Pending" value={stats.pendingTestimonials} icon={Star} />
    </div>
  );
}

// ---------------- Users ----------------

function UsersTab() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<api.ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalUser, setModalUser] = useState<api.ManagedUser | 'new' | null>(null);

  const load = () => {
    setLoading(true);
    api
      .listUsers()
      .then((res) => setUsers(res.users))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (u: api.ManagedUser) => {
    if (!confirm(`Delete user "${u.name}"? This cannot be undone.`)) return;
    try {
      await api.deleteUser(u.id);
      toast.success('User deleted');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete user');
    }
  };

  const handleToggleActive = async (u: api.ManagedUser) => {
    try {
      await api.updateUser(u.id, { is_active: u.is_active ? 0 : 1 });
      toast.success(u.is_active ? 'User deactivated' : 'User activated');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to update user');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">All Users</h2>
        <PrimaryButton onClick={() => setModalUser('new')}>
          <Plus className="w-4 h-4" /> New User
        </PrimaryButton>
      </div>
      {loading ? (
        <LoadingState />
      ) : users.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>
                    <RoleBadge role={u.role} />
                  </Td>
                  <Td>
                    <StatusBadge active={u.is_active} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconButton onClick={() => setModalUser(u)} title="Edit">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </IconButton>
                      <IconButton onClick={() => handleToggleActive(u)} title="Toggle active">
                        {u.is_active ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        {u.is_active ? 'Deactivate' : 'Activate'}
                      </IconButton>
                      {me?.id !== u.id && (
                        <DangerButton onClick={() => handleDelete(u)}>
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </DangerButton>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalUser && <UserFormModal initial={modalUser === 'new' ? null : modalUser} onClose={() => setModalUser(null)} onSaved={load} />}
    </div>
  );
}

function UserFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: api.ManagedUser | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<api.ManagedUser['role']>(initial?.role ?? 'user');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (initial) {
        const payload: Parameters<typeof api.updateUser>[1] = { name, email, role };
        if (password.trim()) {
          payload.password = password.trim();
        }
        await api.updateUser(initial.id, payload);
        toast.success('User updated');
      } else {
        await api.createUser({ name, email, password, role });
        toast.success('User created');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initial ? 'Edit User' : 'New User'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormField label="Full name">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
        </FormField>
        <FormField label="Email">
          <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormField>
        <FormField label={initial ? 'New Password (leave blank to keep current)' : 'Password'}>
          <input
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!initial}
            minLength={8}
            placeholder={initial ? '•••••••• (leave blank to keep current)' : ''}
          />
        </FormField>
        <FormField label="Role">
          <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as api.ManagedUser['role'])}>
            <option value="user">Customer (user)</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
          </select>
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" loading={saving}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Employees ----------------

function EmployeesTab() {
  const [items, setItems] = useState<api.Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<api.Employee | 'new' | null>(null);

  const load = () => {
    setLoading(true);
    api
      .listEmployees()
      .then((res) => setItems(res.employees))
      .catch(() => toast.error('Failed to load employees'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (item: api.Employee) => {
    if (!confirm(`Remove employee "${item.name}"?`)) return;
    try {
      await api.deleteEmployee(item.id);
      toast.success('Employee removed');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to remove employee');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Employees</h2>
        <PrimaryButton onClick={() => setModalItem('new')}>
          <Plus className="w-4 h-4" /> Add Employee
        </PrimaryButton>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No employees yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Department</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{it.name}</Td>
                  <Td>{it.position ?? '—'}</Td>
                  <Td>{it.department ?? '—'}</Td>
                  <Td>{it.phone ?? '—'}</Td>
                  <Td>
                    <StatusBadge active={it.is_active} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconButton onClick={() => setModalItem(it)}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </IconButton>
                      <DangerButton onClick={() => handleDelete(it)}>
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </DangerButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalItem && <EmployeeFormModal initial={modalItem === 'new' ? null : modalItem} onClose={() => setModalItem(null)} onSaved={load} />}
    </div>
  );
}

function EmployeeFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: api.Employee | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    phone: initial?.phone ?? '',
    email: initial?.email ?? '',
    position: initial?.position ?? '',
    department: initial?.department ?? '',
    hire_date: initial?.hire_date?.slice(0, 10) ?? '',
    salary: initial?.salary?.toString() ?? '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, salary: form.salary ? Number(form.salary) : null };
    try {
      if (initial) {
        await api.updateEmployee(initial.id, payload);
        toast.success('Employee updated');
      } else {
        await api.createEmployee(payload);
        toast.success('Employee added');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save employee');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initial ? 'Edit Employee' : 'Add Employee'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormField label="Full name">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
        </FormField>
        <FormField label="Email">
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="Phone">
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormField>
        <FormField label="Position">
          <input className={inputClass} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
        </FormField>
        <FormField label="Department">
          <input className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        </FormField>
        <FormField label="Hire date">
          <input type="date" className={inputClass} value={form.hire_date} onChange={(e) => setForm({ ...form, hire_date: e.target.value })} />
        </FormField>
        <FormField label="Salary">
          <input type="number" min="0" className={inputClass} value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" loading={saving}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Customers (Farmers) ----------------

export function CustomersTab() {
  const [items, setItems] = useState<api.Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<api.Farmer | 'new' | null>(null);

  const load = () => {
    setLoading(true);
    api
      .listFarmers()
      .then((res) => setItems(res.farmers))
      .catch(() => toast.error('Failed to load customers'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (item: api.Farmer) => {
    if (!confirm(`Remove customer "${item.name}"?`)) return;
    try {
      await api.deleteFarmer(item.id);
      toast.success('Customer removed');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to remove customer');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Customers</h2>
        <PrimaryButton onClick={() => setModalItem('new')}>
          <Plus className="w-4 h-4" /> Add Customer
        </PrimaryButton>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No customers yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>Name</Th>
                <Th>Farm</Th>
                <Th>Location</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{it.name}</Td>
                  <Td>{it.farm_name ?? '—'}</Td>
                  <Td>{it.farm_location ?? '—'}</Td>
                  <Td>{it.phone ?? '—'}</Td>
                  <Td>
                    <StatusBadge active={it.is_active} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconButton onClick={() => setModalItem(it)}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </IconButton>
                      <DangerButton onClick={() => handleDelete(it)}>
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </DangerButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalItem && <FarmerFormModal initial={modalItem === 'new' ? null : modalItem} onClose={() => setModalItem(null)} onSaved={load} />}
    </div>
  );
}

export function FarmerFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: api.Farmer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    phone: initial?.phone ?? '',
    email: initial?.email ?? '',
    farm_name: initial?.farm_name ?? '',
    farm_location: initial?.farm_location ?? '',
    farm_size: initial?.farm_size?.toString() ?? '',
    crops_grown: initial?.crops_grown ?? '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, farm_size: form.farm_size ? Number(form.farm_size) : null };
    try {
      if (initial) {
        await api.updateFarmer(initial.id, payload);
        toast.success('Customer updated');
      } else {
        await api.createFarmer(payload);
        toast.success('Customer added');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save customer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initial ? 'Edit Customer' : 'Add Customer'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormField label="Full name">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
        </FormField>
        <FormField label="Email">
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="Phone">
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormField>
        <FormField label="Farm name">
          <input className={inputClass} value={form.farm_name} onChange={(e) => setForm({ ...form, farm_name: e.target.value })} />
        </FormField>
        <FormField label="Farm location">
          <input className={inputClass} value={form.farm_location} onChange={(e) => setForm({ ...form, farm_location: e.target.value })} />
        </FormField>
        <FormField label="Farm size (hectares)">
          <input type="number" min="0" step="0.1" className={inputClass} value={form.farm_size} onChange={(e) => setForm({ ...form, farm_size: e.target.value })} />
        </FormField>
        <FormField label="Crops grown">
          <input className={inputClass} value={form.crops_grown} onChange={(e) => setForm({ ...form, crops_grown: e.target.value })} />
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" loading={saving}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Products ----------------

function ProductsTab() {
  const [items, setItems] = useState<api.Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<api.Product | 'new' | null>(null);

  const load = () => {
    setLoading(true);
    api
      .listProducts()
      .then((res) => setItems(res.products))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (item: api.Product) => {
    if (!confirm(`Delete product "${item.name}"?`)) return;
    try {
      await api.deleteProduct(item.id);
      toast.success('Product deleted');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete product');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Products</h2>
        <PrimaryButton onClick={() => setModalItem('new')}>
          <Plus className="w-4 h-4" /> New Product
        </PrimaryButton>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No products yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{it.name}</Td>
                  <Td>{it.category ?? '—'}</Td>
                  <Td>{it.price}</Td>
                  <Td>
                    {it.stock_quantity} {it.unit}
                  </Td>
                  <Td>
                    <StatusBadge active={it.is_available} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconButton onClick={() => setModalItem(it)}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </IconButton>
                      <DangerButton onClick={() => handleDelete(it)}>
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </DangerButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalItem && <ProductFormModal initial={modalItem === 'new' ? null : modalItem} onClose={() => setModalItem(null)} onSaved={load} />}
    </div>
  );
}

function ProductFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: api.Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    category: initial?.category ?? '',
    price: initial?.price?.toString() ?? '',
    stock_quantity: initial?.stock_quantity?.toString() ?? '0',
    unit: initial?.unit ?? 'kg',
    image_url: initial?.image_url ?? '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, price: Number(form.price), stock_quantity: Number(form.stock_quantity) };
    if (!payload.image_url) delete (payload as any).image_url;
    try {
      if (initial) {
        await api.updateProduct(initial.id, payload);
        toast.success('Product updated');
      } else {
        await api.createProduct(payload);
        toast.success('Product created');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initial ? 'Edit Product' : 'New Product'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormField label="Name">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
        </FormField>
        <FormField label="Category">
          <input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </FormField>
        <FormField label="Description">
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Price">
            <input type="number" min="0" step="0.01" className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </FormField>
          <FormField label="Unit">
            <input className={inputClass} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Stock quantity">
          <input type="number" min="0" className={inputClass} value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} />
        </FormField>
        <FormField label="Image URL">
          <input className={inputClass} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" loading={saving}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Seeds ----------------

function SeedsTab() {
  const [items, setItems] = useState<api.Seed[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<api.Seed | 'new' | null>(null);

  const load = () => {
    setLoading(true);
    api
      .listSeeds()
      .then((res) => setItems(res.seeds))
      .catch(() => toast.error('Failed to load seeds'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (item: api.Seed) => {
    if (!confirm(`Delete seed "${item.name}"?`)) return;
    try {
      await api.deleteSeed(item.id);
      toast.success('Seed deleted');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete seed');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Seeds</h2>
        <PrimaryButton onClick={() => setModalItem('new')}>
          <Plus className="w-4 h-4" /> New Seed
        </PrimaryButton>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No seeds yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>Name</Th>
                <Th>Crop type</Th>
                <Th>Price/kg</Th>
                <Th>Stock (kg)</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{it.name}</Td>
                  <Td>{it.crop_type ?? '—'}</Td>
                  <Td>{it.price_per_kg}</Td>
                  <Td>{it.stock_quantity}</Td>
                  <Td>
                    <StatusBadge active={it.is_available} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconButton onClick={() => setModalItem(it)}>
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </IconButton>
                      <DangerButton onClick={() => handleDelete(it)}>
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </DangerButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalItem && <SeedFormModal initial={modalItem === 'new' ? null : modalItem} onClose={() => setModalItem(null)} onSaved={load} />}
    </div>
  );
}

function SeedFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: api.Seed | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    variety: initial?.variety ?? '',
    description: initial?.description ?? '',
    crop_type: initial?.crop_type ?? '',
    price_per_kg: initial?.price_per_kg?.toString() ?? '',
    stock_quantity: initial?.stock_quantity?.toString() ?? '0',
    germination_rate: initial?.germination_rate?.toString() ?? '',
    origin: initial?.origin ?? '',
    certification: initial?.certification ?? '',
    image_url: initial?.image_url ?? '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price_per_kg: Number(form.price_per_kg),
      stock_quantity: Number(form.stock_quantity),
      germination_rate: form.germination_rate ? Number(form.germination_rate) : null,
    };
    if (!payload.image_url) delete (payload as any).image_url;
    try {
      if (initial) {
        await api.updateSeed(initial.id, payload);
        toast.success('Seed updated');
      } else {
        await api.createSeed(payload);
        toast.success('Seed created');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save seed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initial ? 'Edit Seed' : 'New Seed'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormField label="Name">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Variety">
            <input className={inputClass} value={form.variety} onChange={(e) => setForm({ ...form, variety: e.target.value })} />
          </FormField>
          <FormField label="Crop type">
            <input className={inputClass} value={form.crop_type} onChange={(e) => setForm({ ...form, crop_type: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Description">
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Price per kg">
            <input type="number" min="0" step="0.01" className={inputClass} value={form.price_per_kg} onChange={(e) => setForm({ ...form, price_per_kg: e.target.value })} required />
          </FormField>
          <FormField label="Stock (kg)">
            <input type="number" min="0" className={inputClass} value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Germination rate (%)">
          <input type="number" min="0" max="100" step="0.1" className={inputClass} value={form.germination_rate} onChange={(e) => setForm({ ...form, germination_rate: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Origin">
            <input className={inputClass} value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
          </FormField>
          <FormField label="Certification">
            <input className={inputClass} value={form.certification} onChange={(e) => setForm({ ...form, certification: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Image URL">
          <input className={inputClass} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" loading={saving}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Orders (shared by admin + employee) ----------------

export function OrdersTab({ isStaffAll }: { isStaffAll: boolean }) {
  const [items, setItems] = useState<api.Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .listOrders()
      .then((res) => setItems(res.orders))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (order: api.Order, status: api.Order['status']) => {
    try {
      await api.updateOrder(order.id, { status });
      toast.success('Order updated');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to update order');
    }
  };

  const handleDelete = async (order: api.Order) => {
    if (!confirm(`Delete order #${order.id}?`)) return;
    try {
      await api.deleteOrder(order.id);
      toast.success('Order deleted');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete order');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">{isStaffAll ? 'All Orders' : 'Orders'}</h2>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No orders yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <Th>#</Th>
                <Th>Customer</Th>
                <Th>Product</Th>
                <Th>Qty</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <Td>{o.id}</Td>
                  <Td>{o.customer_name ?? o.user_id}</Td>
                  <Td>{o.product_name}</Td>
                  <Td>{o.quantity}</Td>
                  <Td>{o.total_amount}</Td>
                  <Td>
                    <select
                      className="text-xs border border-gray-300 dark:border-gray-600 dark:bg-slate-900 rounded-lg px-2 py-1"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o, e.target.value as api.Order['status'])}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </Td>
                  <Td>
                    <DangerButton onClick={() => handleDelete(o)}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </DangerButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---------------- Testimonials ----------------

function TestimonialsTab() {
  const [items, setItems] = useState<api.Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .fetchTestimonials()
      .then((res) => setItems(res.testimonials))
      .catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleApprove = async (t: api.Testimonial) => {
    try {
      await api.updateTestimonial(t.id, { is_approved: t.is_approved ? 0 : 1 });
      toast.success('Testimonial updated');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to update testimonial');
    }
  };

  const handleDelete = async (t: api.Testimonial) => {
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    try {
      await api.deleteTestimonial(t.id);
      toast.success('Testimonial deleted');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete testimonial');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Testimonials</h2>
      </div>
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No testimonials yet." />
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {items.map((t) => (
            <div key={t.id} className="px-5 py-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {t.name} <span className="text-xs font-normal text-gray-500">— {t.role ?? 'Customer'}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.message}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <IconButton onClick={() => handleApprove(t)}>{t.is_approved ? 'Unapprove' : 'Approve'}</IconButton>
                <DangerButton onClick={() => handleDelete(t)}>
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </DangerButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- Messages / Inquiries ----------------

function MessagesTab() {
  const [messages, setMessages] = useState<api.ContactMessage[]>([]);
  const [inquiries, setInquiries] = useState<api.ProductInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([api.listContactMessages(), api.listProductInquiries()])
      .then(([m, i]) => {
        setMessages(m.messages);
        setInquiries(i.inquiries);
      })
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <LoadingState />;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-gray-100">
          Contact Messages
        </div>
        {messages.length === 0 ? (
          <EmptyState message="No messages." />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`px-5 py-3 ${!m.is_read ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{m.full_name}</span>
                  {!m.is_read && (
                    <button
                      className="text-xs text-green-700 font-semibold hover:underline"
                      onClick={async () => {
                        await api.markContactMessageRead(m.id);
                        load();
                      }}
                    >
                      Mark read
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500">{m.email}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{m.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-gray-100">
          Product Inquiries
        </div>
        {inquiries.length === 0 ? (
          <EmptyState message="No inquiries." />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto">
            {inquiries.map((i) => (
              <div key={i.id} className={`px-5 py-3 ${!i.is_read ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{i.full_name}</span>
                  {!i.is_read && (
                    <button
                      className="text-xs text-green-700 font-semibold hover:underline"
                      onClick={async () => {
                        await api.markProductInquiryRead(i.id);
                        load();
                      }}
                    >
                      Mark read
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {i.email} · {i.product_name} {i.quantity ? `× ${i.quantity}` : ''}
                </div>
                {i.message && <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{i.message}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
