import { httpGetFile } from "@/data/upload";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const usePreviewPhoto = (id) => {
  const { data, refetch } = useQuery({
    queryKey: ["upload", id],
    queryFn: async () => await httpGetFile(id),
    enabled: Boolean(id),
  });

  const previewFileUrl = useMemo(() => {
    if (!id) {
      return;
    }

    // Assume you have buffer data in the form of a Uint8Array
    const bufferData = new Uint8Array(data?.data?.data);

    // Create a Blob from the buffer data
    const blob = new Blob([bufferData]);

    // Create a temporary URL for the Blob
    return URL.createObjectURL(blob);
  }, [id, data]);

  return {
    previewFileUrl,
  };
};

export default usePreviewPhoto;
