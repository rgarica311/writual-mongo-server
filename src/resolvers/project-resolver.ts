import { Projects, Scenes } from "../db-connector"
import { getData, insertData, deleteData } from "../helpers"

//Create one resolve for data that takes filters for stripping specific parts of project data
export const getProjectData = (root, filter) => {
    console.log('getProjectData running')
    return getData(Projects, filter)
}

export const getAllProjectsSharedWithUser = (root, { user }) => {
    return getData(Projects, { sharedWith: user })
}

export const getProjectScenes = (root, filters) => {
    console.log('getProjectScenes project_id: ', filters)
    return getData(Projects, { filters })
}



