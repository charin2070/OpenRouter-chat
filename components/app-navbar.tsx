'use client'

import { Navbar, NavbarSection, NavbarSpacer } from '@/components/catalyst-ui-kit/navbar'
import { UserProfile } from '@/components/auth/user-profile'

interface AppNavbarProps {
  className?: string
}

export function AppNavbar({ className }: AppNavbarProps) {
  return (
    <Navbar className={`flex-none ${className}`}>
      <NavbarSection>
        {/* Left side - can add logo or title here later */}
      </NavbarSection>
      
      <NavbarSpacer />
      
      <NavbarSection>
        <UserProfile />
      </NavbarSection>
    </Navbar>
  )
}
