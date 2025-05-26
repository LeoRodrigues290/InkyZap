import { FC } from 'react'
import { Outlet } from 'react-router'
import ScrollToTop from 'src/components/shared/ScrollToTop'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

import { DetailModalProvider } from 'src/contexts/DetailModalContext'
import DetailModal from 'src/components/shared/DetailModal'

const FullLayout: FC = () => {
  return (
      <DetailModalProvider>
        <div className="flex w-full min-h-screen dark:bg-darkgray">
          <Sidebar />
          <div className="page-wrapper flex w-full">
            <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
              <Header />
              <div className="bg-lightgray dark:bg-dark h-full rounded-bb">
                <div className="container py-30">
                  <ScrollToTop>
                    <Outlet />
                  </ScrollToTop>
                </div>
              </div>
            </div>
          </div>
          <DetailModal />
        </div>
      </DetailModalProvider>
  )
}

export default FullLayout
