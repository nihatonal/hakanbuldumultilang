"use client";

import * as Icons from "lucide-react";

export default function IconMapper({ name, ...props }) {
    const LucideIcon = Icons[name];

    if (!LucideIcon) {
        return <Icons.HelpCircle {...props} />; // fallback
    }

    return <LucideIcon {...props} />;
}
