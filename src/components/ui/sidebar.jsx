import { useState } from "react";
import { Menu, Table, MessageSquare, Zap, History, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Sidebar(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: <Table size={18} />, label: "Table Explorer", page: "table" },
        { icon: <MessageSquare size={18} />, label: "Query", page: "query" },
        { icon: <Zap size={18} />, label: "Optimization", page: "optimization" },
        { icon: <History size={18} />, label: "Query History", page: "history" },
        { icon: <LayoutDashboard size={18} />, label: "View Schema", page: "schema" },
    ];

    return (
        <nav className="w-full bg-sidebar border-b border-sidebar-border">
            <div className="h-16 flex items-center px-4 md:px-6">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-0 w-full">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.page}
                            icon={item.icon}
                            label={item.label}
                            isactive={props.active === item.page}
                            onClick={() => props.onSelectPage(item.page)}
                        />
                    ))}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden hover:cursor-pointer text-sidebar-foreground ml-auto"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-sidebar border-t border-sidebar-border flex flex-col gap-2 p-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.page}
                            icon={item.icon}
                            label={item.label}
                            isactive={props.active === item.page}
                            onClick={() => {
                                props.onSelectPage(item.page);
                                setMobileMenuOpen(false);
                            }}
                            mobile
                        />
                    ))}
                </div>
            )}
        </nav>
    );
}

function NavItem({ icon, label, isactive, onClick, mobile = false }) {
    return (
        <div
            onClick={onClick}
            className={`${
                isactive
                    ? "text-primary border-b-2 border-primary"
                    : "text-sidebar-foreground hover:text-primary/80"
            } flex items-center justify-center gap-3 cursor-pointer px-4 py-2 transition-all duration-200 whitespace-nowrap flex-1 font-medium`}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}