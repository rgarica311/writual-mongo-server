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
    console.log('running updateData with input: ', input, 'id: ', id, 'property: ', property)
    //see  if its bc the first scene has no number or version 
    return new Promise((resolve, reject) => {
       // console.log('propertyAndData: ', JSON.stringify(propertyAndData, null, "\t"))
        let inputKeys = Object.keys(input)
        let dataObj = {}
        dataObj[property] = input[inputKeys[0]]
        
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
    scenes: any,
    _id: string,
    sceneNumber: number,
    activeVersion: number,
    act: number | undefined,
    versionPayload: any
) => {
    return new Promise((resolve, reject) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            console.log('Invalid project _id: ', _id)
          reject(new Error(`Invalid project _id: ${_id}`));
          return;
        }
        const objectId = new mongoose.Types.ObjectId(_id);
        const $set: Record<string, any> = {
          'scenes.$[elem].versions': [...scenes[sceneNumber].versions, versionPayload],
        };
        if (versionPayload?.act !== undefined && versionPayload?.act !== null) {
          $set['scenes.$[elem].versions.$[ver].act'] = versionPayload.act;
        }
        const sn = Number(sceneNumber);
        const av = Number(activeVersion);
        console.log('Updating scene version: ', { _id, sceneNumber, activeVersion, act: versionPayload?.act, version: versionPayload })
        model.findOneAndUpdate(
            { _id: objectId, 'scenes.number': sn },
            { $set },
            {
                arrayFilters: [
                    { 'elem.number': sn },
                    { 'ver.version': av },
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

