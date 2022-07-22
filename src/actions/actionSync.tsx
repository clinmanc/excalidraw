import { ToolButton } from "../components/ToolButton";
import "../components/ToolIcon.scss";
import { t } from "../i18n";
import { useIsMobile } from "../components/App";
import { KEYS } from "../keys";
import { register } from "./register";
import { MIME_TYPES } from "../constants";
import { exportToBlob } from "../packages/utils";
import { serializeAsJSON } from "../data/json";
import { SaveOutlined } from "@ant-design/icons";
import { updatePainting } from "../admin/api/manage";

export const actionSaveFileToServer = register({
  name: "saveFileToServer",
  perform: async (elements, appState, value, app) => {
    if (!appState.id) {
      console.error("id must not be empty");
      return { commitToHistory: false };
    }

    try {
      const tmpBlob = await exportToBlob({
        elements: elements,
        files: app.files,
        mimeType: MIME_TYPES.png,
        quality: 1,
      });
      if (tmpBlob) {
        const thumbnail = new File([tmpBlob], "thumbnail.png", {
          type: tmpBlob.type,
        });

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
      }
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
