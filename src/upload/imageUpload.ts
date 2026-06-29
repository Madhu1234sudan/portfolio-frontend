import api from "@/src/lib/api";

export async function uploadImage(
  file: File | null
): Promise<string> {
  if (!file) {
    return "";
  }

  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
}