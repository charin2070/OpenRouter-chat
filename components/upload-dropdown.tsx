'use client'

import { Plus, FileText, MessageSquare } from 'lucide-react'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from '@/components/catalyst-ui-kit/dropdown'

interface UploadDropdownProps {
  onLogFileUpload?: () => void
  onLogPaste?: () => void
  onChatFileUpload?: () => void
  onChatPaste?: () => void
  className?: string
}

export function UploadDropdown({
  onLogFileUpload,
  onLogPaste,
  onChatFileUpload,
  onChatPaste,
  className,
}: UploadDropdownProps) {
  return (
    <Dropdown>
      <DropdownButton 
        className={`${className} bg-transparent hover:bg-gray-700/50 border-none text-sm font-medium p-2 rounded-lg transition-colors`}
      >
        <Plus className="size-4" />
      </DropdownButton>
      <DropdownMenu className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl p-2 min-w-[280px]">
        <DropdownItem 
          onClick={onLogFileUpload}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-500/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-500/20"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
            <FileText className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-white">Лог файл</span>
            <span className="text-xs text-gray-300 group-hover:text-gray-200">Загрузить файл логов</span>
          </div>
        </DropdownItem>
        
        <DropdownItem 
          onClick={onLogPaste}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-500/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-500/20"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
            <FileText className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-white">Вставить лог</span>
            <span className="text-xs text-gray-300 group-hover:text-gray-200">Вставить текст логов</span>
          </div>
        </DropdownItem>
        
        <DropdownDivider className="my-2 bg-gradient-to-r from-transparent via-gray-600 to-transparent h-px" />
        
        <DropdownItem 
          onClick={onChatFileUpload}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-white hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-500/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-green-500/20"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
            <MessageSquare className="w-4 h-4 text-green-400 group-hover:text-green-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-white">Файл с рабочим чатом</span>
            <span className="text-xs text-gray-300 group-hover:text-gray-200">Загрузить файл чата</span>
          </div>
        </DropdownItem>
        
        <DropdownItem 
          onClick={onChatPaste}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-white hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-500/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-green-500/20"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
            <MessageSquare className="w-4 h-4 text-green-400 group-hover:text-green-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-white">Вставить рабочий чат</span>
            <span className="text-xs text-gray-300 group-hover:text-gray-200">Вставить текст чата</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
