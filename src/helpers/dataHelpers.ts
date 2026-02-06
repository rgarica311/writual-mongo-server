import mongoose from "mongoose"

/** Build find query from input; project lookup uses MongoDB _id (supports input.id or input._id). */
function projectQueryFromInput(input: any): any {
    if (!input || typeof input !== 'object') return input
    const query = { ...input }
    if (query.id != null) {
        query._id = mongoose.Types.ObjectId.isValid(query.id) ? new mongoose.Types.ObjectId(query.id) : query.id
        delete query.id
    } else if (query._id != null && typeof query._id === 'string') {
        query._id = mongoose.Types.ObjectId.isValid(query._id) ? new mongoose.Types.ObjectId(query._id) : query._id
    }
    return query
}

export const getData = (model: any, params: any = {}) => {
    return new Promise((resolve, reject) => {
        if (Object.keys(params).length && params.input) {
            const query = projectQueryFromInput(params.input)
            model.find(query, (err: any, data: any) => {
                if (err) reject(err)
                else {
                    console.log('data: ', JSON.stringify(data, null, 2))
                    resolve(data)
                }
            })
        }
    })
}

export const getScenes = (model: any, params: any = {}) => {
    return new Promise((resolve, reject) => {
        if (Object.keys(params).length && params.input) {
            const query = projectQueryFromInput(params.input)
            model.find(query, (err: any, data: any) => {
                if (err) reject(err)
                else if (data.length > 0) resolve(data[0].scenes)
                else resolve([])
            })
        }
    })
}

export const updateData = (model: any, input: any, id: string, property: string = "") => {

    //see  if its bc the first scene has no number or version 
    return new Promise((resolve, reject) => {
       // console.log('propertyAndData: ', JSON.stringify(propertyAndData, null, "\t"))
       console.log('input keys: ', Object.keys(input))
        let inputKeys = Object.keys(input)
        let dataObj = {}
        dataObj[property] = input[inputKeys[0]]
        console.log('d0ataObj: ', JSON.stringify(dataObj, null, 2))
        
        const projectFilter = mongoose.Types.ObjectId.isValid(id)
            ? { _id: new mongoose.Types.ObjectId(id) }
            : { _id: id }

        if (property === "scenes") {
            model.findOneAndUpdate(projectFilter, dataObj, { new: true }, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        } else {
            model.updateOne(projectFilter, dataObj, { new: true }, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        }
        
       
    })
}

export const insertData = (data: any) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

export const deleteData = (model: any, id: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: new mongoose.Types.ObjectId(id) } : { _id: id }
            await model.deleteOne(filter)
            resolve(`deleted _id: ${id}`)
        } catch (err) {
            console.log(`error deleting ${id}: `, err)
            reject(err)
        }
    })
}

/**
 * Update only the active version of an existing scene. Does not replace the scenes array;
 * uses MongoDB positional operators to set only scenes[].versions[] and scene metadata.
 */
export const updateSceneVersionInProject = (
    model: any,
    _id: string,
    sceneNumber: number,
    activeVersion: number,
    act: number | undefined,
    versionPayload: any
) => {
    console.log('updateSceneVersionInProject: ', { _id, model, sceneNumber, activeVersion, act, versionPayload })
    return new Promise( (resolve, reject) => {
      try {
        const objectId = new mongoose.Types.ObjectId(_id);
        model.findOneAndUpdate(
            { _id: objectId, 'scenes.number': sceneNumber, 'scenes.versions.version': activeVersion },
            { $set: { 
                    'scenes.$[elem].versions.$[ver].sceneHeading': versionPayload.sceneHeading, 
                    'scenes.$[elem].versions.$[ver].thesis': versionPayload.thesis, 
                    'scenes.$[elem].versions.$[ver].antithesis': versionPayload.antithesis, 
                    'scenes.$[elem].versions.$[ver].synthesis': versionPayload.synthesis, 
                    'scenes.$[elem].versions.$[ver].synopsis': versionPayload.synopsis, 
                    'scenes.$[elem].versions.$[ver].act': versionPayload.act 
                }, 
            },
            {
                arrayFilters: [
                    { 'elem.number': sceneNumber },
                    { 'ver.version': activeVersion },
                ],
                new: true,
            },
            (err: any, data: any) => {
                if (err) reject(err);
                else {
                    resolve(data);
                }
            }
        );
      } catch (err) {
        console.log('error updating scene version: ', err)
        reject(err);
      }
      
    });
};

