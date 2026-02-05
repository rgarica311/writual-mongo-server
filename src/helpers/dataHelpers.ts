import mongoose from "mongoose"

export const getData = (model: any, params: any = {}) => {
    //console.log('getData model: ', model)
    //console.log('getData params: ', params)
    return new Promise((resolve, reject) => {
        if(Object.keys(params).length) {
            model.find( params.input, (err, data) => {
                if(err) { 
                    reject(err);
                }
                else {
                    console.log('data: ', JSON.stringify(data, null, 2))
                    resolve(data)
                }
            })
        } 
        
    })
}

export const getScenes = (model: any, params: any = {}) => {
    console.log('getData model: ', model)
    console.log('getData params.input: ', params.input)
    return new Promise((resolve, reject) => {
        if(Object.keys(params).length) {
            model.find( params.input, (err, data) => {
                if(err) {
                    reject(err);
                }
                else if (data.length > 0) {
                    console.log('data: ', data)
                    resolve(data[0].scenes)
                } else {
                    console.log("no scenes found")
                    resolve([])
                }
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
        
        if(property === "scenes") {
            let versions = dataObj[property][0].versions.length
            console.log('versions: ', versions)
          
            console.log('dataObj: ', { data: JSON.stringify(dataObj, null, 2), model, id, property })

            model.findOneAndUpdate({id}, dataObj, {returnOriginal: false}, (err, data) => {
                if(err) { 
                    console.log('findOneAndUpdate error: ',  err)
                    reject(err) 
                }
                else { 
                    console.log('findOneAndUpdate data: ', data)
                    resolve(data) 
                }
            })
            
        }
        

        else {
            

            console.log('input keys: ', Object.keys(input))
            let inputKeys = Object.keys(input)
            let dataObj = {}
            dataObj[property] = input[inputKeys[0]]
            console.log('d0ataObj: ', JSON.stringify(dataObj, null, 2))
            model.updateOne(
                {id}, 
                dataObj, 
                {
                    returnOriginal: false
                }, (err, data) => {
                if(err) { 
                    console.log('findOneAndUpdate error: ',  err)
                    reject(err) 
                }
                else { 
                    console.log('findOneAndUpdate data: ', data)
                    resolve(data) 
                }
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
    return new Promise( async (resolve, reject) => {
        try {
            await model.deleteOne({id})
            resolve(`deleted id: ${id}`)
        } catch (err) {
            console.log(`error delting ${id}: `, err)
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
    projectId: string,
    sceneNumber: number,
    activeVersion: number,
    act: number | undefined,
    versionPayload: any
) => {
    console.log('updateSceneVersionInProject: ', { model, projectId, sceneNumber, activeVersion, act, versionPayload })
    return new Promise( (resolve, reject) => {
      try {
        const objectId = new mongoose.Types.ObjectId(projectId);
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

