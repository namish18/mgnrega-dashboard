"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, CheckCircle2, XCircle } from 'lucide-react'
import Spinner from './Spinner'
import { detectByIp, reverseGeocode } from '../lib/api'
import { cn } from '../lib/utils'

export default function LocationDetector(){
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [district, setDistrict] = useState(null)
  const [method, setMethod] = useState('')
  const [error, setError] = useState('')
  const [showManual, setShowManual] = useState(false)

  useEffect(() => {
    let canceled = false
    async function detect(){
      setLoading(true)
      try {
        if (navigator.geolocation) {
          const pos = await new Promise((res, rej)=> navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy:false, timeout:8000 }))
          const d = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
          if (!canceled && d) { setDistrict(d); setMethod('GPS'); setLoading(false); return }
        }
      } catch (e) {}
      try {
        const d = await detectByIp()
        if (!canceled && d) { setDistrict(d); setMethod('IP'); setLoading(false); return }
      } catch (e) {}
      if (!canceled) { setShowManual(true); setLoading(false); setError('कृपया अपना जिला चुनें') }
    }
    detect()
    return () => { canceled = true }
  }, [])

  if (loading) return (
    <div className="flex items-center space-x-3 text-gray-700">
      <Spinner />
      <div>
        <div className="font-semibold">आपका स्थान खोज रहे हैं...</div>
        <div className="text-sm">Finding your location...</div>
      </div>
    </div>
  )

  if (district) return (
    <div className="flex items-center space-x-4 bg-white rounded-xl shadow p-4 border-l-4 border-secondary">
      <CheckCircle2 className="w-7 h-7 text-secondary" />
      <div className="flex-1">
        <div className="font-bold text-lg">{district.district_name}</div>
        <div className="text-sm text-gray-600">Is this your district? • {method}</div>
      </div>
      <button onClick={()=> router.push(`/dashboard/${district.district_code}`)} className="px-4 py-2 bg-primary text-white rounded-lg">Yes</button>
      <button onClick={()=> { setDistrict(null); setShowManual(true) }} className="px-4 py-2 bg-gray-100 rounded-lg">No</button>
    </div>
  )

  if (showManual) return (
    <div className={cn("flex items-center space-x-3", error && 'text-danger')}>
      <XCircle className="w-6 h-6" />
      <div>
        <div className="font-semibold">{error || 'Select your district'}</div>
        <div className="text-sm">Manual selection available below</div>
      </div>
    </div>
  )

  return null
}
