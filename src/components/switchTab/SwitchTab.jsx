import React, { useState } from 'react'

const SwitchTab = ({ data, onTabChange }) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState("left-0")

    const activeTab = (tab, index) => {
        setSelectedTab(index)
        setLeft(`left-[${index * 80}px]`)

        onTabChange(tab)
    }

    return (
        <div className='bg-white text-black flex rounded-full overflow-hidden text-xs sm:text-sm border-2 border-white relative'>
            {data.map((tab, index) => (
                <span key={index} onClick={() => { activeTab(tab, index) }} className={`h-[30px] z-10 w-[70px] sm:w-[100px] flex items-center justify-center cursor-pointer  ${selectedTab === index && 'text-white bg-gradient-to-r from-orange-500 to-orange-700 rounded-full'}`} >{tab}</span>
            ))}
        </div>
    )
}

export default SwitchTab