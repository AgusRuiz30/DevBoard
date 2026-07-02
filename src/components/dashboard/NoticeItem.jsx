import { FiAlertTriangle } from "react-icons/fi";
import DashboardBadge from "./DashboardBadge";
import DashboardItem from "./DashboardItem";

const noticeStyles = {
  urgent: {
    border: "border-l-4 border-l-[var(--notice-urgent)]",
    badge: "border-[var(--notice-urgent)] bg-red-500/10 text-red-400",
    icon: "text-red-400",
    avatar: "bg-orange-500",
  },
  important: {
    border: "border-l-4 border-l-[var(--notice-important)]",
    badge: "border-[var(--notice-important)] bg-orange-500/10 text-orange-400",
    icon: "text-orange-400",
    avatar: "bg-emerald-500",
  },
  info: {
    border: "border-l-4 border-l-[var(--notice-info)]",
    badge: "border-[var(--notice-info)] bg-sky-500/10 text-sky-400",
    icon: "text-sky-400",
    avatar: "bg-blue-500",
  },
};

const NoticeItem = ({ notice }) => {
  const style = noticeStyles[notice.type] || noticeStyles.info;

  return (
    <DashboardItem className={style.border}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="flex items-center gap-2 font-semibold text-white">
            {notice.type === "urgent" && (
              <FiAlertTriangle size={16} className={style.icon} />
            )}

            {notice.title}
          </h4>

          <p className="mt-2 text-sm leading-5 text-[var(--color-text-soft)]">
            {notice.message}
          </p>
        </div>

        <DashboardBadge className={style.badge}>{notice.label}</DashboardBadge>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${style.avatar} text-[10px] font-bold text-white`}
            >
              {notice.author?.charAt(0)?.toUpperCase() || "U"}
            </span>

            {notice.author}
          </span>

          <span>{notice.date}</span>
          <span>{notice.recipients}</span>
        </div>

        <button className="font-semibold text-blue-400 transition hover:text-blue-300">
          {notice.isRead ? "Leído" : "Marcar leído"}
        </button>
      </div>
    </DashboardItem>
  );
};

export default NoticeItem;
