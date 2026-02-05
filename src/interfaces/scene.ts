export interface Version {
    act: number
    version: number
    thesis?: string
    antithesis?: string
    synthesis?: string
    sceneHeading?: string
    synopsis?: string
    step?: string
}
export interface Scene {
    act: number
    projectId: string
    number?: number
    activeVersion?: number
    lockedVersion?: number
    newVersion?: boolean
    newScene?: boolean
    versions: Array<Version>
}