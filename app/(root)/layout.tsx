import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    // <main className='root-container flex min-h-screen flex-1 flex-col w-full bg-cover bg-top px-5 xs:px-10 md:px-16'>
    //   <div className='mx-auto max-w-7xl'>
    //     <div className='mt-20 pb-20'>
    //         {children}
    //     </div>
        
    //   </div>
    // </main>
    <div className='flex h-screen p-2 '>
        <div className=" ">
              <Sidebar />
         </div>
       
      <div className="flex-1 flex flex-col mx-3 my-2">      
        <div className="w-full ">
          <Header />
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}

export default Layout
