import { useState, useMemo } from 'react'
import type { Building, ColourRating, RegistrationStatus } from '@/types'
import { MOCK_BUILDINGS } from '@/data/mockBuildings'

interface BuildingFilters {
  search: string
  status: RegistrationStatus | 'all'
  colourRating: ColourRating | 'all'
}

export function useBuildings() {
  const [filters, setFilters] = useState<BuildingFilters>({
    search: '',
    status: 'all',
    colourRating: 'all',
  })

  const filteredBuildings = useMemo<Building[]>(() => {
    return MOCK_BUILDINGS.filter((b) => {
      const matchesSearch =
        filters.search === '' ||
        b.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.city.toLowerCase().includes(filters.search.toLowerCase())
      const matchesStatus = filters.status === 'all' || b.status === filters.status
      const matchesRating =
        filters.colourRating === 'all' || b.colourRating === filters.colourRating
      return matchesSearch && matchesStatus && matchesRating
    })
  }, [filters])

  const stats = useMemo(() => {
    const totalBuildings = MOCK_BUILDINGS.length
    const renewalDue = MOCK_BUILDINGS.filter((b) => b.status === 'Renewal Due').length
    const avgScore = Math.round(
      MOCK_BUILDINGS.reduce((sum, b) => sum + b.score, 0) / totalBuildings
    )
    return { totalBuildings, renewalDue, avgScore }
  }, [])

  return {
    buildings: filteredBuildings,
    allBuildings: MOCK_BUILDINGS,
    filters,
    setFilters,
    stats,
  }
}
