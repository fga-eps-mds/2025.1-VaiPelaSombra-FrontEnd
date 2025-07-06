export interface TripPlan {
    id: number,
    name: string
    image: string
    ownerId: number
    notes: string
    startDate: string
    endDate: string
    status: string
    daysLeft: number
    destinationId: number
}