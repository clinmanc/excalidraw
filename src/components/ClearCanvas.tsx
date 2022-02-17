import { useState } from "react";
import { t } from "../i18n";
import { useIsMobile } from "./App";
// import { trash } from "./icons";
import { ToolButton } from "./ToolButton";

// import ConfirmDialog from "./ConfirmDialog";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ClearCanvas = ({ onConfirm }: { onConfirm: () => void }) => {
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <>
      <ToolButton
        type="button"
        icon={<DeleteOutlined />}
        title={t("buttons.clearReset")}
        aria-label={t("buttons.clearReset")}
        showAriaLabel={useIsMobile()}
        onClick={toggleDialog}
        data-testid="clear-canvas-button"
      />

      {
        <Modal
          visible={showDialog}
          title={t("clearCanvasDialog.title")}
          onOk={() => {
            onConfirm();
            toggleDialog();
          }}
          onCancel={toggleDialog}
          okText={t("buttons.confirm")}
          cancelText={t("buttons.cancel")}
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
