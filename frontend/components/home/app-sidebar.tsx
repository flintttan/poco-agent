"use client";

import Image from "next/image";

import {
  FileText,
  FolderPlus,
  Grid3X3,
  Library,
  Plus,
  Search,
  Settings2,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

function SidebarLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (isCollapsed) {
    // 折叠状态：显示小 logo 居中，悬停时显示折叠按钮
    return (
      <div className="relative group/logo flex items-center justify-center w-full">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="group-hover/logo:scale-95 group-hover/logo:opacity-0 transition-all duration-200 ease-out"
        />
        <SidebarTrigger className="h-10 w-10 absolute opacity-0 group-hover/logo:opacity-100 group-hover/logo:scale-100 transition-all duration-200 ease-out" />
      </div>
    );
  }

  // 展开状态：显示 logo + 文字 + 折叠按钮
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="transition-transform duration-200 hover:scale-105"
        />
        <span className="text-xl font-semibold text-foreground tracking-tight">
          toto
        </span>
      </div>
      <SidebarTrigger className="h-10 w-10 hover:bg-accent/80 transition-colors duration-150" />
    </div>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 overflow-hidden" collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="bg-sidebar-accent/80 hover:bg-sidebar-accent text-base transition-all duration-150 data-[state=open]:bg-sidebar-accent"
                tooltip="新建任务"
              >
                <Plus className="h-5 w-5 transition-transform group-data-[state=open]:rotate-45" />
                <span>新建任务</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-base transition-all duration-150 hover:bg-accent/80"
                tooltip="搜索"
              >
                <Search className="h-5 w-5 transition-transform group-data-[state=open]:scale-110" />
                <span>搜索</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-base transition-all duration-150 hover:bg-accent/80"
                tooltip="库"
              >
                <Library className="h-5 w-5 transition-transform group-data-[state=open]:scale-110" />
                <span>库</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-3 bg-border/50" />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between group-data-[collapsible=icon]:hidden text-sm font-medium text-muted-foreground h-10 px-2">
            <span>项目</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-accent/80 transition-colors duration-150"
            >
              <Plus className="h-4 w-4 transition-transform hover:rotate-90" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-base transition-all duration-150 hover:bg-accent/80"
                  tooltip="新项目"
                >
                  <FolderPlus className="h-5 w-5 transition-transform group-data-[state=open]:scale-110" />
                  <span>新项目</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between group-data-[collapsible=icon]:hidden text-sm font-medium text-muted-foreground h-10 px-2">
            <span>所有任务</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-accent/80 transition-colors duration-150"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col items-center justify-center py-12 text-center group-data-[collapsible=icon]:hidden">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition-all duration-300 hover:border-muted-foreground/30 hover:bg-muted/40">
                <FileText className="h-8 w-8 text-muted-foreground/50 transition-transform hover:scale-110" />
              </div>
              <p className="text-sm text-muted-foreground transition-colors hover:text-muted-foreground/80">
                新建一个任务以开始
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[state=expanded]:flex-row group-data-[state=expanded]:justify-between">
          <div className="flex gap-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[state=expanded]:flex-row">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-105"
              title="设置"
            >
              <Settings2 className="h-5 w-5 transition-transform hover:rotate-90" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-105"
              title="网格视图"
            >
              <Grid3X3 className="h-5 w-5 transition-transform hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-accent/80 transition-all duration-150 hover:scale-105"
              title="移动端"
            >
              <Smartphone className="h-5 w-5 transition-transform hover:scale-110" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
