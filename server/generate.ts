"use server";

import { TIMEOUT } from "dns";

export const generateReport = async (prevState: any, formData: FormData) => {
    setTimeout(() => {
        
    }, 5000);
    console.log("Generating report...");
    let latitude = formData.get("latitude");
    let longitude = formData.get("longitude");
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    return { message: "Report generated successfully", status: "success" };
}

