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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("./prisma");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tortillas, fillings, sauces, taco1, taco2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌮 Seeding database...');
                    // Clean existing data
                    return [4 /*yield*/, prisma_1.prisma.tacoFilling.deleteMany()];
                case 1:
                    // Clean existing data
                    _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.taco.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.filling.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.sauce.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.tortilla.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            prisma_1.prisma.tortilla.create({
                                data: {
                                    name: 'Tortilla de Maíz Simple',
                                    price: 15,
                                },
                            }),
                            prisma_1.prisma.tortilla.create({
                                data: {
                                    name: 'Tortilla de Maíz Doble',
                                    price: 25,
                                },
                            }),
                            prisma_1.prisma.tortilla.create({
                                data: {
                                    name: 'Tortilla de Harina Simple',
                                    price: 18,
                                },
                            }),
                            prisma_1.prisma.tortilla.create({
                                data: {
                                    name: 'Tortilla de Harina Doble',
                                    price: 30,
                                },
                            }),
                        ])];
                case 6:
                    tortillas = _a.sent();
                    console.log("\u2705 Created ".concat(tortillas.length, " tortillas"));
                    return [4 /*yield*/, Promise.all([
                            prisma_1.prisma.filling.create({ data: { name: 'Carne Asada', price: 35.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Pollo', price: 30.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Pastor', price: 32.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Carnitas', price: 33.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Chorizo', price: 28.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Pescado', price: 40.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Camarón', price: 45.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Vegetales', price: 25.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Frijoles', price: 20.0 } }),
                            prisma_1.prisma.filling.create({ data: { name: 'Queso', price: 22.0 } }),
                        ])];
                case 7:
                    fillings = _a.sent();
                    console.log("\u2705 Created ".concat(fillings.length, " fillings"));
                    return [4 /*yield*/, Promise.all([
                            prisma_1.prisma.sauce.create({ data: { name: 'Salsa Roja', price: 5.0 } }),
                            prisma_1.prisma.sauce.create({ data: { name: 'Salsa Verde', price: 5.0 } }),
                            prisma_1.prisma.sauce.create({ data: { name: 'Salsa Habanera', price: 8.0 } }),
                            prisma_1.prisma.sauce.create({ data: { name: 'Guacamole', price: 15.0 } }),
                            prisma_1.prisma.sauce.create({ data: { name: 'Pico de Gallo', price: 10.0 } }),
                        ])];
                case 8:
                    sauces = _a.sent();
                    console.log("\u2705 Created ".concat(sauces.length, " sauces"));
                    return [4 /*yield*/, prisma_1.prisma.taco.create({
                            data: {
                                tortillaId: tortillas[0].id,
                                sauceId: sauces[0].id,
                                fillings: {
                                    create: [
                                        { fillingId: fillings[0].id },
                                        { fillingId: fillings[9].id },
                                    ],
                                },
                                doubleTortilla: true,
                            },
                        })];
                case 9:
                    taco1 = _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.taco.create({
                            data: {
                                tortillaId: tortillas[1].id,
                                sauceId: sauces[3].id,
                                fillings: {
                                    create: [
                                        { fillingId: fillings[1].id },
                                        { fillingId: fillings[7].id },
                                        { fillingId: fillings[9].id },
                                    ],
                                },
                                doubleTortilla: false,
                            },
                        })];
                case 10:
                    taco2 = _a.sent();
                    console.log("\u2705 Created 2 sample tacos");
                    console.log('🌮 Database seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
