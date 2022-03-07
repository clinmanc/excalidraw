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

import { Row, Col, Button, Divider, Popover, Tooltip } from "antd";
import { AlignIcon, LayersIcon } from "./icons";

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
  const sketchModeEnabled = appState.sketchModeEnabled;
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
      {sketchModeEnabled && showFillIcons && renderAction("changeFillStyle")}

      <Divider type="vertical" />

      {(hasStrokeWidth(elementType) ||
        targetElements.some((element) => hasStrokeWidth(element.type))) &&
        renderAction("changeStrokeWidth")}

      {sketchModeEnabled &&
        (elementType === "freedraw" ||
          targetElements.some((element) => element.type === "freedraw")) &&
        renderAction("changeStrokeShape")}

      {(hasStrokeStyle(elementType) ||
        targetElements.some((element) => hasStrokeStyle(element.type))) && (
        <>{renderAction("changeStrokeStyle")}</>
      )}

      {sketchModeEnabled &&
        (hasStrokeStyle(elementType) ||
          targetElements.some((element) => hasStrokeStyle(element.type))) && (
          <>{renderAction("changeSloppiness")}</>
        )}

      {sketchModeEnabled &&
        (canChangeSharpness(elementType) ||
          targetElements.some((element) =>
            canChangeSharpness(element.type),
          )) && (
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

      <Popover
        overlayStyle={{ width: 144 }}
        content={
          <Row className="excalidraw">
            <Col span={8}>{renderAction("sendToBack")}</Col>
            <Col span={8}>{renderAction("sendBackward")}</Col>
            <Col span={8}>{renderAction("bringToFront")}</Col>
            <Col span={8}>{renderAction("bringForward")}</Col>
          </Row>
        }
        title={t("labels.layers")}
        placement="bottom"
        trigger="click"
      >
        <Tooltip
          title={t("labels.layers")}
          placement="right"
          mouseEnterDelay={2}
        >
          <Button
            className="e-icon-button"
            type="text"
            icon={<LayersIcon theme={appState.theme} />}
          />
        </Tooltip>
      </Popover>

      <Divider type="vertical" />

      {targetElements.length > 1 && (
        // {t("labels.align")}

        <>
          <Popover
            overlayStyle={{ width: 144 }}
            content={
              <Row className="excalidraw">
                {
                  // swap this order for RTL so the button positions always match their action
                  // (i.e. the leftmost button aligns left)
                }
                {isRTL ? (
                  <>
                    <Col span={8}>{renderAction("alignRight")}</Col>
                    <Col span={8}>
                      {renderAction("alignHorizontallyCentered")}
                    </Col>
                    <Col span={8}>{renderAction("alignLeft")}</Col>
                  </>
                ) : (
                  <>
                    <Col span={8}>{renderAction("alignLeft")}</Col>
                    <Col span={8}>
                      {renderAction("alignHorizontallyCentered")}
                    </Col>
                    <Col span={8}>{renderAction("alignRight")}</Col>
                  </>
                )}
                {targetElements.length > 2 && (
                  <Col span={8}>{renderAction("distributeHorizontally")}</Col>
                )}
                <Col span={8}>{renderAction("alignTop")}</Col>
                <Col span={8}>{renderAction("alignVerticallyCentered")}</Col>
                <Col span={8}>{renderAction("alignBottom")}</Col>
                {targetElements.length > 2 && (
                  <Col span={8}>{renderAction("distributeVertically")}</Col>
                )}
              </Row>
            }
            title={t("labels.align")}
            placement="bottom"
            trigger="click"
          >
            <Tooltip
              title={t("labels.align")}
              placement="right"
              mouseEnterDelay={2}
            >
              <Button
                className="e-icon-button"
                type="text"
                icon={<AlignIcon theme={appState.theme} />}
              />
            </Tooltip>
          </Popover>

          <Divider type="vertical" />
        </>
      )}
      {!isEditing && targetElements.length > 0 && (
        <>
          {!isMobile && renderAction("duplicateSelection")}
          {!isMobile && renderAction("deleteSelectedElements")}
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
        <Col className="gutter-row" key={value} xs={24} sm={12}>
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
            keyBindingLabel={``}
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
