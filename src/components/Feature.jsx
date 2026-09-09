// A check/benefit item: circular icon + title + optional description.
export default function Feature({
  icon: Icon,
  title,
  desc,
  stacked = false,
  style,
}) {
  return (
    <div
      className="feature"
      style={{
        ...(stacked ? { flexDirection: "column", gap: 10 } : {}),
        ...style,
      }}
    >
      <div className="feature__icon">{Icon ? <Icon /> : null}</div>
      <div>
        <h4>{title}</h4>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}
