export type CharContent = {
    version: Number
    bio: {type: string}
    name: {type: string} 
    age: {type: Number} 
    gender: {type: String}
}

export type Character = {
    projectId: string
    number: Number,
    details: [CharContent]
}