import { Button, Tooltip } from "antd";
import { QuestionOutlined } from "@ant-design/icons";

type HelpIconProps = {
  title?: string;
  name?: string;
  id?: string;
  onClick?(): void;
};

export const HelpIcon = (props: HelpIconProps) => (
  <Tooltip title={`${props.title} — ?`} placement="right" mouseEnterDelay={1}>
    <Button
      className="e-icon-button"
      icon={<QuestionOutlined />}
      type="text"
      aria-label={props.title}
      onClick={props.onClick}
    />
  </Tooltip>
  // <button
  //   className="help-icon"
  //   onClick={props.onClick}
  //   type="button"
  //   title={`${props.title} — ?`}
  //   aria-label={props.title}
  // >
  //   {questionCircle}
  // </button>
);
