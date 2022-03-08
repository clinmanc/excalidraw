import { CODES, KEYS } from "../keys";
import { register } from "./register";
import { trackEvent } from "../analytics";

export const actionToggleSketchMode = register({
  name: "sketchMode",
  perform(elements, appState) {
    trackEvent("view", "mode", "sketch");
    const checked = !this.checked!(appState);
    return {
      appState: {
        ...appState,
        sketchModeEnabled: checked,
        currentItemRoughness: checked ? 1 : 0,
      },
      commitToHistory: false,
    };
  },
  checked: (appState) => appState.sketchModeEnabled,
  contextItemLabel: "buttons.sketchMode",
  keyTest: (event) =>
    !event[KEYS.CTRL_OR_CMD] && event.altKey && event.code === CODES.K,
});
