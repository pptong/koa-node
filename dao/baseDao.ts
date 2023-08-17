import BaseDto from '../dto/baseDto';
import { Model, ModelStatic, Op } from 'sequelize';
import { plainToInstance } from 'class-transformer';
import CurrentUser from '../utils/currentUser';

export default class BaseDao<M extends Model, D extends BaseDto> {

    _model: ModelStatic<M>;

    constructor(model: ModelStatic<M>) {
        this._model = model

    }

    // select * from table
    public async findAll(dtoType: { new(): D }): Promise<D[]> {
        const datas = await this._model.findAll({ raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(dtoType, datas);
        return dtos;
    }

    // select * from table where id = { dto.id }
    public async findById(_id: Number, dtoType: { new(): D }): Promise<D> {
        const wheres: any = { id: _id };
        //console.log(wheres)
        const data = await this._model.findOne({ where: wheres, raw: true }) || {};
        const dto = plainToInstance(dtoType, data);
        return dto
    }


    // select * from table where id in { _ids }
    public async findByIds(_ids: Array<Number>, dtoType: { new(): D }): Promise<D[]> {
        let wheres: any = [];
        for (let i = 0; i < _ids.length; i++) {
            wheres.push({ id: _ids[i] });
        }
        //console.log(wheres)
        const datas = await this._model.findAll({ where: wheres, raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(dtoType, datas);
        return dtos
    }





    // delete from table where id = { dto.id }
    public async deleteById(_id: Number): Promise<boolean> {
        const wheres: any = { id: _id };
        await this._model.destroy({ where: wheres }) || {};
        return true;
    }


    public async deleteByIds(_ids: Array<Number>): Promise<boolean> {
        const wheres: any = { id: { [Op.or]: _ids } };
        await this._model.destroy({ where: wheres }) || {};
        return true;
    }

    public async create(dto: D): Promise<Number> {
        const cObj: any = this.dtoToModel(dto);
        cObj.createdAt = new Date();
        cObj.updatedAt = new Date();

        cObj.createdBy = CurrentUser.getCurrentUser().id;
        cObj.updatedBy = CurrentUser.getCurrentUser().id;
        const result = await this._model.create(cObj) || {};

        return 1;
    }

    public async batchCreate(dtos: Array<D>): Promise<boolean> {
        let cObjs: any[] = [];
        for (let i = 0; i < dtos.length; i++) {
            let cObj = this.dtoToModel(dtos[i])
            cObj.createdAt = new Date();
            cObj.updatedAt = new Date();
            cObj.createdBy = CurrentUser.getCurrentUser().id;
            cObj.updatedBy = CurrentUser.getCurrentUser().id;
            cObjs.push(cObj);
        }
        const result = await this._model.bulkCreate(cObjs) || {};
        return true
    }

    public async update(dto: D): Promise<Number> {
        const uObj: any = this.dtoToModel(dto);
        uObj.updatedAt = new Date();
        uObj.updatedBy = CurrentUser.getCurrentUser().id;
        uObj.id.remove();
        const wheres: any = { id: dto.id }
        await this._model.update(uObj, {
            where: wheres
        });
        return 1;
    }








    private dtoToModel(dto: D): any {
        const attr = this._model.getAttributes()
        let ret: any = {};
        for (let key in dto) {
            console.log(key)
            if (dto[key] && attr[key]) {
                ret[key] = dto[key];
            }
        }
        return ret;
    }

}





