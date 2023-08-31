import BaseDto from "../dto/public/baseDto";
import { Model, ModelStatic, Op } from "sequelize";
import { plainToInstance } from "class-transformer";
import CurrentUser from "../utils/currentUser";
import PageDto from "../dto/public/pageRequestDto";

export default class BaseDao<M extends Model, D extends BaseDto> {
  _model: ModelStatic<M>;
  _dtoType: { new (): D };

  constructor(model: ModelStatic<M>, dtoType: { new (): D }) {
    this._model = model;
    this._dtoType = dtoType;
  }

  /**
   * Find all data of database table
   */
  public async findAll(): Promise<D[]> {
    const datas = await this._model.findAll({ raw: true });
    let dtos = new Array<D>();
    dtos = plainToInstance(this._dtoType, datas);
    return dtos;
  }

  /**
   * Find all data of database table
   */
  public async findWhere(_where: any): Promise<D[]> {
    const datas = await this._model.findAll({ where: _where, raw: true });
    let dtos = new Array<D>();
    dtos = plainToInstance(this._dtoType, datas);
    return dtos;
  }

  /**
   * Find the data for the specified page
   * @param pageSize page size {number}
   * @param pageIndex page index {number}
   * @param _where  where please see docs of sequelize {any}
   * @returns bussiness dto {Dto extends BaseDto}
   */
  public async findAllByPage(
    pageSize: number,
    pageIndex: number,
    _where: any
  ): Promise<D[]> {
    const _pageIndex = pageIndex <= 0 ? 0 : pageIndex;
    const _pageSize = pageSize <= 0 ? 0 : pageSize;
    const datas = await this._model.findAll({
      where: _where,
      offset: (_pageIndex - 1) * _pageSize,
      limit: _pageSize,
      raw: true,
    });
    let dtos = new Array<D>();
    dtos = plainToInstance(this._dtoType, datas);
    return dtos;
  }

  /**
   * select count
   * @param _where  where please see docs of sequelize {any}
   * @returns count {number}
   */
  public async getCount(_where: any): Promise<number> {
    const count = await this._model.count({
      where: _where,
    });
    return count;
  }

  /**
   * Find the data by id
   * @param _id id {number}
   * @returns bussiness dto {Dto extends BaseDto}
   */
  public async findById(_id: Number): Promise<D> {
    const wheres: any = { id: _id };
    const data =
      (await this._model.findOne({ where: wheres, raw: true })) || {};
    const dto = plainToInstance(this._dtoType, data);
    return dto;
  }

  /**
   * Find multiple datas by ids
   * @param _id ids {number[]}
   * @returns bussiness dto array {Dto extends BaseDto}
   */
  public async findByIds(_ids: Array<Number>): Promise<D[]> {
    let dtos = new Array<D>();

    if (_ids.length == 0) {
      dtos = plainToInstance(this._dtoType, []);
      return dtos;
    }

    let wheres: any = [];
    for (let i = 0; i < _ids.length; i++) {
      wheres.push({ id: _ids[i] });
    }
    const datas = await this._model.findAll({ where: wheres, raw: true });
    dtos = plainToInstance(this._dtoType, datas);
    return dtos;
  }

  /**
   * delete one data by id
   * @param _id id {number}
   * @returns true {boolean}
   */
  public async deleteById(_id: Number): Promise<boolean> {
    const wheres: any = { id: _id };
    (await this._model.destroy({ where: wheres })) || {};
    return true;
  }

  /**
   * delete multiple datas by ids
   * @param _id ids {number[]}
   * @returns true {boolean}
   */
  public async deleteByIds(_ids: Array<Number>): Promise<boolean> {
    if (_ids.length == 0) {
      return true;
    }
    const wheres: any = { id: { [Op.or]: _ids } };
    (await this._model.destroy({ where: wheres })) || {};
    return true;
  }

  /**
   * create one data
   * @param _id business dto {Dto extends BaseDto }
   * @returns id {number}
   */
  public async create(_dto: D): Promise<Number> {
    const cObj: any = this.dtoToModel(_dto);
    cObj.createdAt = new Date();
    cObj.updatedAt = new Date();

    cObj.createdBy = CurrentUser.getCurrentUser().username;
    cObj.updatedBy = CurrentUser.getCurrentUser().username;
    const result: any = (await this._model.create(cObj)) || {};
    return result.id;
  }

  /**
   * insert multiple data
   * @param _id business dto[] {Dto extends BaseDto }
   * @returns true {boolean}
   */
  public async batchCreate(_dtos: Array<D>): Promise<boolean> {
    let cObjs: any[] = [];
    for (let i = 0; i < _dtos.length; i++) {
      let cObj = this.dtoToModel(_dtos[i]);
      cObj.createdAt = new Date();
      cObj.updatedAt = new Date();
      cObj.createdBy = CurrentUser.getCurrentUser().username;
      cObj.updatedBy = CurrentUser.getCurrentUser().username;
      cObjs.push(cObj);
    }

    await this._model.bulkCreate(cObjs);
    return true;
  }

  /**
   * update dto data to database table by id
   * @param _dto business dto  { Dto extends BaseDto }
   * @param _id id  {number }
   * @returns true {boolean}
   */
  public async update(_dto: D, _id: number): Promise<boolean> {
    const uObj: any = this.dtoToModel(_dto);
    uObj.updatedAt = new Date();
    uObj.updatedBy = CurrentUser.getCurrentUser().username;
    delete uObj.id;
    const wheres: any = { id: _id };
    await this._model.update(uObj, {
      where: wheres,
    });
    return true;
  }

  /**
   * dto tranforence to model
   * @param _dto business dto  { Dto extends BaseDto }
   * @returns model { any }
   */
  private dtoToModel(_dto: D): any {
    const attr = this._model.getAttributes();
    let ret: any = {};
    for (let key in _dto) {
      if (_dto[key] && attr[key]) {
        ret[key] = _dto[key];
      }
    }
    return ret;
  }
}
