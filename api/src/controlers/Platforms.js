const {ParentPlatform} = require('../db')

async function getPlatforms(req,res){
    try {
        const data = await ParentPlatform.findAll()
        res.status(200).json(data) 
    } catch (error) {
        console.log("----->",error);
    }
}
module.exports= getPlatforms