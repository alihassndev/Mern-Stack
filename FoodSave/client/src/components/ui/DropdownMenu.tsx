import * as React from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child, { setIsOpen });
          } else if (child.type === DropdownMenuContent && isOpen) {
            return React.cloneElement(child, { setIsOpen });
          }
        }
        return null;
      })}
    </div>
  );
}

export function DropdownMenuTrigger({
  children,
  setIsOpen,
}: DropdownMenuTriggerProps & { setIsOpen: (value: boolean) => void }) {
  return (
    <button onClick={() => setIsOpen(true)} className="focus:outline-none">
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  setIsOpen,
}: DropdownMenuContentProps & { setIsOpen: (value: boolean) => void }) {
  return (
    <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
      <div className="py-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === DropdownMenuItem) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export function DropdownMenuItem({
  children,
  className = "",
}: DropdownMenuItemProps) {
  return (
    <button
      className={`${className} block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
    >
      {children}
    </button>
  );
}
