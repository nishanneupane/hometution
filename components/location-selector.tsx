"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Control } from "react-hook-form"
import locationsData from "@/lib/locations.json"

interface LocationSelectorProps {
  control: Control<any>
  name: string
}

export function LocationSelector({ control, name }: LocationSelectorProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [availableMunicipalities, setAvailableMunicipalities] = useState<string[]>([])

  const provinces = Object.keys(locationsData.provinces)

  useEffect(() => {
    if (selectedProvince) {
      const districts = Object.keys(
        locationsData.provinces[selectedProvince as keyof typeof locationsData.provinces]?.districts || {},
      )
      setAvailableDistricts(districts)
      setSelectedDistrict("")
      setAvailableMunicipalities([])
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const municipalities =
        locationsData.provinces[selectedProvince as keyof typeof locationsData.provinces]?.districts[
          selectedDistrict
        ] || []
      setAvailableMunicipalities(municipalities)
    }
  }, [selectedProvince, selectedDistrict])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={control}
        name="province"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Province</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                setSelectedProvince(value)
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                setSelectedDistrict(value)
              }}
              value={field.value}
              disabled={!selectedProvince}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="municipality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Municipality</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDistrict}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableMunicipalities.map((municipality) => (
                  <SelectItem key={municipality} value={municipality}>
                    {municipality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
