"use client"

export default function ComparisonTable({ top=[], peers=[], highlightCode }){
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <div className="font-bold mb-2">अन्य जिलों से तुलना करें</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-2">Rank</th>
            <th className="p-2">District</th>
            <th className="p-2">Households</th>
            <th className="p-2">Vs You</th>
          </tr>
        </thead>
        <tbody>
          {top.map((t,i)=> (
            <tr key={t.district_code} className={highlightCode===t.district_code? 'bg-blue-50' : ''}>
              <td className="p-2">{i+1}</td>
              <td className="p-2">{t.district_name}</td>
              <td className="p-2">{t.total_households_worked}</td>
              <td className="p-2">—</td>
            </tr>
          ))}
          {peers.length>0 && <tr><td colSpan={4} className="p-2 font-semibold">Similar Districts</td></tr>}
          {peers.map((p)=> (
            <tr key={p.district_code}>
              <td className="p-2">—</td>
              <td className="p-2">{p.district_name}</td>
              <td className="p-2">—</td>
              <td className="p-2">{p.diffs?.total_households_worked!=null? `${p.diffs.total_households_worked>0?'+':''}${p.diffs.total_households_worked.toFixed(1)}%` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
