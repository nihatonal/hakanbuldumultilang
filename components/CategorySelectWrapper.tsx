"use client";
import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect ";

const CategorySelectWrapper = (props) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // veya bir loading skeleton
    return <CategorySelect {...props} />;
};

export default CategorySelectWrapper;
