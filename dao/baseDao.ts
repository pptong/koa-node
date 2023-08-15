import BaseDto from '../dto/baseDto';
import { Model, ModelStatic, Attributes } from 'sequelize';
import { plainToInstance, ClassConstructor } from 'class-transformer';
export default class BaseDao<M extends Model, D extends BaseDto> {

    _model: ModelStatic<M>;
    constructor(model: ModelStatic<M>) {
        this._model = model
    }

    public async findAll(dtoType: { new(): D }): Promise<D[]> {
        const datas = await this._model.findAll({ raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(dtoType, datas);
        return dtos;
    }

    public async findOne(dto: D, dtoType: { new(): D }): Promise<D> {
        const wheres: any = { id: dto.id };
        console.log(wheres)
        const data = await this._model.findOne({ where: wheres, raw: true }) || {};
        dto = plainToInstance(dtoType, data);
        return dto
    }

}





