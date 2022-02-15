import React from "react";
import { ActionManager } from "../actions/manager";
import { getNonDeletedElements } from "../element";
import { ExcalidrawElement, PointerType } from "../element/types";
import { t } from "../i18n";
import { useIsMobile } from "../components/App";
import {
  canChangeSharpness,
  canHaveArrowheads,
  getTargetElements,
  hasBackground,
  hasStrokeStyle,
  hasStrokeWidth,
  hasText,
} from "../scene";
import { SHAPES } from "../shapes";
import { AppState, Zoom } from "../types";
import { capitalizeString, isTransparent, setCursorForShape } from "../utils";
import Stack from "./Stack";
import { ToolButton } from "./ToolButton";
import { hasStrokeColor } from "../scene/comparisons";

import { Row, Col, Divider } from "antd";

export const SelectedShapeActions = ({
  appState,
  elements,
  renderAction,
  elementType,
}: {
  appState: AppState;
  elements: readonly ExcalidrawElement[];
  renderAction: ActionManager["renderAction"];
  elementType: ExcalidrawElement["type"];
}) => {
  const targetElements = getTargetElements(
    getNonDeletedElements(elements),
    appState,
  );
  const isEditing = Boolean(appState.editingElement);
  const isMobile = useIsMobile();
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  const showFillIcons =
    hasBackground(elementType) ||
    targetElements.some(
      (element) =>
        hasBackground(element.type) && !isTransparent(element.backgroundColor),
    );
  const showChangeBackgroundIcons =
    hasBackground(elementType) ||
    targetElements.some((element) => hasBackground(element.type));

  let commonSelectedType: string | null = targetElements[0]?.type || null;

  for (const element of targetElements) {
    if (element.type !== commonSelectedType) {
      commonSelectedType = null;
      break;
    }
  }

  return (
    <Stack.Row align="center" gap={1}>
      {((hasStrokeColor(elementType) &&
        elementType !== "image" &&
        commonSelectedType !== "image") ||
        targetElements.some((element) => hasStrokeColor(element.type))) &&
        renderAction("changeStrokeColor")}
      {showChangeBackgroundIcons && renderAction("changeBackgroundColor")}
      {showFillIcons && renderAction("changeFillStyle")}

      <Divider type="vertical" />

      {(hasStrokeWidth(elementType) ||
        targetElements.some((element) => hasStrokeWidth(element.type))) &&
        renderAction("changeStrokeWidth")}

      {(elementType === "freedraw" ||
        targetElements.some((element) => element.type === "freedraw")) &&
        renderAction("changeStrokeShape")}

      {(hasStrokeStyle(elementType) ||
        targetElements.some((element) => hasStrokeStyle(element.type))) && (
        <>
          {renderAction("changeStrokeStyle")}
          {renderAction("changeSloppiness")}
        </>
      )}

      {(canChangeSharpness(elementType) ||
        targetElements.some((element) => canChangeSharpness(element.type))) && (
        <>
          {renderAction("changeSharpness")}

          <Divider type="vertical" />
        </>
      )}

      {(hasText(elementType) ||
        targetElements.some((element) => hasText(element.type))) && (
        <>
          {renderAction("changeFontSize")}

          {renderAction("changeFontFamily")}

          {renderAction("changeTextAlign")}

          <Divider type="vertical" />
        </>
      )}

      {(canHaveArrowheads(elementType) ||
        targetElements.some((element) => canHaveArrowheads(element.type))) && (
        <>{renderAction("changeArrowhead")}</>
      )}

      {renderAction("changeOpacity")}

      <Divider type="vertical" />

      <>
        {renderAction("sendToBack")}
        {renderAction("sendBackward")}
        {renderAction("bringToFront")}
        {renderAction("bringForward")}

        <Divider type="vertical" />
      </>

      {targetElements.length > 1 && (
        <fieldset>
          {/*<legend>{t("labels.align")}</legend>*/}
          <Stack.Row>
            {
              // swap this order for RTL so the button positions always match their action
              // (i.e. the leftmost button aligns left)
            }
            {isRTL ? (
              <>
                {renderAction("alignRight")}
                {renderAction("alignHorizontallyCentered")}
                {renderAction("alignLeft")}
              </>
            ) : (
              <>
                {renderAction("alignLeft")}
                {renderAction("alignHorizontallyCentered")}
                {renderAction("alignRight")}
              </>
            )}
            {targetElements.length > 2 &&
              renderAction("distributeHorizontally")}
            <div className="iconRow">
              {renderAction("alignTop")}
              {renderAction("alignVerticallyCentered")}
              {renderAction("alignBottom")}
              {targetElements.length > 2 &&
                renderAction("distributeVertically")}
            </div>
          </Stack.Row>
        </fieldset>
      )}
      {!isMobile && !isEditing && targetElements.length > 0 && (
        <>
          {renderAction("duplicateSelection")}
          {renderAction("deleteSelectedElements")}
          {renderAction("group")}
          {renderAction("ungroup")}
          {targetElements.length === 1 && renderAction("link")}
        </>
      )}
    </Stack.Row>
  );
};

export const ShapesSwitcher = ({
  canvas,
  elementType,
  setAppState,
  onImageAction,
}: {
  canvas: HTMLCanvasElement | null;
  elementType: ExcalidrawElement["type"];
  setAppState: React.Component<any, AppState>["setState"];
  onImageAction: (data: { pointerType: PointerType | null }) => void;
}) => (
  <Row gutter={[16, 16]}>
    {SHAPES.map(({ value, icon, key }, index) => {
      const label = t(`toolBar.${value}`);
      const letter = key && (typeof key === "string" ? key : key[0]);
      const shortcut = letter
        ? `${capitalizeString(letter)} ${t("helpDialog.or")} ${index + 1}`
        : `${index + 1}`;
      return (
        <Col className="gutter-row" span={12} key={value}>
          {/*<Button*/}
          {/*  type={elementType === value ? "primary" : "text"}*/}
          {/*  icon={<div className="ToolIcon__icon">{icon}</div>}*/}
          {/*></Button>*/}
          <ToolButton
            className="Shape"
            type="radio"
            icon={icon}
            checked={elementType === value}
            name="editor-current-shape"
            title={`${capitalizeString(label)} — ${shortcut}`}
            keyBindingLabel={`${index + 1}`}
            aria-label={capitalizeString(label)}
            aria-keyshortcuts={shortcut}
            data-testid={value}
            onChange={({ pointerType }) => {
              setAppState({
                elementType: value,
                multiElement: null,
                selectedElementIds: {},
              });
              setCursorForShape(canvas, value);
              if (value === "image") {
                onImageAction({ pointerType });
              }
            }}
          />
        </Col>
      );
    })}
  </Row>
);

export const ZoomActions = ({
  renderAction,
  zoom,
}: {
  renderAction: ActionManager["renderAction"];
  zoom: Zoom;
}) => (
  <Stack.Row gap={1} align="center">
    {renderAction("zoomOut")}
    {renderAction("zoomIn")}
    {renderAction("resetZoom")}
  </Stack.Row>
);
