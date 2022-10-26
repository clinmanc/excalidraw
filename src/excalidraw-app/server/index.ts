import { exportToBlob, serializeAsJSON } from "../../packages/utils";
import { MIME_TYPES } from "../../constants";
import { updatePainting } from "../../admin/api/manage";
import { ExcalidrawElement } from "../../element/types";
import { AppState, BinaryFiles } from "../../types";
import { getDataURL } from "../../data/blob";

export const saveToServer = async (
  elements: readonly ExcalidrawElement[],
  appState: Partial<AppState>,
  files: BinaryFiles,
) => {
  if (!appState.id) {
    console.error("id must not be empty");
    return;
  }

  const tmpBlob = await exportToBlob({
    elements: elements,
    files: files,
    mimeType: MIME_TYPES.png,
    quality: 1,
  });
  if (tmpBlob) {
    const thumbnail = new File([tmpBlob], "thumbnail.png", {
      type: tmpBlob.type,
    });

    const serialized = serializeAsJSON(elements, appState, files, "local");
    const content = new File([serialized], "content.ezd", {
      type: MIME_TYPES.excalidraw,
    });

    const form = new FormData();
    form.append("id", appState.id);
    form.append("thumbnail", thumbnail);
    form.append("content", content);

    updatePainting(form);

    appState.thumbnail = await getDataURL(thumbnail);
  }
};
