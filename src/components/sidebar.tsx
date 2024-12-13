'use client';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function fSidebarClick(page: string) {
  if (page === 'user') {
    window.location.href = '/user';
  }
  if (page === 'product') {
    window.location.href = '/product';
  }
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-20'
      } h-screen`}
    >
      <button
        onClick={toggleSidebar}
        className="text-white p-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
      </button>
      
      <div className="flex flex-col items-center p-2">
        <div className="text-white text-xl font-semibold mb-4">FIFI</div>
        
        <button
          className="w-full text-left text-white px-4 py-2 transition-all hover:bg-slate-700"
          onClick={() => {
            fSidebarClick('user');}}
        >
          {isOpen ? <span>User</span> : ''}
        </button>
        <button
          className="w-full text-left text-white px-4 py-2 transition-all hover:bg-slate-700"
          onClick={() => {fSidebarClick('product');
          }}
        >
          {isOpen ? <span>Product</span> : ''}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
