'use client'

import StoreProvider from "@/shared/components/Providers/StoreProvider";
import {PropsWithChildren} from "react";

export function Providers({children}: PropsWithChildren) {
    return <StoreProvider>{children}</StoreProvider>
}