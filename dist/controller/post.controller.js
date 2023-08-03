"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const posts_models_1 = __importDefault(require("../models/posts.models"));
function getData(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = +(req.query.limit || 20);
            const page = +(req.query.page || 1);
            const skip = +(req.query.skip || 0);
            const sort = +(req.query.sort || 1);
            const sortType = ((_a = req.query.sort_type) === null || _a === void 0 ? void 0 : _a.toString()) || 'id';
            const q = (req.query.q || '').toString();
            const count = yield posts_models_1.default.find({}).count({});
            let data = yield posts_models_1.default.find({ $or: [{ title: { $regex: q, $options: 'i' } }, { body: { $regex: q, $options: 'i' } }] }, { _id: 0 }, { sort: { [sortType]: +sort }, limit: +limit, skip: (+page - 1) * +limit + +skip });
            const fullData = {
                posts: data,
                total: count,
                limit: data.length,
                skip,
            };
            res.json(fullData);
        }
        catch (error) { }
    });
}
exports.getData = getData;
