import { ToolButton } from "../components/ToolButton";
import "../components/ToolIcon.scss";
import { t } from "../i18n";
import { useIsMobile } from "../components/App";
import { KEYS } from "../keys";
import { register } from "./register";

import { SaveOutlined } from "@ant-design/icons";
import { serializeAsJSON } from "../data/json";
import { updatePainting } from "../admin/api/manage";
import { canvasToBlob, getDataURL } from "../data/blob";
import { exportToCanvas } from "../scene/export";
import { DEFAULT_EXPORT_PADDING, MIME_TYPES } from "../constants";

export const actionSaveFileToServer = register({
  name: "saveFileToServer",
  perform: async (elements, appState, value, app) => {
    if (!appState.id) {
      console.error("id must not be empty");
      return { commitToHistory: false };
    }

    try {
      const tmpCanvas = await exportToCanvas(elements, appState, app.files, {
        exportBackground: appState.exportBackground,
        viewBackgroundColor: appState.viewBackgroundColor,
        exportPadding: DEFAULT_EXPORT_PADDING,
        maxWidthOrHeight: 512,
      });
      tmpCanvas.style.display = "none";
      document.body.appendChild(tmpCanvas);
      const tmpBlob = await canvasToBlob(tmpCanvas);
      const thumbnail = new File([tmpBlob], "thumbnail.png", {
        type: tmpBlob.type,
      });
      tmpCanvas.remove();

      const serialized = serializeAsJSON(
        elements,
        appState,
        app.files,
        "local",
      );
      const content = new File([serialized], "content.ezd", {
        type: MIME_TYPES.excalidraw,
      });

      const form = new FormData();
      form.append("id", appState.id);
      form.append("thumbnail", thumbnail);
      form.append("content", content);

      updatePainting(form);
      return { commitToHistory: false, appState: { ...appState } };
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        console.error(error);
      } else {
        console.warn(error);
      }
      return { commitToHistory: false };
    }
  },
  keyTest: (event) =>
    event.key === KEYS.S && event.shiftKey && event[KEYS.CTRL_OR_CMD],
  PanelComponent: ({ updateData }) => (
    <ToolButton
      type="button"
      icon={<SaveOutlined />}
      title={t("buttons.save")}
      aria-label={t("buttons.save")}
      showAriaLabel={useIsMobile()}
      onClick={() => updateData(null)}
      data-testid="save-button"
    />
  ),
});
