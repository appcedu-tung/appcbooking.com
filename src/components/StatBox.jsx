function StatBox({ label, value }) {
  return (
    <article className="rounded-xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
    </article>
  );
}

export default StatBox;
