import { supabase } from "@/integrations/supabase/client";

const BUCKET = "public-media";
const YEARS_100_IN_SECONDS = 60 * 60 * 24 * 365 * 100;

export async function uploadPublicMedia(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${safeExt}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, YEARS_100_IN_SECONDS);
  if (signErr || !data?.signedUrl) throw new Error(signErr?.message ?? "Sign URL failed");
  return data.signedUrl;
}
