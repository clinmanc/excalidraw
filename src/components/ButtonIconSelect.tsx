// import clsx from "clsx";
import { Select, Tooltip } from "antd";

const { Option } = Select;

// TODO: It might be "clever" to add option.icon to the existing component <ButtonSelect />
export const ButtonIconSelect = <T extends Object>({
  options,
  label,
  value,
  onChange,
  group,
}: {
  options: { value: T; text: string; icon: JSX.Element; testId?: string }[];
  label: string;
  value: T | null;
  onChange: (value: T) => void;
  group: string;
}) => (
  <Tooltip title={label} placement="right" mouseEnterDelay={2}>
    <Select
      className="e-icon-select"
      showArrow={false}
      bordered={false}
      value={value}
      onChange={(value) => onChange(value)}
    >
      {options.map((option) => (
        <Option
          className="excalidraw e-icon-option"
          key={option.text}
          value={option.value}
          title={option.text}
        >
          {option.icon}
        </Option>
      ))}
    </Select>
  </Tooltip>
  // <div className="buttonList buttonListIcon">
  //   {options.map((option) => (
  //     <label
  //       key={option.text}
  //       className={clsx({ active: value === option.value })}
  //       title={option.text}
  //     >
  //       <input
  //         type="radio"
  //         name={group}
  //         onChange={() => onChange(option.value)}
  //         checked={value === option.value}
  //         data-testid={option.testId}
  //       />
  //       {option.icon}
  //     </label>
  //   ))}
  // </div>
);
