export type CharContent = {
    version: Number
    bio: {type: string}
    name: {type: string} 
    age: {type: Number} 
    gender: {type: String}
}

export type Character = {
    project_id: string
    number: Number,
    details: [CharContent]
}