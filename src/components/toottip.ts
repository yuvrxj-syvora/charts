interface TooltipModel {
  tooltip: {
    opacity: number;
    caretX: number;
    caretY: number;
    dataPoints: Array<{
      raw: number;
      dataIndex: number;
    }>;
  };
}

interface TooltipPositionStyles {
  left?: string;
  top?: string;
  bottom?: string;
  opacity?: string;
}

const createTooltip = (
  id: string,
  positionStyles: TooltipPositionStyles,
  contentHTML: string
): void => {
  let tooltipEl = document.getElementById(id);
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = id;
    tooltipEl.style.position = "absolute";
    tooltipEl.style.background = "rgba(50, 50, 50, 0.9)";
    tooltipEl.style.color = "white";
    tooltipEl.style.padding = "10px";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "1000";
    tooltipEl.style.borderRadius = "10px";
    tooltipEl.style.border = "1px solid white";
    document.body.appendChild(tooltipEl);
  }

  Object.assign(tooltipEl.style, positionStyles);

  tooltipEl.innerHTML = contentHTML;
};

export const histogramTooltip = (tooltipModel: TooltipModel) => {
  const tooltip = tooltipModel.tooltip;

  if (tooltip.opacity === 0) {
    createTooltip("histogram-tooltip", { opacity: "0" }, "");
    return;
  }

  const content = `<div>
        ${tooltip.dataPoints[0].raw}%
      </div>`;
  createTooltip(
    "histogram-tooltip",
    {
      left: `${tooltip.caretX}px`,
      bottom: `${tooltip.caretY}px`,
      opacity: "1",
    },
    content
  );
};

interface LineChartTooltipModel {
  tooltip: {
    opacity: number;
    caretX: number;
    caretY: number;
    dataPoints: Array<{
      raw: number;
      dataIndex: number;
    }>;
  };
}

export const lineChartTooltip = (tooltipModel: LineChartTooltipModel): void => {
  const tooltip = tooltipModel.tooltip;

  if (tooltip.opacity === 0) {
    createTooltip(
      "linechart-tooltip",
      {
        left: `${tooltip.caretX + 60}px`,
        top: `${tooltip.caretY + 50}px`,
        opacity: "0",
      },
      ""
    );
    return;
  }

  const content = `
    <div style="display:flex;flex-direction:row;gap:10px;width:170px;min-width:50px">
        <div style="text-align:left">
          <p>Current APR:</p>
        </div>
        <div style="text-align:right;display:flex;flex-direction:column;position:absolute;right:10px">
          <p>${tooltip.dataPoints[0].raw}%</p>
        </div>
      </div>`;
  createTooltip(
    "linechart-tooltip",
    {
      left: `${tooltip.caretX + 60}px`,
      top: `${tooltip.caretY + 50}px`,
      opacity: "1",
    },
    content
  );
};
