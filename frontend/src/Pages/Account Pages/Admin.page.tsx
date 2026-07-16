import { useState, useEffect, type JSX } from 'react'
import { Box, Copyright, ListTree } from "lucide-react";

const AdminPage = () => {

  const [page, setPage] = useState<string>("")

  interface SidebarContent {
    title: string,
    icon: JSX.Element
  }

  const SIDEBAR_CONTENT: Record<string, SidebarContent> = {
    "categories": {
      "title": "Manage Categories",
      "icon": <ListTree className="my-1.5 inline-block size-5" />
    },
    "brands": {
      "title": "Manage Brands",
      "icon": <Copyright className="my-1.5 inline-block size-5" />
    },
    "products": {
      "title": "Manage Products",
      "icon": <Box className="my-1.5 inline-block size-5" />
    },
  }

  return (<div className="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Navbar */}
      <nav className="navbar w-full bg-base-300">
        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
          {/* Sidebar toggle icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
        </label>
        <div className="px-4">{page === "" ? "Dashboard" : SIDEBAR_CONTENT[page].title}</div>
      </nav>
      {/* Page content here */}
      <div className="p-4">Page Content</div>
    </div>
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          {Object.keys(SIDEBAR_CONTENT).map((key) => {
            return (
              <li key={key}>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={SIDEBAR_CONTENT[key].title} onClick={() => setPage(key)}>
                  {SIDEBAR_CONTENT[key].icon}
                  <span className="is-drawer-close:hidden">{SIDEBAR_CONTENT[key].title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </div>
  )

}

export default AdminPage