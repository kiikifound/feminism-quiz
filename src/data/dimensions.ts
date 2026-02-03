export const DIMENSIONS = [
  { id: 0, key: "V1", name: "你怎么看性别差异", left: "更像社会塑造", right: "更像现实/身体条件也在起作用" },
  { id: 1, key: "V2", name: "你觉得问题主要出在哪里", left: "更像个人选择", right: "更像环境/制度在限制" },
  { id: 2, key: "V3", name: "你如何理解男性整体", left: "更看个体差异", right: "更看到整体优势倾向" },
  { id: 3, key: "V4", name: "你如何看待性与身体", left: "更偏私人选择", right: "更偏社会影响很深" },
  { id: 4, key: "V5", name: "你如何看待经济和制度", left: "市场更中立", right: "制度/分配更关键" },
  { id: 5, key: "V6", name: "你怎么看不同女性的处境", left: "更像一个整体", right: "差异很大需要一起看" }
] as const;

export type DimensionId = (typeof DIMENSIONS)[number]["id"];
