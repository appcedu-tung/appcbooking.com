import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: '首頁' },
  { to: '/practice', label: '自由練習' },
  { to: '/mock-test', label: '模擬測驗' },
  { to: '/wrong-review', label: '錯題複習' },
  { to: '/records', label: '學習紀錄' },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4">
          <Link to="/" className="text-lg font-bold text-brand">
            TOEIC 常用字彙 1000 字
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 ${isActive ? 'bg-brand text-white' : 'bg-slate-100 hover:bg-slate-200'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
