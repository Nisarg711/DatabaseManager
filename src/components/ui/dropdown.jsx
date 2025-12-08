"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ items = [], selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-card text-foreground border border-border rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring min-w-[150px] justify-between cursor-pointer"
            >
                <span className="truncate">{selected || "Select an option"}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && items.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onSelect(item);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-accent text-foreground ${item === selected ? "bg-primary/10 text-primary font-medium" : ""
                                }`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
