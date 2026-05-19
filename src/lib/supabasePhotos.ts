import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const IMAGE_EXTENSIONS = new Set([
  "avif",
  "gif",
  "jpeg",
  "jpg",
  "png",
  "webp",
]);

type StorageItem = {
  id: string | null;
  name: string;
  metadata?: {
    mimetype?: string;
  } | null;
};

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  label: string;
  category: string;
  path: string;
}

interface BucketImageOptions {
  bucket: string;
  defaultCategory: string;
}

function isImage(item: StorageItem) {
  const mimeType = item.metadata?.mimetype;

  if (mimeType?.startsWith("image/")) {
    return true;
  }

  const extension = item.name.split(".").pop()?.toLowerCase();
  return extension ? IMAGE_EXTENSIONS.has(extension) : false;
}

function isFolder(item: StorageItem) {
  return !item.id && !isImage(item);
}

function labelFromPath(path: string) {
  const filename = path.split("/").pop() ?? path;
  const withoutExtension = filename.replace(/\.[^.]+$/, "");

  return withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryFromPath(path: string) {
  const [folder] = path.split("/");
  return folder && folder !== path ? labelFromPath(folder) : "Project Photo";
}

async function listPhotos(
  supabase: SupabaseClient,
  { bucket, defaultCategory }: BucketImageOptions,
  folder = "",
): Promise<GalleryPhoto[]> {
  const photos: GalleryPhoto[] = [];
  const limit = 1000;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit,
        offset,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      throw error;
    }

    if (!data?.length) {
      break;
    }

    for (const item of data as StorageItem[]) {
      const path = folder ? `${folder}/${item.name}` : item.name;

      if (isFolder(item)) {
        photos.push(
          ...(await listPhotos(
            supabase,
            { bucket, defaultCategory },
            path,
          )),
        );
        continue;
      }

      if (!isImage(item)) {
        continue;
      }

      const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      photos.push({
        id: item.id ?? path,
        src: publicUrl.publicUrl,
        alt: labelFromPath(path),
        label: labelFromPath(path),
        category: path.includes("/") ? categoryFromPath(path) : defaultCategory,
        path,
      });
    }

    if (data.length < limit) {
      break;
    }

    offset += limit;
  }

  return photos;
}

async function getBucketImages(options: BucketImageOptions) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase storage credentials are missing.");
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  try {
    return await listPhotos(supabase, options);
  } catch (error) {
    console.error(`Unable to load Supabase ${options.bucket} images:`, error);
    return [];
  }
}

export async function getGalleryPhotos() {
  return getBucketImages({
    bucket: "photos",
    defaultCategory: "Project Photo",
  });
}

export async function getDesignImages() {
  return getBucketImages({
    bucket: "designs",
    defaultCategory: "Stamp Design",
  });
}
