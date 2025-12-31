import { Router } from "express";
import ResourcesService from "../services/resources.service.js";


const router = Router();
const service = new ResourcesService();

router.get("/liked/:type", async (req, res, next) => {
    try {
        const { type } = req.params;
        const userId = req.user.id;

        const likedResources = await service.getLikedResourcesByType({
            id_user: userId,
            type: type
        });

        res.status(200).json(likedResources);
    } catch (error) {
        next(error);
    }
});

router.get("/:type/:idResource", async (req, res, next) => {
    try {
        const { type, idResource } = req.params;
        const userId = req.user.id;

        const resource = await service.getResource({
            id_user: userId,
            type,
            id_resource: idResource
        });

        res.status(200).json(resource);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
  try {
    const { type, id_resource } = req.body;
    const userId = req.user.id;

    const resource = await service.getResource({
        id_user: userId,
        type,
        id_resource
    });
 
    let result;

    if(resource) {
        result = await service.putResource({
            id_user: resource.id_user,
            type: resource.type,
            id_resource: resource.id_resource,
            isLike: !resource.isLike
        });
    }
    else {
        result = await service.postResource({
            id_user: userId,
            type,
            id_resource
        });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;