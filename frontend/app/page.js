"use client"
import { Users, CalendarCheck2, IndianRupee, Building2 } from 'lucide-react'
import LocationDetector from '../components/LocationDetector'
import DistrictSelector from '../components/DistrictSelector'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <section className="bg-white rounded-2xl shadow p-6 md:p-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-3">अपने जिले का प्रदर्शन देखें</h1>
        <p className="text-gray-700 mb-6">See Your District's Performance</p>
        <div className="flex justify-center mb-6">
          <LocationDetector />
        </div>
        <div className="text-gray-600 mb-3">या मैन्युअली चुनें</div>
        <DistrictSelector />
      </section>
    </main>
  )
}
