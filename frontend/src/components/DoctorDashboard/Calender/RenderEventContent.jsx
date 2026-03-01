import React from "react";

const RenderEventContent = ({ arg }) => {
  return (
    <div
      className="p-[4px_6px] rounded-[4px] h-full text-[12px] font-bold overflow-hidden border border-white/20 cursor-pointer"
      style={{
        backgroundColor:
          arg.event.backgroundColor || arg.event.color || "#3788d8",
        color: arg.event.textColor || "#FFFFFF",
      }}
    >
      <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
        {arg.event.title}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="text-[10px] opacity-90">{arg.timeText}</div>

          <div className="text-[10px] opacity-90 whitespace-nowrap overflow-hidden text-ellipsis">
            👤 {arg.event.extendedProps?.patient || "Unknown"}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1>Reason : {arg.event.extendedProps.reason}</h1>
          <h1>Status : {arg.event.extendedProps.status}</h1>
        </div>
      </div>
    </div>
  );
};

export default RenderEventContent;
