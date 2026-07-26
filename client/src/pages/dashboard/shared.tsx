import { type ReactNode } from 'react';
import { X, Loader2 } from 'lucide-react';

export function StatCard({ label, value, icon: Icon }: { label: string; value: number | string; icon?: any }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
      {Icon && (
        <div className="w-11 h-11 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}

export function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-green-700 text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent';

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function DangerButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-semibold transition-colors"
    >
      {children}
    </button>
  );
}

export function IconButton({ children, onClick, title }: { children: ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 text-xs font-semibold transition-colors"
    >
      {children}
    </button>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">{message}</div>;
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin text-green-700" />
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">
      {children}
    </th>
  );
}

export function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-200 ${className}`}>{children}</td>;
}

export function StatusBadge({ active }: { active: boolean | number }) {
  const isActive = Boolean(active);
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
        isActive
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    employee: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    user: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    farmer: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${colors[role] ?? colors.user}`}>
      {role}
    </span>
  );
}
