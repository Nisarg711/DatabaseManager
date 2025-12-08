import { useState } from "react";
import { Menu, Table, MessageSquare, Zap, History, LayoutDashboard } from "lucide-react";

export default function Sidebar(props) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    };

    return (
        <div
            className={`h-screen bg-sidebar border-sidebar-border border-r flex flex-col transition-all duration-300 ${isCollapsed ? "w-16" : "w-40 md:w-56"}
      }`}
        >
            <div className="flex items-center justify-between p-4">
                <button onClick={toggleSidebar} className="hover:cursor-pointer text-sidebar-foreground">
                    <Menu />
                </button>

            </div>


            <div className="flex flex-col gap-2">
                <SidebarItem icon={<Table size={20} />} isactive={props.active == "table" ? true : false} label="Table Explorer" collapsed={isCollapsed}
                    onClick={() => props.onSelectPage("table")} />

                <SidebarItem isactive={props.active == "query" ? true : false} icon={<MessageSquare size={20} />} label="Query" collapsed={isCollapsed} onClick={() => props.onSelectPage("query")} />
                <SidebarItem isactive={props.active == "optimization" ? true : false} icon={<Zap size={20} />} label="Optimization" collapsed={isCollapsed} onClick={() => props.onSelectPage("optimization")} />
                <SidebarItem isactive={props.active == "history" ? true : false} icon={<History size={20} />} label="Query History" collapsed={isCollapsed} onClick={() => props.onSelectPage("history")} />
                <SidebarItem isactive={props.active == "schema" ? true : false} icon={<LayoutDashboard size={20} />} label="View Schema" collapsed={isCollapsed} onClick={() => props.onSelectPage("schema")} />
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, collapsed, isactive, onClick }) {
    return (
        <div onClick={onClick}
            className={` ${isactive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"} flex items-center gap-3 cursor-pointer px-4 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors  ${collapsed ? "justify-center" : ""}`}
        >
            {icon}
            {!collapsed && <span>{label}</span>}


        </div>
    );
}