import React from 'react'
import { Sidebar }     from 'flowbite-react'
import SimpleBar       from 'simplebar-react'
import FullLogo        from '../shared/logo/FullLogo'
import NavItems        from './NavItems'
import SidebarContent  from './Sidebaritems'

const SidebarLayout: React.FC = () => (
    <div className="hidden xl:block">
        <Sidebar
            className="fixed h-full menu-sidebar bg-white dark:bg-darkgray"
            aria-label="Sidebar"
        >
            <div className="px-6 py-4 flex items-center">
                <FullLogo />
            </div>
            <SimpleBar className="h-[calc(100vh-230px)]">
                <Sidebar.Items className="px-5 mt-2">
                    <Sidebar.ItemGroup className="sidebar-nav">
                        {SidebarContent.map(group => (
                            <div key={group.heading} className="mb-6">
                                <h5 className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase mb-2">
                                    {group.heading}
                                </h5>
                                {group.children.map(item => (
                                    <NavItems key={item.id} item={item} />
                                ))}
                            </div>
                        ))}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </SimpleBar>
        </Sidebar>
    </div>
)

export default SidebarLayout
