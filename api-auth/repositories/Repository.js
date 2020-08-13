class Repository {
    constructor(model) {
        this.model = model;
    }

    async get(filter = {}) {
        return await this.model.find(filter).exec();
    }

    async create(obj) {
        return await this.model.create(obj);
    }

    async findById(id) {
        return await this.model.findById(id).exec();
    }


    async remove(id) {
        return await this.model.findByIdAndRemove(id).exec();
    }
}

module.exports = Repository;