// components/profile/ProfileTabs.tsx
"use client"

import { useState } from "react"
import ChangePasswordForm from "./ChangePasswordForm"
import UserPosts from "./UserPosts"

const tabs = ["Your Posts", "Change Password"] as const
type TabType = (typeof tabs)[number]

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Your Posts")

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-fit justify-start border-b border-b-neutral-300 items-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold border-b-3 ${
              activeTab === tab
                ? "border-primary-300 text-primary-300"
                : "border-transparent text-neutral-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div >
        <div className=" flex flex-col items-center">{activeTab === "Your Posts" && <UserPosts />}</div>
        <div className="m-5"> {activeTab === "Change Password" && <ChangePasswordForm />}</div>
       
      </div>
    </div>
  )
}

export default ProfileTabs
