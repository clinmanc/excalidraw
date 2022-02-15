import { Button } from "antd";
import { QuestionOutlined } from "@ant-design/icons";

type HelpIconProps = {
  title?: string;
  name?: string;
  id?: string;
  onClick?(): void;
};

export const HelpIcon = (props: HelpIconProps) => (
  <Button
    icon={<QuestionOutlined />}
    type="text"
    title={`${props.title} — ?`}
    aria-label={props.title}
    onClick={props.onClick}
  />
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
