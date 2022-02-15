import { useState } from "react";
import { t } from "../i18n";
// import { useIsMobile } from "./App";
// import { trash } from "./icons";
// import { ToolButton } from "./ToolButton";

// import ConfirmDialog from "./ConfirmDialog";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ClearCanvas = ({ onConfirm }: { onConfirm: () => void }) => {
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        type="text"
        aria-label={t("buttons.clearReset")}
        // showAriaLabel={useIsMobile()}
        title={t("buttons.clearReset")}
        onClick={toggleDialog}
      />
      {/*<ToolButton*/}
      {/*  type="button"*/}
      {/*  icon={trash}*/}
      {/*  title={t("buttons.clearReset")}*/}
      {/*  aria-label={t("buttons.clearReset")}*/}
      {/*  showAriaLabel={useIsMobile()}*/}
      {/*  onClick={toggleDialog}*/}
      {/*  data-testid="clear-canvas-button"*/}
      {/*/>*/}

      {
        <Modal
          visible={showDialog}
          title={t("clearCanvasDialog.title")}
          onOk={() => {
            onConfirm();
            toggleDialog();
          }}
          onCancel={toggleDialog}
          okText="确认"
          cancelText="取消"
        >
          <p className="clear-canvas__content"> {t("alerts.clearReset")}</p>
        </Modal>
        // <ConfirmDialog
        //   onConfirm={() => {
        //     onConfirm();
        //     toggleDialog();
        //   }}
        //   onCancel={toggleDialog}
        //   title={t("clearCanvasDialog.title")}
        // >
        //   <p className="clear-canvas__content"> {t("alerts.clearReset")}</p>
        // </ConfirmDialog>
      }
    </>
  );
};

export default ClearCanvas;
