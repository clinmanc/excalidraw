import { KEYS } from "./keys";

// We inline font-awesome icons in order to save on js size rather than including the font awesome react library
export const SHAPES = [
  {
    icon: (
      // fa-mouse-pointer
      <svg viewBox="0 0 12 12">
        <polygon points="3.233,1.804 4.202,10.482 6.233,7 10.264,6.982" />
      </svg>
    ),
    value: "selection",
    key: KEYS.V,
  },
  {
    icon: (
      // fa-square
      <svg viewBox="0 0 12 12">
        <path d="M9.5,3.5v5h-7v-5H9.5 M10.5,2.5h-9v7h9V2.5L10.5,2.5z" />
      </svg>
    ),
    value: "rectangle",
    key: KEYS.R,
  },
  {
    icon: (
      // custom
      <svg viewBox="0 0 12 12">
        <path d="M6,2.414L9.586,6L6,9.586L2.414,6L6,2.414 M6,0.999L0.999,6L6,11.001L11.001,6L6,0.999L6,0.999z" />
      </svg>
    ),
    value: "diamond",
    key: KEYS.D,
  },
  {
    icon: (
      // fa-circle
      <svg viewBox="0 0 12 12">
        <path d="M6,3c1.654,0,3,1.346,3,3S7.654,9,6,9S3,7.654,3,6S4.346,3,6,3 M6,2C3.791,2,2,3.791,2,6s1.791,4,4,4,c2.209,0,4-1.791,4-4S8.209,2,6,2L6,2z" />
      </svg>
    ),
    value: "ellipse",
    key: KEYS.E,
  },
  {
    icon: (
      // fa-long-arrow-alt-right
      <svg viewBox="0 0 12 12" className="rtl-mirror">
        <path d="M7.061,4.232L2.465,8.828c-0.195,0.195-0.195,0.512,0,0.707C2.562,9.633,2.69,9.682,2.818,9.682s0.256-0.049,0.354-0.146,l4.596-4.596L7.061,4.232L7.061,4.232z" />
        <polygon points="9.536,2.464 6,3.172 8.828,6 9.536,2.464" />
      </svg>
    ),
    value: "arrow",
    key: KEYS.A,
  },
  {
    icon: (
      // custom
      <svg viewBox="0 0 12 12">
        <path d="M9.536,2.464c-0.195-0.195-0.512-0.195-0.707,0L2.464,8.828c-0.195,0.195-0.195,0.512,0,0.707s0.512,0.195,0.707,0,l6.364-6.364C9.731,2.976,9.731,2.66,9.536,2.464z" />
      </svg>
    ),
    value: "line",
    key: [KEYS.P, KEYS.L],
  },
  {
    icon: (
      // fa-pencil
      <svg viewBox="0 0 12 12">
        <rect
          x="2.427"
          y="5.323"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.7353 6.0429)"
          width="7"
          height="2"
          fill="currentColor"
        />
        <rect
          x="8.536"
          y="1.964"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 0.6235 7.4341)"
          width="1.5"
          height="2"
          fill="currentColor"
        />
        <polygon
          points="2.391,8.445 1.684,10.566 3.805,9.859"
          fill="currentColor"
        />
      </svg>
    ),
    value: "freedraw",
    key: [KEYS.X, KEYS.P.toUpperCase()],
  },
  {
    icon: (
      // fa-font
      <svg viewBox="0 0 12 12">
        <path d="M9,3H3C2.724,3,2.5,3.224,2.5,3.5S2.724,4,3,4h6c0.276,0,0.5-0.224,0.5-0.5S9.276,3,9,3z" />
        <path d="M6,3C5.724,3,5.5,3.224,5.5,3.5v6C5.5,9.776,5.724,10,6,10s0.5-0.224,0.5-0.5v-6C6.5,3.224,6.276,3,6,3z" />
      </svg>
    ),
    value: "text",
    key: KEYS.T,
  },
  {
    icon: (
      // fa-image
      <svg viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
        />
      </svg>
    ),
    value: "image",
    key: null,
  },
] as const;

export const findShapeByKey = (key: string) => {
  const shape = SHAPES.find((shape, index) => {
    return (
      key === (index + 1).toString() ||
      (shape.key &&
        (typeof shape.key === "string"
          ? shape.key === key
          : (shape.key as readonly string[]).includes(key)))
    );
  });
  return shape?.value || null;
};
