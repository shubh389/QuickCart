import { serve } from "inngest/next";
import { inngest, saveUserCreation, SyncUserDeletion, syncUserUpdation } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    saveUserCreation,
    syncUserUpdation,
    SyncUserDeletion
  ]
    ,
});
