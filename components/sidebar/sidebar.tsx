import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { DarkModeSwitch } from "../navbar/darkmodeswitch";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Recruitment">
              <SidebarItem
                isActive={pathname === "/job-orders"}
                title="Job Orders"
                icon={<ReportsIcon />}
                href="/job-orders"
              />
              <SidebarItem
                isActive={pathname === "/candidates"}
                title="Candidates"
                icon={<CustomersIcon />}
                href="/candidates"
              />
              <SidebarItem
                isActive={pathname === "/progress"}
                title="Progress Tracker"
                icon={<AccountsIcon />}
                href="/progress"
              />
              <SidebarItem
                isActive={pathname === "/candidate-progress"}
                title="Progress Manager"
                icon={<ProductsIcon />}
                href="/candidate-progress"
              />
            </SidebarMenu>

            <SidebarMenu title="Finance">
              <SidebarItem
                isActive={pathname === "/finance"}
                title="Finance & Verification"
                icon={<PaymentsIcon />}
                href="/finance"
              />
            </SidebarMenu>

            <SidebarMenu title="System">
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
                href="/settings"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Toggle Theme"} color="primary">
              <div className="max-w-fit">
                <DarkModeSwitch />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
