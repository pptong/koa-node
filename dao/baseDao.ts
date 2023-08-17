import BaseDto from '../dto/public/baseDto';
import { Model, ModelStatic, Op } from 'sequelize';
import { plainToInstance } from 'class-transformer';
import CurrentUser from '../utils/currentUser';

export default class BaseDao<M extends Model, D extends BaseDto> {

    _model: ModelStatic<M>;
    _dtoType: { new(): D };

    constructor(model: ModelStatic<M>, dtoType:{ new(): D }) {
        this._model = model
        this._dtoType = dtoType

    }

    public async findAll(): Promise<D[]> {
        const datas = await this._model.findAll({ raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(this._dtoType, datas);
        return dtos;
    }

    public async findById(_id: Number): Promise<D> {
        const wheres: any = { id: _id };
        //console.log(wheres)
        const data = await this._model.findOne({ where: wheres, raw: true }) || {};
        const dto = plainToInstance(this._dtoType, data);
        return dto
    }


    public async findByIds(_ids: Array<Number>): Promise<D[]> {
        let wheres: any = [];
        for (let i = 0; i < _ids.length; i++) {
            wheres.push({ id: _ids[i] });
        }
        const datas = await this._model.findAll({ where: wheres, raw: true });
        let dtos = new Array<D>;
        dtos = plainToInstance(this._dtoType, datas);
        return dtos
    }





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

        cObj.createdBy = CurrentUser.getCurrentUser().username;
        cObj.updatedBy = CurrentUser.getCurrentUser().username;
        const result: any = await this._model.create(cObj) || {};
        return result.id;
    }

    public async batchCreate(dtos: Array<D>): Promise<boolean> {
        let cObjs: any[] = [];
        for (let i = 0; i < dtos.length; i++) {
            let cObj = this.dtoToModel(dtos[i])
            cObj.createdAt = new Date();
            cObj.updatedAt = new Date();
            cObj.createdBy = CurrentUser.getCurrentUser().username;
            cObj.updatedBy = CurrentUser.getCurrentUser().username;
            cObjs.push(cObj);
        }
        await this._model.bulkCreate(cObjs);
        return true
    }

    public async update(dto: D): Promise<Number> {
        const uObj: any = this.dtoToModel(dto);
        uObj.updatedAt = new Date();
        uObj.updatedBy = CurrentUser.getCurrentUser().username;
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
            //console.log(key)
            if (dto[key] && attr[key]) {
                ret[key] = dto[key];
            }
        }
        return ret;
    }

}





