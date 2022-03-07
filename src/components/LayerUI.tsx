import clsx from "clsx";
import React, { useCallback } from "react";
import { ActionManager } from "../actions/manager";
import { exportCanvas } from "../data";
import { isTextElement, showSelectedShapeActions } from "../element";
import { NonDeletedExcalidrawElement } from "../element/types";
import { Language, t } from "../i18n";
import { useIsMobile } from "../components/App";
import { calculateScrollCenter, getSelectedElements } from "../scene";
import { ExportType } from "../scene/types";
import { AppProps, AppState, ExcalidrawProps, BinaryFiles } from "../types";
import { muteFSAbortError } from "../utils";
import { SelectedShapeActions, ShapesSwitcher, ZoomActions } from "./Actions";
// import { BackgroundPickerAndDarkModeToggle } from "./BackgroundPickerAndDarkModeToggle";
// import CollabButton from "./CollabButton";
import { ErrorDialog } from "./ErrorDialog";
import { ExportCB, ImageExportDialog } from "./ImageExportDialog";
// import { FixedSideContainer } from "./FixedSideContainer";
import { HintViewer } from "./HintViewer";
import { Island } from "./Island";
import { LoadingMessage } from "./LoadingMessage";
// import { LockButton } from "./LockButton";
import { MobileMenu } from "./MobileMenu";
import { PasteChartDialog } from "./PasteChartDialog";
import { Section } from "./Section";
import { HelpDialog } from "./HelpDialog";
import Stack from "./Stack";
// import { Tooltip } from "./Tooltip";
// import { UserList } from "./UserList";
import Library from "../data/library";
import { JSONExportDialog } from "./JSONExportDialog";
import { isImageFileHandle } from "../data/blob";
import { LibraryMenu } from "./LibraryMenu";

import "./LayerUI.scss";
import "./Toolbar.scss";
import { PenModeButton } from "./PenModeButton";

import { Button, Card, Tooltip } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

interface LayerUIProps {
  actionManager: ActionManager;
  appState: AppState;
  files: BinaryFiles;
  canvas: HTMLCanvasElement | null;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedExcalidrawElement[];
  onCollabButtonClick?: () => void;
  onLockToggle: () => void;
  sketchModeEnabled: boolean;
  toggleSketchMode: () => void;
  onPenModeToggle: () => void;
  onInsertElements: (elements: readonly NonDeletedExcalidrawElement[]) => void;
  zenModeEnabled: boolean;
  showExitZenModeBtn: boolean;
  showThemeBtn: boolean;
  toggleZenMode: () => void;
  langCode: Language["code"];
  isCollaborating: boolean;
  renderTopRightUI?: (
    isMobile: boolean,
    appState: AppState,
  ) => JSX.Element | null;
  renderCustomFooter?: (isMobile: boolean, appState: AppState) => JSX.Element;
  viewModeEnabled: boolean;
  libraryReturnUrl: ExcalidrawProps["libraryReturnUrl"];
  UIOptions: AppProps["UIOptions"];
  focusContainer: () => void;
  library: Library;
  id: string;
  onImageAction: (data: { insertOnCanvasDirectly: boolean }) => void;
}

const LayerUI = ({
  actionManager,
  appState,
  files,
  setAppState,
  canvas,
  elements,
  onCollabButtonClick,
  onLockToggle,
  sketchModeEnabled,
  toggleSketchMode,
  onPenModeToggle,
  onInsertElements,
  zenModeEnabled,
  showExitZenModeBtn,
  showThemeBtn,
  toggleZenMode,
  isCollaborating,
  renderTopRightUI,
  renderCustomFooter,
  viewModeEnabled,
  libraryReturnUrl,
  UIOptions,
  focusContainer,
  library,
  id,
  onImageAction,
}: LayerUIProps) => {
  const isMobile = useIsMobile();

  const renderJSONExportDialog = () => {
    if (!UIOptions.canvasActions.export) {
      return null;
    }

    return (
      <JSONExportDialog
        elements={elements}
        appState={appState}
        files={files}
        actionManager={actionManager}
        exportOpts={UIOptions.canvasActions.export}
        canvas={canvas}
      />
    );
  };

  const renderImageExportDialog = () => {
    if (!UIOptions.canvasActions.saveAsImage) {
      return null;
    }

    const createExporter =
      (type: ExportType): ExportCB =>
      async (exportedElements) => {
        const fileHandle = await exportCanvas(
          type,
          exportedElements,
          appState,
          files,
          {
            exportBackground: appState.exportBackground,
            name: appState.name,
            viewBackgroundColor: appState.viewBackgroundColor,
          },
        )
          .catch(muteFSAbortError)
          .catch((error) => {
            console.error(error);
            setAppState({ errorMessage: error.message });
          });

        if (
          appState.exportEmbedScene &&
          fileHandle &&
          isImageFileHandle(fileHandle)
        ) {
          setAppState({ fileHandle });
        }
      };

    return (
      <ImageExportDialog
        elements={elements}
        appState={appState}
        files={files}
        actionManager={actionManager}
        onExportToPng={createExporter("png")}
        onExportToSvg={createExporter("svg")}
        onExportToClipboard={createExporter("clipboard")}
      />
    );
  };

  const Separator = () => {
    return <div style={{ width: ".625em" }} />;
  };

  const renderViewModeCanvasActions = () => {
    return (
      <Section
        heading="canvasActions"
        className={clsx("zen-mode-transition", {
          "transition-left": zenModeEnabled,
        })}
      >
        {/* the zIndex ensures this menu has higher stacking order,
         see https://github.com/excalidraw/excalidraw/pull/1445 */}
        <Island padding={2} style={{ zIndex: 1 }}>
          <Stack.Col gap={4}>
            <Stack.Row gap={1} justifyContent="space-between">
              {/*{renderJSONExportDialog()}*/}
              {renderImageExportDialog()}
            </Stack.Row>
          </Stack.Col>
        </Island>
      </Section>
    );
  };

  const renderCanvasActions = () => (
    <Stack.Row gap={1} justifyContent="space-between">
      {actionManager.renderAction("clearCanvas")}
      <Separator />
      {actionManager.renderAction("loadScene")}
      {/*{renderJSONExportDialog()}*/}
      {renderImageExportDialog()}
      {/*<Separator />*/}
      {/*{onCollabButtonClick && (*/}
      {/*  <CollabButton*/}
      {/*    isCollaborating={isCollaborating}*/}
      {/*    collaboratorCount={appState.collaborators.size}*/}
      {/*    onClick={onCollabButtonClick}*/}
      {/*  />*/}
      {/*)}*/}
      {/*<BackgroundPickerAndDarkModeToggle*/}
      {/*  actionManager={actionManager}*/}
      {/*  appState={appState}*/}
      {/*  setAppState={setAppState}*/}
      {/*  showThemeBtn={showThemeBtn}*/}
      {/*/>*/}
      {appState.fileHandle && (
        <>{actionManager.renderAction("saveToActiveFile")}</>
      )}
    </Stack.Row>
  );

  const renderSelectedShapeActions = () => (
    <SelectedShapeActions
      appState={appState}
      elements={elements}
      renderAction={actionManager.renderAction}
      elementType={appState.elementType}
    />
  );

  const closeLibrary = useCallback(() => {
    const isDialogOpen = !!document.querySelector(".Dialog");

    // Prevent closing if any dialog is open
    if (isDialogOpen) {
      return;
    }
    setAppState({ isLibraryOpen: false });
  }, [setAppState]);

  const deselectItems = useCallback(() => {
    setAppState({
      selectedElementIds: {},
      selectedGroupIds: {},
    });
  }, [setAppState]);

  const libraryMenu = appState.isLibraryOpen ? (
    <LibraryMenu
      pendingElements={getSelectedElements(elements, appState, true)}
      onClose={closeLibrary}
      onInsertShape={onInsertElements}
      onAddToLibrary={deselectItems}
      setAppState={setAppState}
      libraryReturnUrl={libraryReturnUrl}
      focusContainer={focusContainer}
      library={library}
      theme={appState.theme}
      files={files}
      id={id}
      appState={appState}
    />
  ) : null;

  const renderFixedSideContainer = () => {
    const shouldRenderSelectedShapeActions = showSelectedShapeActions(
      appState,
      elements,
    );

    return (
      <>
        {/*<FixedSideContainer side="top">*/}
        <Card className="e-menu__top e-card" size="small" bordered={false}>
          <Stack.Row
            gap={4}
            className={clsx({ "disable-pointerEvents": zenModeEnabled })}
          >
            <Section heading="canvasActions">
              {!viewModeEnabled && (
                <div
                  className={clsx("undo-redo-buttons zen-mode-transition", {
                    "layer-ui__wrapper__footer-left--transition-bottom":
                      zenModeEnabled,
                  })}
                >
                  {actionManager.renderAction("undo", { size: "small" })}
                  {actionManager.renderAction("redo", { size: "small" })}
                </div>
              )}
            </Section>
            {viewModeEnabled
              ? renderViewModeCanvasActions()
              : renderCanvasActions()}
            {shouldRenderSelectedShapeActions && renderSelectedShapeActions()}
            <ZoomActions
              renderAction={actionManager.renderAction}
              zoom={appState.zoom}
            />
            {renderRightAppMenu()}
            {/*<div*/}
            {/*  className={clsx(*/}
            {/*    "layer-ui__wrapper__top-right zen-mode-transition",*/}
            {/*    {*/}
            {/*      "transition-right": zenModeEnabled,*/}
            {/*    },*/}
            {/*  )}*/}
            {/*>*/}
            {/*  <UserList>*/}
            {/*    {appState.collaborators.size > 0 &&*/}
            {/*      Array.from(appState.collaborators)*/}
            {/*        // Collaborator is either not initialized or is actually the current user.*/}
            {/*        .filter(([_, client]) => Object.keys(client).length !== 0)*/}
            {/*        .map(([clientId, client]) => (*/}
            {/*          <Tooltip*/}
            {/*            label={client.username || "Unknown user"}*/}
            {/*            key={clientId}*/}
            {/*          >*/}
            {/*            {actionManager.renderAction("goToCollaborator", {*/}
            {/*              id: clientId,*/}
            {/*            })}*/}
            {/*          </Tooltip>*/}
            {/*        ))}*/}
            {/*  </UserList>*/}
            {/*  {renderTopRightUI?.(isMobile, appState)}*/}
            {/*</div>*/}
            <Tooltip title="草图模式" placement="right" mouseEnterDelay={2}>
              <Button
                type={sketchModeEnabled ? "primary" : "text"}
                icon={<HighlightOutlined />}
                onClick={toggleSketchMode}
              />
            </Tooltip>
          </Stack.Row>
          <HintViewer
            appState={appState}
            elements={elements}
            isMobile={isMobile}
          />
        </Card>
        {/*</FixedSideContainer>*/}
        {/*<FixedSideContainer side="left">*/}
        <div className="e-menu__left">
          {!viewModeEnabled && (
            <Section heading="shapes">
              {(heading) => (
                <Stack.Col gap={4} align="start">
                  <Stack.Col
                    gap={1}
                    align="center"
                    className={clsx("App-toolbar-container", {
                      "zen-mode": zenModeEnabled,
                    })}
                  >
                    <PenModeButton
                      zenModeEnabled={zenModeEnabled}
                      checked={appState.penMode}
                      onChange={onPenModeToggle}
                      title={t("toolBar.penMode")}
                      penDetected={appState.penDetected}
                    />
                    {/*<LockButton*/}
                    {/*  zenModeEnabled={zenModeEnabled}*/}
                    {/*  checked={appState.elementLocked}*/}
                    {/*  onChange={onLockToggle}*/}
                    {/*  title={t("toolBar.lock")}*/}
                    {/*/>*/}
                    <Card
                      className="e-card"
                      title="基础图形"
                      size="small"
                      bordered={false}
                      style={{ width: 120 }}
                    >
                      {heading}
                      <ShapesSwitcher
                        canvas={canvas}
                        elementType={appState.elementType}
                        setAppState={setAppState}
                        onImageAction={({ pointerType }) => {
                          onImageAction({
                            insertOnCanvasDirectly: pointerType !== "mouse",
                          });
                        }}
                      />
                    </Card>
                  </Stack.Col>
                </Stack.Col>
              )}
            </Section>
          )}
        </div>
        {/*</FixedSideContainer>*/}
      </>
    );
  };

  const renderRightAppMenu = () => {
    return (
      <Stack.Row>
        {/*<div*/}
        {/*  className={clsx(*/}
        {/*    "layer-ui__wrapper__footer-center zen-mode-transition",*/}
        {/*    {*/}
        {/*      "layer-ui__wrapper__footer-left--transition-bottom":*/}
        {/*        zenModeEnabled,*/}
        {/*    },*/}
        {/*  )}*/}
        {/*>*/}
        {/*  {renderCustomFooter?.(false, appState)}*/}
        {/*</div>*/}
        <div
          className={clsx(
            "layer-ui__wrapper__footer-right zen-mode-transition",
            {
              "transition-right disable-pointerEvents": zenModeEnabled,
            },
          )}
        >
          {actionManager.renderAction("toggleShortcuts")}
        </div>
        <button
          className={clsx("disable-zen-mode", {
            "disable-zen-mode--visible": showExitZenModeBtn,
          })}
          onClick={toggleZenMode}
        >
          {t("buttons.exitZenMode")}
        </button>
      </Stack.Row>
    );
  };

  const dialogs = (
    <>
      {appState.isLoading && <LoadingMessage />}
      {appState.errorMessage && (
        <ErrorDialog
          message={appState.errorMessage}
          onClose={() => setAppState({ errorMessage: null })}
        />
      )}
      {appState.showHelpDialog && (
        <HelpDialog
          onClose={() => {
            setAppState({ showHelpDialog: false });
          }}
        />
      )}
      {appState.pasteDialog.shown && (
        <PasteChartDialog
          setAppState={setAppState}
          appState={appState}
          onInsertChart={onInsertElements}
          onClose={() =>
            setAppState({
              pasteDialog: { shown: false, data: null },
            })
          }
        />
      )}
    </>
  );

  return isMobile ? (
    <>
      {dialogs}
      <MobileMenu
        appState={appState}
        elements={elements}
        actionManager={actionManager}
        libraryMenu={libraryMenu}
        renderJSONExportDialog={renderJSONExportDialog}
        renderImageExportDialog={renderImageExportDialog}
        setAppState={setAppState}
        onCollabButtonClick={onCollabButtonClick}
        onLockToggle={onLockToggle}
        onPenModeToggle={onPenModeToggle}
        canvas={canvas}
        isCollaborating={isCollaborating}
        renderCustomFooter={renderCustomFooter}
        viewModeEnabled={viewModeEnabled}
        showThemeBtn={showThemeBtn}
        onImageAction={onImageAction}
        renderTopRightUI={renderTopRightUI}
      />
    </>
  ) : (
    <div
      className={clsx("layer-ui__wrapper", {
        "disable-pointerEvents":
          appState.draggingElement ||
          appState.resizingElement ||
          (appState.editingElement && !isTextElement(appState.editingElement)),
      })}
    >
      {dialogs}
      {renderFixedSideContainer()}
      {appState.scrolledOutside && (
        <button
          className="scroll-back-to-content"
          onClick={() => {
            setAppState({
              ...calculateScrollCenter(elements, appState, canvas),
            });
          }}
        >
          {t("buttons.scrollBackToContent")}
        </button>
      )}
    </div>
  );
};

const areEqual = (prev: LayerUIProps, next: LayerUIProps) => {
  const getNecessaryObj = (appState: AppState): Partial<AppState> => {
    const {
      suggestedBindings,
      startBoundElement: boundElement,
      ...ret
    } = appState;
    return ret;
  };
  const prevAppState = getNecessaryObj(prev.appState);
  const nextAppState = getNecessaryObj(next.appState);

  const keys = Object.keys(prevAppState) as (keyof Partial<AppState>)[];
  return (
    prev.renderCustomFooter === next.renderCustomFooter &&
    prev.langCode === next.langCode &&
    prev.elements === next.elements &&
    prev.files === next.files &&
    keys.every((key) => prevAppState[key] === nextAppState[key])
  );
};

export default React.memo(LayerUI, areEqual);
