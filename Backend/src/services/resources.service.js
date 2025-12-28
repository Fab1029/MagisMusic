import ResourcesRepository from "../repositories/resources.repository.js";
import CustomError from "../utils/error.js";

export default class ResourcesService {
    constructor() {
        this.types = ['track', 'album', 'artist', 'playlist'];
        this.resourcesRepository = new ResourcesRepository();
    }

    async getResource(resourceData) {
        if(resourceData.id_resource < 1) { 
            throw new CustomError('Resource ID must be greater than 0', 400);
        }

        if(!this.types.includes(resourceData.type)) {
            throw new CustomError('Invalid resource type', 400);
        }

        return await this.resourcesRepository.getResource(resourceData);
    }

    async postResource(resourceData) {
        if(resourceData.id_resource < 1) { 
            throw new CustomError('Resource ID must be greater than 0', 400);
        }

        if(!this.types.includes(resourceData.type)) {
            throw new CustomError('Invalid resource type', 400);
        }

        return await this.resourcesRepository.postResource(resourceData);
    }

    async putResource(resourceData) {
        if(resourceData.id_resource < 1) { 
            throw new CustomError('Resource ID must be greater than 0', 400);
        }

        if(!this.types.includes(resourceData.type)) {
            throw new CustomError('Invalid resource type', 400);
        }

        return await this.resourcesRepository.putResource(resourceData);
    }
}