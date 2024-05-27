import { AppState } from "react-native";
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://szeiqzrbqfwdxegunnlx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZWlxenJicWZ3ZHhlZ3Vubmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3OTgxMjEsImV4cCI6MjAzMTM3NDEyMX0.yO5b7hBHMRFO1_BscMJ9lSvH8YNPnEFpmdJ4Tul-NzQ";

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    },
})

AppState.addEventListener("change", (state) => {
    if (state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
})
        