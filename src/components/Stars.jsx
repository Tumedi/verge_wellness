export default function Stars({ rating = 5, reviews }) {
  const full = "★★★★★".slice(0, rating);
  const empty = "☆☆☆☆☆".slice(0, 5 - rating);
  return (
    <div className="stars">
      {full}
      {empty}
      {reviews != null && <span>({reviews})</span>}
    </div>
  );
}
