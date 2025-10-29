import { useState } from 'react'
import IconImg from './IconImg'

type SideNavigationProps = {
  className?: string
  activeKey?: string
}

type NavItem = {
  key: string
  label: string
  iconSrc: string
}

// Icons exported by the Figma MCP session (aligned with MobileTabBar)
const iconHome = "http://localhost:3845/assets/5dab63793026ff4855adfb63f7d47d718654927e.svg"
const iconCards = "http://localhost:3845/assets/38fde6c0df6be5218926a9e48e2235640ed33e0c.svg"
const iconTransactions = "http://localhost:3845/assets/0c42f2ab7088db017e55b013adfde0ca76eff4d3.svg"
const iconAccounting = "http://localhost:3845/assets/9195f31ceda11e2f072bd580880ac1a8e613da6c.svg"
const iconSettings = "http://localhost:3845/assets/a4d4569580b61d14b340099f9578c28505959101.svg"
const iconCollapse = "http://localhost:3845/assets/687f045f6e0d8a67e0298ab77d4c1e6bd1638e2d.svg"
const iconExpand = "http://localhost:3845/assets/79b4bfbb79507db31e2b4b42a2ae78ffd008a96a.svg"

export default function SideNavigation({ className = '', activeKey = 'home' }: SideNavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  const items: NavItem[] = [
    { key: 'home', label: 'Home', iconSrc: iconHome },
    { key: 'cards', label: 'Cards', iconSrc: iconCards },
    { key: 'transactions', label: 'Transactions', iconSrc: iconTransactions },
    { key: 'company', label: 'Company', iconSrc: iconAccounting },
    { key: 'accounting', label: 'Accounting', iconSrc: iconAccounting },
    { key: 'integrations', label: 'Integrations', iconSrc: iconAccounting },
    { key: 'settings', label: 'Settings', iconSrc: iconSettings },
  ]

  return (
    <aside
      className={
        `bg-zinc-950 text-white fixed inset-y-0 left-0 hidden sm:block ` +
        `transition-[width] duration-200 ${collapsed ? 'w-14' : 'w-[250px]'} ` +
        `flex flex-col overflow-hidden ` +
        className
      }
    >
      <div className="flex items-center justify-between px-4 py-5">
        {collapsed ? (
          <div className="h-6 w-[58px]" />
        ) : (
          <div className="flex items-end gap-[2px]">
            <span className="text-base leading-[42px]">finally</span>
            <span className="text-[21px] leading-[42px] text-[#00786F]">Cards</span>
          </div>
        )}
        <button
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg opacity-80 hover:opacity-100"
          onClick={() => setCollapsed((v) => !v)}
        >
          <IconImg alt="" src={collapsed ? iconExpand : iconCollapse} className="h-5 w-5" />
        </button>
      </div>

      <nav className="px-2 pb-4 flex-1 overflow-y-auto min-h-0">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = item.key === activeKey
            if (collapsed) {
              return (
                <li key={item.key}>
                  <a
                    href="#"
                    aria-label={item.label}
                    className={`flex size-9 items-center justify-center rounded-md ${
                      isActive ? 'bg-white/10' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <IconImg alt="" src={item.iconSrc} className="h-4 w-4" />
                  </a>
                </li>
              )
            }
            return (
              <li key={item.key}>
                <a
                  href="#"
                  className={`flex h-9 items-center gap-2 rounded-md px-2 ${
                    isActive ? 'bg-white/10' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <IconImg alt="" src={item.iconSrc} className="h-5 w-5" />
                  <span className="text-[14px] leading-5">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}


