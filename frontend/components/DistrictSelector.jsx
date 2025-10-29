"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchDistricts } from '../lib/api'

export default function DistrictSelector(){
  const router = useRouter()
  const [state, setState] = useState('ODISHA')
  const [districts, setDistricts] = useState([])
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let c=false
    async function load(){
      setLoading(true)
      const data = await searchDistricts(state)
      if(!c){ setDistricts(data); setLoading(false) }
    }
    load()
    return ()=>{c=true}
  },[state])

  const selected = useMemo(()=> districts.find(d=> d.district_code===code) || null, [districts, code])

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="mb-3 font-bold">कृपया अपना जिला चुनें</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select value={state} onChange={e=> setState(e.target.value)} className="border rounded-lg p-2">
          <option value="ODISHA">Odisha</option>
        </select>
        <select value={code} onChange={e=> setCode(e.target.value)} className="border rounded-lg p-2">
          <option value="" disabled>{loading? 'Loading...' : 'Select District'}</option>
          {districts.map(d=> <option key={d.district_code} value={d.district_code}>{d.district_name}</option>)}
        </select>
        <button disabled={!code} onClick={()=> router.push(`/dashboard/${code}`)} className="bg-primary text-white rounded-lg px-4 py-2 disabled:opacity-50">View Dashboard</button>
      </div>
      {selected && <div className="text-xs text-gray-500 mt-2">{selected.state_name}</div>}
    </div>
  )
}
