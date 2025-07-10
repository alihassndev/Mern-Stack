import * as React from "react";

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          } else if (child.type === TabsContent) {
            return React.cloneElement(child, { activeTab });
          }
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({
  children,
  activeTab,
  setActiveTab,
}: TabsListProps & {
  activeTab: string;
  setActiveTab: (value: string) => void;
}) {
  return (
    <div className="flex border-b">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, {
            isActive: child.props.value === activeTab,
            onClick: () => setActiveTab(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({
  children,
  value,
  isActive,
  onClick,
}: TabsTriggerProps & { isActive?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm ${isActive ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  children,
  value,
  activeTab,
}: TabsContentProps & { activeTab?: string }) {
  if (value !== activeTab) return null;
  return <div className="py-4">{children}</div>;
}
