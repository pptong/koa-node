import BaseDto from '../dto/baseDto';
import { Model, ModelStatic } from 'sequelize';
import { plainToInstance } from 'class-transformer';
export default class BaseDao<M extends Model, D extends BaseDto> {

    _model: ModelStatic<M>;
    _field: any;
    constructor(model: ModelStatic<M>, field: Record<string, any>) {
        this._model = model
        this._field = field
    }

    public async findAll(dtoType: { new(): D }): Promise<D[]> {
        const datas = await this._model.findAll({ raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(dtoType, datas);
        return dtos;
    }

    public async findById(dto: D, dtoType: { new(): D }): Promise<D> {
        const wheres: any = { id: dto.id };
        //console.log(wheres)
        const data = await this._model.findOne({ where: wheres, raw: true }) || {};
        dto = plainToInstance(dtoType, data);
        return dto
    }

    public async deleteById(dto: D): Promise<boolean> {
        const wheres: any = { id: dto.id };
        await this._model.destroy({ where: wheres }) || {};
        return true;
    }

    public async create(dto: D): Promise<Number> {
        const cObj: any = this.dtoToModel(dto);
        console.log(cObj)
        const result = await this._model.create(cObj) || {};
        console.log(result)
        return 1;
    }

    private dtoToModel(dto: D): any {
        let ret: any = {};
        for (let key in dto) {
            console.log(key)
            if (dto[key] && this._field[key]) {
                ret[key]=dto[key];
            }
        }
        return ret;
    }

}





