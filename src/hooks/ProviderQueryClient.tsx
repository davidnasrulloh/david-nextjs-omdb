"use client";

import HomeView from "@/sections/home-view";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const ProviderQueryClient = ({ children }) => {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
};

export default ProviderQueryClient;
