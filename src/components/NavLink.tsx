/**
 * =============================================================================
 * NAVLINK COMPONENT - src/components/NavLink.tsx
 * =============================================================================
 * 
 * A wrapper around React Router's NavLink that provides a simpler API for
 * applying active/pending class names. This component uses forwardRef to
 * properly pass refs to the underlying anchor element.
 * 
 * Props:
 * - className: Base CSS classes applied to the link
 * - activeClassName: Classes applied when the route is active
 * - pendingClassName: Classes applied when the route is pending (loading)
 * - All other NavLinkProps from react-router-dom
 * 
 * Usage:
 * <NavLink 
 *   to="/dashboard" 
 *   className="nav-link" 
 *   activeClassName="nav-link-active"
 * >
 *   Dashboard
 * </NavLink>
 * =============================================================================
 */

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Props interface extending NavLinkProps but replacing className
 * with separate active and pending state class names
 */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

/**
 * NavLink component with simplified active/pending class handling
 * Uses forwardRef for proper ref forwarding to the DOM anchor element
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        // Use function form of className to conditionally apply styles
        // based on isActive and isPending states from React Router
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

// Display name for debugging in React DevTools
NavLink.displayName = "NavLink";

export { NavLink };
