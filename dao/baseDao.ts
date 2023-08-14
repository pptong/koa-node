// import UserDto from "../dto/userDto";
// import { Model, ModelStatic, Attributes } from 'sequelize';
// import { plainToInstance } from 'class-transformer';
// export default class baseDto< M extends Model,DT>  {

//     _model:ModelStatic<M>;
//     constructor(model: ModelStatic<M>) {
//         this._model = model
//     }

//     public async findAll(): Promise<DT[]> {
//         const datas = await this._model.findAll({ raw: true });
//         const dtos = new Array<DT>;
//         //dtos = plainToInstance(DT, datas);
//         return dtos;
//     }
// }

