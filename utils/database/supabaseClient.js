import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fctwbaalsgpgjqyuvsmk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdHdiYWFsc2dwZ2pxeXV2c21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjkxMjMsImV4cCI6MjA0ODkwNTEyM30.OgoGZv7HEYimg1b5TbD7KRdgdebxGHwBN6n-9koeiik";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
