import React from "react";

const AppointmentDetail: React.FC<{ title: string; content: string }> = (
  props
) => {
  return (
    <div className="appointment-detail">
      <span className="appointment-detail-title">{props.title}</span>
      <span>{props.content}</span>
    </div>
  );
};

export default AppointmentDetail