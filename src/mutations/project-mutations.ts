


import { Projects, Scenes } from "../db-connector"
import { insertData, deleteData, updateData } from "../helpers"
import { getProjectData } from "../resolvers"
import { Character } from "../types/character"

export const deleteProject = (root,  { id }) => {
    return deleteData(Projects, id)
}

export const createProject = (root, { input }) => {
    //loop  through input keys to make project
    const newProject = new Projects({
        user: input.user,
        type: input.type,
        title: input.title,
        logline: input.logline,
        genre: input.genre, 
        budget: input.budget,
        similar_projects: input.similar_projects,
        scenes: input.scenes, 
        characters: input.characters,
        outline: input.outline
    })

    newProject.id = newProject._id

    console.log('creating project: ', newProject)
    return insertData(newProject)
}

export const shareProject = (root, { id, user }) => {
    //create helper for update 
    return updateData(Projects, {sharedWith: user}, id) //which project, which key and what value as args
}

export const updateProject = (root, {project})  =>  {
    console.log('project to create: ', project)
    return updateData(Projects, {project}, project.project_id, "project")
}

export const createScene = async (root, {scene}) => {
    console.log('scene to create: ', scene)
    //let scenes: any = []
    let newSceneData = scene.versions[0]
    const result: any = await getProjectData({}, { input: { id: scene.project_id } } )//does not work
    console.log('result: ', result)
    let update = result[0].scenes
    console.log('scenes: ', JSON.stringify(update, null, '\t'))
    if(update.length > 0) {
        console.log('currentScenes: ', JSON.stringify(update, null, '\t'))
        let length = update.length
        if(!scene.number) {
            //Scenes exist, creating  new scene
            console.log('Scenes exist, creating  new scene')
            scene.number = length + 1
            scene.versions.version = 1
        } else {
            //Modify Scene Version
            let sceneNum = scene.number
            let sceneToUpdate = update.find((scene) => scene.number === sceneNum)
            console.log('scene to update: ', JSON.stringify(sceneToUpdate, null, "\t"))
            let numVersions = sceneToUpdate.versions.length
            let newVersionNum = numVersions + 1
            newSceneData.version = newVersionNum
            sceneToUpdate.versions.push(newSceneData)
            console.log('new scene to add: ', JSON.stringify(update, null, "\t"))
            return updateData(Projects, { update }, scene.project_id, "scenes")
        }
        console.log('created scene: ', JSON.stringify(scene, null, 2))
        update.push(scene)
        console.log('scenes: ', update)

    } else {
        //Create the first scene 
        scene.number = 1
        scene.versions[0].version = 1
        update.push(scene)
    }
    console.log('scenes to add: ', update)
    return updateData(Projects, {update}, scene.project_id, "scenes") //project id 
}

export const createCharacter = async (root, { character } )  =>  {
    console.log('character: ',  JSON.stringify(character, null, 2))
    let characterData = character.details[0]
    const result: any = await getProjectData({}, { input: {  id: character.project_id }})
    console.log('results:  ', result)
    let update = result[0].characters
    if(update.length > 0) {
        let length = update.length

        if(!character.number)  {
            //Characters  exist creating new character
            character.number = length + 1
            character.details[0].version  = 1 
        } else {
            let charNum = character.number
            let charToUpdate = update.find((character) =>   character.number  === charNum)
            let charVersions = charToUpdate.details.length
            let newVersionNum = charVersions + 1
            characterData.version = newVersionNum
            charToUpdate.versions.push(characterData)
            return updateData(Projects, {update}, character.project_id, "characters")
        }
        update.push(character)
    } else {
        //create first character
        character.number = 1
        character.details[0].version = 1
        update.push(character)
    }
    console.log('Character to add:  ', character)
    console.log('Characters:  ', update)
    return updateData(Projects, {update}, character.project_id, "characters") //project id 

}

export const createOutline = (root, { input })  =>  {
    const newOutline = new Projects({
        project_id: input.project_id,
        user: input.user,
        format: input.format,
    })

    newOutline.id = input._id

    console.log('creating project: ', newOutline)
    return updateData(Projects, {newOutline}, input.project_id)
}

export const createInsporation = (root, { input })  =>  {
    const newInspo = new Projects({
        project_id: input.project_id,
        scratch: input.scratch,
    })

    newInspo.id = input._id

    console.log('creating project: ', newInspo)
    return updateData(Projects, {newInspo}, input.project_id)
    
}

export const createTreatment = (root, { input })  =>  {
    const newTreatment  = new  Projects({
        project_id: input.project_id,
        versions: input.treatmentContent
    })

    newTreatment.id = input._id
    return  updateData(Projects, {newTreatment}, input.projec_id)
}

export const createScreenplay = (root, { input })  =>  {
    
}

export const createFeedback = (root, { input })  =>  {
    
}