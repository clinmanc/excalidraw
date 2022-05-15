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
import { DEFAULT_EXPORT_PADDING } from "../constants";

export const actionSaveFileToServer = register({
  name: "saveFileToServer",
  perform: async (elements, appState, value, app) => {
    console.log(value);

    try {
      const tempCanvas = await exportToCanvas(elements, appState, app.files, {
        exportBackground: appState.exportBackground,
        viewBackgroundColor: appState.viewBackgroundColor,
        exportPadding: DEFAULT_EXPORT_PADDING,
        maxWidthOrHeight: 512,
      });
      tempCanvas.style.display = "none";
      document.body.appendChild(tempCanvas);
      let blob = await canvasToBlob(tempCanvas);
      tempCanvas.remove();

      const thumbnail = await getDataURL(blob);

      const serialized = serializeAsJSON(
        elements,
        appState,
        app.files,
        "local",
      );
      updatePainting({
        id: appState.id,
        thumbnail,
        content: serialized,
      });
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
