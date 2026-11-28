// src/components/layout/Sidebar.jsx
import React, { useContext, useEffect, useState, memo } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  MessageCircle,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { AppShellContext } from "../context/AppShellContext";

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
];
const DEFAULT_FOOTER_ITEMS = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar({
  navItems,
  navGroups,
  footerItems = DEFAULT_FOOTER_ITEMS,
  user = { name: "User", role: "Member", avatar: "" },
  profilePath = "/profile",
  chatPath,
  onSignOut,
  chatAvatars = [],
  unreadCount = 0,
  brandPath = "/",
  storageKey = "sidebar-expanded",
  persistent = false,
}) {
  const hasPersistentShell = useContext(AppShellContext);
  const [expanded, setExpanded] = useState(
    () => window.sessionStorage.getItem(storageKey) === "true",
  );

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, expanded ? "true" : "false");
  }, [expanded, storageKey]);

  const groups =
    navGroups && navGroups.length > 0
      ? navGroups
      : [
          {
            label: "Menu",
            items:
              navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS,
          },
        ];

  const renderNavItem = ({ label, icon: Icon, path }) => (
    <li key={label}>
      <NavLink
        to={path}
        end={path === "/"}
        title={expanded ? undefined : label}
        aria-label={expanded ? undefined : label}
        className={({ isActive }) =>
          [
            "group flex h-9 w-full items-center rounded-lg transition-colors duration-200",
            expanded ? "justify-start gap-3 px-3" : "justify-center",
            isActive
              ? "text-[#1677FF]"
              : "text-[#C7C9CE] hover:bg-[#F7F8FA] hover:text-[#9DA1A8]",
          ].join(" ")
        }
      >
        <Icon className="h-[19px] w-[19px] shrink-0" strokeWidth={1.8} />
        {expanded && (
          <span className="whitespace-nowrap text-[13px] font-medium">
            {label}
          </span>
        )}
      </NavLink>
    </li>
  );

  if (hasPersistentShell && !persistent) return null;

  return (
    <aside
      aria-label="Sidebar"
      className={[
        "relative flex h-full shrink-0 flex-col overflow-hidden bg-white",
        "border-r border-[#F0F1F3]",
        "transition-[width] duration-300 ease-out",
        expanded ? "w-[188px]" : "w-[78px]",
      ].join(" ")}
    >
      {/* Brand / collapse toggle */}
      <div className="relative flex h-[70px] shrink-0 items-center justify-center border-b border-[#F4F4F5]">
        <Link to={brandPath} aria-label="Home">
          <img
            src="/assets/logo.svg"
            alt="Tadreeby"
            width="47"
            height="30"
          />
        </Link>
        <button
          type="button"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((v) => !v)}
          className="absolute right-[-1px] top-1/2 flex h-7 w-5 -translate-y-1/2 items-center justify-center rounded-l-md bg-[#F3F8FF] text-[#1677FF] hover:bg-[#E8F2FF]"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "" : "rotate-180"}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* User */}
      <NavLink
        to={profilePath}
        title={expanded ? undefined : user.name}
        aria-label={expanded ? undefined : user.name}
        className={[
          "flex h-[64px] shrink-0 items-center border-b border-[#F4F4F5]",
          expanded ? "gap-2.5 px-4" : "justify-center",
          "transition-colors hover:bg-[#FAFBFC]",
        ].join(" ")}
      >
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#EAF2FF]">
          {user.avatar || user.profileImage ? (
            <img
              src={user.avatar || user.profileImage}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-[#1677FF]"
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        {expanded && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-semibold text-[#6F7278]">
              {user.name}
            </p>
            <p className="mt-0.5 text-[9px] font-medium text-[#AEB1B7]">
              {user.role}
            </p>
          </div>
        )}
      </NavLink>

      <nav
        aria-label="Main navigation"
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* Nav groups */}
        <div className="flex min-h-0 flex-1 flex-col px-3">
          {groups.map((group, idx) => (
            <React.Fragment key={group.label || idx}>
              {expanded && (
                <p
                  className={`px-2 pb-2 text-[8px] font-medium uppercase tracking-wide text-[#B8BAC0] ${
                    idx === 0 ? "pt-4" : "pt-7"
                  }`}
                >
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">{group.items.map(renderNavItem)}</ul>
            </React.Fragment>
          ))}

          {/* Chat (only if a chatPath is supplied) */}
          {chatPath && (
            <div className="mt-auto pb-4">
              {expanded && (
                <p className="px-2 pb-2 text-[8px] font-medium uppercase tracking-wide text-[#B8BAC0]">
                  Personal
                </p>
              )}
              <NavLink
                to={chatPath}
                title={expanded ? undefined : "Chat"}
                aria-label={
                  expanded
                    ? undefined
                    : unreadCount > 0
                      ? `Chat, ${unreadCount} unread`
                      : "Chat"
                }
                className={[
                  "flex h-9 w-full items-center rounded-lg text-[#C7C9CE] hover:bg-[#F7F8FA]",
                  expanded ? "gap-3 px-3" : "justify-center",
                ].join(" ")}
              >
                <MessageCircle
                  className="h-[19px] w-[19px] shrink-0"
                  strokeWidth={1.8}
                />
                {expanded && (
                  <>
                    <span className="text-[13px] font-medium text-[#777A80]">
                      Chat
                    </span>
                    <div className="ml-auto flex items-center">
                      <div aria-hidden="true" className="flex -space-x-1.5">
                        {(chatAvatars.length ? chatAvatars : ["A", "D"]).map(
                          (avatar, index) => (
                            <div
                              key={index}
                              className="h-5 w-5 overflow-hidden rounded-full border-2 border-white bg-[#E8EEF8] text-center text-[7px] font-semibold leading-4 text-[#8B93A1]"
                            >
                              {avatar.startsWith?.("http") ? (
                                <img
                                  src={avatar}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                avatar
                              )}
                            </div>
                          ),
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3B30] text-[8px] font-bold text-white">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>

        {/* Footer items */}
        {footerItems?.length > 0 && (
          <div className="shrink-0 border-t border-[#F4F4F5] px-3 pb-2 pt-3">
            {expanded && (
              <p className="px-2 pb-2 text-[8px] font-medium text-[#70737A]">
                Settings
              </p>
            )}
            <ul
              className={[
                "flex rounded-xl bg-[#F7F8FA]",
                expanded
                  ? "h-9 items-center justify-around px-1"
                  : "mx-auto h-[76px] w-10 flex-col items-center justify-center gap-1",
              ].join(" ")}
            >
              {footerItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    title={item.label}
                    aria-label={item.label}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#C6C9CE] hover:bg-white hover:text-[#969AA1]"
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.8} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Sign out */}
      <div className="shrink-0 px-3 pb-3">
        <button
          type="button"
          onClick={onSignOut}
          title={expanded ? undefined : "Sign out"}
          className={[
            "flex h-9 w-full items-center justify-center rounded-lg",
            "bg-[#FFF0F1] text-[#FF6B72]",
            "transition-colors hover:bg-[#FFE5E7]",
            expanded ? "gap-2" : "",
          ].join(" ")}
        >
          <LogOut className="h-[17px] w-[17px]" strokeWidth={1.9} />
          {expanded && (
            <span className="text-[12px] font-medium">Sign out</span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default memo(Sidebar);